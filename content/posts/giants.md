---
title: "Giants"
description: "A serverless development framework built on a minimal AWS surface area, constrained CDK constructs and composed lambda handlers"
publishDate: "10 May 2026"
tags: ["serverless"]
---

[Giants](https://github.com/lukehedger/giants) is a serverless development framework built on three constraints:

1. **Lambda is the compute platform.** The AWS surface area is small, deliberate and includes durable execution.
2. **Infrastructure is constrained by L3 constructs.** API routes, environments, deployment and local emulation share one structured framework.
3. **Handlers are composed, not wrapped in middleware.** Dependency injection and composition give you handlers that are easy to refactor and trivial to test.

The rest of this post walks through the framework: the surface area it picks, the constructs that encode it and the patterns that hold the runtime together.

## Lambda as compute, minimal AWS surface area

A typical "modern" AWS architecture has a dozen services wired together by an orchestrator and a handful of integrations. Nobody on the team holds the whole picture in their head. Nobody is sure which failure modes observability misses. On-call has to learn a different runtime for each box on the diagram, and the diagram is the only artefact that knows what the system *is*.

Giants is a deliberate retreat from that. The platform is small enough that an engineer joining the team can read it in a day, and small enough that you can develop a feel for how it behaves under load.

| Concern | Service |
| --- | --- |
| Stateless compute | Lambda (Node.js 24, ARM64, ESM) |
| Durable compute | Lambda Durable Functions |
| Database | DynamoDB |
| Object storage | S3 |
| API | API Gateway REST |
| Messaging | SQS (queues) + EventBridge (events) |
| Configuration | AppConfig |
| Secrets | Secrets Manager |
| Auth | Cognito (optional) |
| Observability | CloudWatch + X-Ray via Powertools |

### Durable execution lives inside Lambda

Without Lambda Durable Functions, durable workflows mean Step Functions, which splits business logic across two languages: TypeScript inside handlers and ASL inside CDK. The decision to retry, branch or compensate lives in the infrastructure repo, not beside the code that has to make it. Durable execution inside Lambda keeps the workflow in one runtime, one packaging step and one observability stack. Stateless and durable code share an IAM model, a logger, a tracer and a deploy.

### Anything outside the list is out

No ECS/Fargate/EKS, no RDS/Aurora, no Pipes, no Step Functions. Every service you add is a service you operate, a runtime to patch, an IAM relationship to audit and one more box on the diagram nobody can hold in their head.

### One bundle target

The Lambda bundle target is one combination, enforced in `GiantsFunction`:

```ts
super(scope, id, {
  architecture: Architecture.ARM_64,
  bundling: {
    banner:
      'import { createRequire } from "module"; const require = createRequire(import.meta.url);',
    format: OutputFormat.ESM,
    logLevel: LogLevel.SILENT,
    minify: true,
    sourceMap: true,
  },
  memorySize: props.memorySize ?? 128,
  runtime: Runtime.NODEJS_24_X,
  timeout: Duration.seconds(props.timeout ?? 10),
  tracing: tracing ? Tracing.ACTIVE : Tracing.DISABLED,
});
```

There is no per-service negotiation about runtime version, architecture, module format or sourcemap policy. There is one choice, and the cost of changing it is a single PR against one file.

## Constrained CDK

Four L3 constructs, exported from one package:

```ts
// packages/cdk/index.ts
export { GiantsApi, type GiantsApiProps, type Route } from './GiantsApi.ts';
export { GiantsAuthoriser, type GiantsAuthoriserProps } from './GiantsAuthoriser.ts';
export { GiantsConfig, type ConfigProfile, type GiantsConfigProps } from './GiantsConfig.ts';
export { GiantsFunction, type GiantsFunctionProps, type TableAccess } from './GiantsFunction.ts';
```

That is the entire infrastructure vocabulary. Stacks compose these; nothing else.

### API routes are data

A `Route` is a plain object. Adding endpoint surface is a literal, not a construct:

```ts
const routes: Route[] = [
  { method: 'GET', path: 'hello', memory: 128, timeout: 10 },
  { method: 'POST', path: 'orders', tableAccess: 'readwrite', secrets: ['stripe/'] },
  { method: 'GET', path: 'orders/{orderId}', auth: true, authScopes: ['orders:read'] },
];

new GiantsApi(this, 'Api', {
  appConfigApplication,
  appConfigEnvironment,
  authoriser,
  basePath: join(import.meta.dir, '../api'),
  database: table,
  isLocal,
  name: APP_NAME,
  routes,
});
```

`GiantsApi` walks the array, derives a sanitised CDK id from method + path, instantiates a `GiantsFunction` per route, attaches the Cognito authoriser when `auth: true` and binds the integration to the API Gateway resource:

```ts
for (const route of props.routes) {
  if (props.isLocal && route.local === false) continue;

  const entry = route.entry ?? route.path;
  const sanitisedPath = route.path
    .replaceAll('/', '-')
    .replaceAll(/[{}]/g, '');
  const name = `${route.method}-${sanitisedPath}`.replace(/^-|-$/g, '');

  const handler = new GiantsFunction(this, name, {
    appConfigApplication: props.appConfigApplication,
    appConfigEnvironment: props.appConfigEnvironment,
    entry: `${props.basePath}/${entry}.ts`,
    environment: { ...props.environment, ...route.environment },
    memorySize: route.memory,
    secrets: route.secrets,
    table: props.database,
    tableAccess: route.tableAccess,
    timeout: route.timeout,
  });

  route.configure?.(handler);

  const authOptions =
    route.auth && props.authoriser
      ? { ...props.authoriser.methodOptions, authorizationScopes: route.authScopes }
      : undefined;

  api.root
    .resourceForPath(route.path)
    .addMethod(route.method, new LambdaIntegration(handler), authOptions);
}
```

Two design decisions are encoded here:

- `local: false` opts an API route out of the LocalStack stack - useful for API routes whose dependencies do not run locally (a third-party webhook, say).
- `configure?(handler)` is the escape hatch for the cases the abstraction does not cover. It hands the raw `GiantsFunction` back to the route definition. There is no middleware chain to break out of.

### Permissions are derived, not written

`GiantsFunction` owns IAM. Handlers do not author policies; API routes declare intent and the construct produces the statements:

```ts
this.addToRolePolicy(
  new PolicyStatement({
    actions: ['appconfig:GetLatestConfiguration', 'appconfig:StartConfigurationSession'],
    effect: Effect.ALLOW,
    resources: ['*'],
  }),
);

if (props.secrets?.length) {
  this.addToRolePolicy(
    new PolicyStatement({
      actions: ['secretsmanager:GetSecretValue'],
      effect: Effect.ALLOW,
      resources: props.secrets.map((prefix) =>
        Arn.format(
          {
            arnFormat: ArnFormat.COLON_RESOURCE_NAME,
            resource: 'secret',
            resourceName: `${prefix}*`,
            service: 'secretsmanager',
          },
          Stack.of(this),
        ),
      ),
    }),
  );
}

if (props.table) {
  const access = props.tableAccess ?? 'read';
  if (access === 'readwrite') {
    props.table.grantReadWriteData(this);
  } else {
    props.table.grantReadData(this);
  }
}
```

The defaults are least-privilege: `tableAccess: 'read'` unless the route says otherwise; Secrets Manager ARNs scoped to declared prefixes; AppConfig actions limited to the two read APIs. The action list grows when route declarations grow, not when handlers feel like calling a new API.

The AppConfig wildcard is intentional and called out in a comment in the source: AppConfig resource ARNs require the application *ID* (a GUID), not the name; tightening it requires threading the construct, which most services do not need. Decisions like this - defaults plus an explicit override - belong inside the L3 construct.

### Environments are typed JSON, validated twice

Configuration lives in `infra/environments/{env}/{profile}.json`. The same Zod schema validates it at synth time *and* becomes the AppConfig JSON Schema validator deployed alongside the data:

```ts
const exampleConfigSchema = z.object({
  greeting: z.string(),
});

const appConfig = new GiantsConfig(this, 'Config', {
  applicationName: APP_NAME,
  profiles: [
    {
      content: readEnvironment(env, 'example'),
      jsonSchema: z.toJSONSchema(exampleConfigSchema),
      name: 'example',
    },
  ],
});
```

`GiantsConfig` provisions an Application, an Environment, an instant-rollout DeploymentStrategy and one HostedConfiguration per profile:

```ts
new HostedConfiguration(this, `Profile-${profile.name}`, {
  application,
  content: ConfigurationContent.fromInlineJson(profile.content),
  deployTo: [environment],
  deploymentStrategy,
  name: profile.name,
  validators: [
    JsonSchemaValidator.fromInline(JSON.stringify(profile.jsonSchema)),
  ],
});
```

### Local and remote share one stack

LocalStack runs *the same constructs*, switched by a single context flag. The bootstrap is in `infra/local.ts`:

```ts
$.env({
  ...process.env,
  AWS_ACCESS_KEY_ID: 'test',
  AWS_SECRET_ACCESS_KEY: 'test',
  AWS_DEFAULT_REGION: 'us-east-1',
  AWS_REGION: 'us-east-1',
  CDK_DISABLE_LEGACY_EXPORT_WARNING: '1',
});

await $`cd ${import.meta.dir} && bunx cdklocal bootstrap --context env=local`;
await $`AWS_ENDPOINT_URL=${LOCALSTACK_URL} bun ${import.meta.dir}/../bootstrap/aws.ts`;
await $`cd ${import.meta.dir} && bunx cdklocal deploy --context env=local --require-approval never`;
```

The only branch in the stack itself:

```ts
const env = this.node.getContext('env');
const isLocal = env === 'local';

let appConfigApplication = APP_NAME;
let appConfigEnvironment: string | undefined;

if (!isLocal) {
  const appConfig = new GiantsConfig(this, 'Config', { ... });
  appConfigApplication = appConfig.applicationName;
  appConfigEnvironment = appConfig.environmentName;
}

const localEnvironment = isLocal
  ? {
      CONFIG_EXAMPLE: readEnvironment('test', 'example'),
      LOCAL: 'true',
    }
  : undefined;
```

Locally, AppConfig is replaced by an environment variable carrying the same JSON. The handler does not change. The swap happens inside the runtime helper - see below.

Deployment is a tiny Bun script:

```ts
// infra/deploy.ts
import { $ } from 'bun';
const env = process.argv[2] ?? 'test';
await $`cd ${import.meta.dir} && bunx cdk deploy --context env=${env} --require-approval never`;
```

`infra/synth.ts` is identical bar the CDK subcommand.

The CDK code is supposed to be boring. Adding a feature is a route, a handler and a schema - never a new construct.

## Composition and DI inside the handler

Dependency injection here is plain function arguments behind interfaces. Handlers do not import a global logger, tracer or config client - they receive these as values, so tests pass mocks and deployments pass the real thing.

Handlers are higher-order functions. The hello handler is the canonical shape:

```ts
const telemetry = createTelemetry({ serviceName: 'hello' });

export const handler: APIGatewayProxyHandler = instrument(
  telemetry,
  async (event) => {
    try {
      const request = parseRequest(
        event.queryStringParameters ?? {},
        helloRequestSchema,
      );
      if ('statusCode' in request) return request;

      const body: HelloResponse = {
        message: `hello, ${request.name ?? 'world'}`,
      };

      return { statusCode: 200, body: JSON.stringify(body) };
    } catch (error) {
      return mapErrorToResponse(error, telemetry.logger);
    }
  },
);
```

Three primitives are at work.

### Telemetry: an interface with two implementations

`createTelemetry` returns a `Telemetry` value. The handler depends on the interface:

```ts
export interface Telemetry {
  readonly logger: TelemetryLogger;
  readonly metrics: TelemetryMetrics;
  readonly tracer: TelemetryTracer;
}

export const createTelemetry = (config: TelemetryConfig): Telemetry =>
  process.env.LOCAL ? localTelemetry(config) : powertoolsTelemetry(config);
```

`powertoolsTelemetry` adapts AWS Lambda Powertools - `Logger`, `Metrics`, `Tracer` - into the `Telemetry` shape. `localTelemetry` returns a `console.*` logger producing the same structured JSON, plus no-op `metrics` and `tracer`:

```ts
export const localTelemetry = (config: TelemetryConfig): Telemetry => ({
  logger: createLocalLogger(config.serviceName),
  metrics: noopMetrics,
  tracer: noopTracer,
});
```

The handler never branches on environment. Tests inject a hand-built `Telemetry`:

```ts
const makeMockTelemetry = () => ({
  logger: { info: mock(), warn: mock(), error: mock(), debug: mock(), appendKeys: mock(), resetKeys: mock() },
  tracer: { trace: mock(async (_n, fn) => fn()), annotateColdStart: mock(), addAnnotation: mock(), addMetadata: mock() },
  metrics: { addMetric: mock(), addDimension: mock(), addDimensions: mock(), flush: mock() },
});
```

That is the entire test fixture. There is no `mock.module` of `@aws-lambda-powertools/*` - the handler depends on `Telemetry`, not the Powertools imports.

### `instrument`: a higher-order function for cross-cutting concerns

`instrument` is the only place that knows how to bind a handler to its observability lifecycle:

```ts
export const instrument =
  (telemetry: Telemetry, handler: Handler): Handler =>
  async (event) => {
    const { logger, metrics, tracer } = telemetry;

    logger.appendKeys({ method: event.httpMethod, resource: event.resource });
    tracer.annotateColdStart();

    let error: unknown;

    try {
      const result = await tracer.trace('handler', () => handler(event));
      tracer.addAnnotation('status_code', result.statusCode);
      logger.appendKeys({ status_code: result.statusCode });
      return result;
    } catch (e) {
      error = e;
      throw e;
    } finally {
      if (error) {
        logger.error('invocation', error as Error);
      } else {
        logger.info('invocation');
      }
      metrics.flush();
    }
  };
```

Cold-start annotation, request-context log keys, status-code annotation, end-of-invocation wide event, guaranteed metrics flush. One file, one place to change. Adding `latency_ms` to every handler is a three-line edit, not thirty.

This is the strategy pattern in HOF clothing - `Handler` is the variation, `instrument` is the policy.

### `parseRequest`: a function that narrows

Validation does not throw out of the handler. It returns:

```ts
export const parseRequest = <T>(
  input: unknown,
  schema: ZodType<T>,
): T | ErrorResponse => {
  const result = schema.safeParse(input);
  if (result.success) {
    return result.data;
  }
  return validationErrorResponse(
    result.error.issues.map((issue) => ({
      property: issue.path.join('.') || '(root)',
      message: issue.message,
    })),
  );
};
```

The handler narrows on the discriminator:

```ts
const request = parseRequest(event.queryStringParameters ?? {}, helloRequestSchema);
if ('statusCode' in request) return request;
// request is fully typed below
```

No middleware, no decorator, no decoder library. The error shape is a stable JSON envelope:

```ts
return {
  statusCode: 400,
  body: JSON.stringify({
    errorId: randomUUID(),
    errorCode: 'ValidationError',
    message: 'Request failed validation',
    details, // [{ property, message }]
  }),
};
```

`mapErrorToResponse` mirrors the same shape for unhandled errors, with an `errorId` that is appended to the logger before the error log fires - so the line clients see and the line operators read share a correlation key without explicit plumbing.

### Config and Secrets: structural schemas, not Zod imports

`ConfigProvider` and `SecretsProvider` accept any validator that exposes a `parse(unknown): T` method:

```ts
export interface Schema<T> {
  parse(input: unknown): T;
}

export interface ConfigProvider {
  getConfig<Configuration>(
    profileName: string,
    schema?: Schema<Configuration>,
  ): Promise<Configuration>;
}
```

That is structural typing doing useful work: Zod, Valibot, ArkType, a hand-written parser - all satisfy `Schema<T>`. The runtime helpers do not depend on a specific library. When a service decides Valibot is faster on cold starts, the runtime helper does not need to change.

Two implementations of `ConfigProvider`:

```ts
export const localConfig = (): ConfigProvider => ({
  getConfig: async <Configuration>(
    profileName: string,
    schema?: Schema<Configuration>,
  ): Promise<Configuration> => {
    const key = `CONFIG_${profileName.toUpperCase().replaceAll('-', '_')}`;
    const value = process.env[key];
    if (!value) throw new Error(`Missing environment variable: ${key}`);
    return validate(JSON.parse(value), schema);
  },
});

export const powertoolsConfig = (
  application: string,
  options: PowertoolsConfigOptions = {},
): ConfigProvider => ({
  getConfig: async <Configuration>(
    profileName: string,
    schema?: Schema<Configuration>,
  ): Promise<Configuration> => {
    const environment =
      options.environment ?? process.env.APPCONFIG_ENVIRONMENT ?? 'default';
    const raw = await getAppConfig(profileName, {
      application,
      environment,
      maxAge: options.maxAge ?? 300,
      transform: 'json',
    });
    return validate(raw, schema);
  },
});
```

Two providers, one interface, structural validators. The handler injects whichever it needs and tests inject a fake. Classical dependency injection without a container.

## Tests are unceremonious

Every dependency is behind an interface (`Telemetry`, `ConfigProvider`, `SecretsProvider`, `Schema<T>`). Every cross-cutting concern is a pure function (`instrument`, `parseRequest`, `mapErrorToResponse`). Tests follow:

```ts
test('emits info wide event with status code on success', async () => {
  const telemetry = makeMockTelemetry();
  const handler = mock(async () => ({ statusCode: 201, body: 'created' }));

  const instrumented = instrument(telemetry, handler);
  await instrumented(makeEvent());

  expect(telemetry.tracer.addAnnotation).toHaveBeenCalledWith('status_code', 201);
  expect(telemetry.logger.info).toHaveBeenCalledWith('invocation');
  expect(telemetry.logger.error).not.toHaveBeenCalled();
});

test('flushes metrics even when handler throws', async () => {
  const telemetry = makeMockTelemetry();
  const handler = mock(async () => { throw new Error('handler error'); });

  const instrumented = instrument(telemetry, handler);

  await expect(instrumented(makeEvent())).rejects.toThrow('handler error');
  expect(telemetry.metrics.flush).toHaveBeenCalled();
});
```

The constructs get the same treatment with the CDK `Template` helper - IAM regressions surface before deployment.

`bun test` runs everything via Turbo with caching. There is no integration-test framework, no Jest config. The cost to add a new test is the cost of writing the test.

## Summary

- **Surface area is small and includes durable execution.** Lambda (stateless + durable) + DynamoDB + S3 + API Gateway + SQS + EventBridge + AppConfig + Secrets Manager + Cognito. Anything outside this list is an explicit decision.
- **L3 constructs encode the policy.** `GiantsApi`, `GiantsFunction`, `GiantsConfig`, `GiantsAuthoriser`. API routes are data, IAM is derived, environments are typed JSON validated twice.
- **Handlers are built from DI and composition.** `Telemetry`, `ConfigProvider`, `SecretsProvider`, `Schema<T>` are interfaces. `instrument`, `parseRequest`, `mapErrorToResponse` are pure functions. The handler depends on the interfaces; the deployment chooses the implementation.
- **Local and remote run the same code.** One `process.env.LOCAL` check inside one factory; nothing above it has to know.

The framework's value is in those choices. The code that encodes them is small enough to read, replace or delete.

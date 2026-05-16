Chapter 7 Testing Serverless Applications


“You hear that Mr. Anderson? That is the sound of inevitability” - Agent Smith, The Matrix



In this chapter, you will explore the attributes and failures modes of serverless applications that must influence a novel approach to testing. You will learn how to devise a test strategy for your team before seeing how to apply this strategy to your tests. The result will be a vastly simpler approach to testing that doesn’t fixate on test categorisation or aim for maximum code coverage and is instead balanced with rapid delivery, fault tolerance and observability.

Promoting software quality has traditionally been focused on identifying and eradicating bugs. The perceived quality of a piece of software was often measured by what went wrong with it. If bugs appeared in production, gaps in test suites were found and filled with more tests.

But software has evolved. User demands have skyrocketed. Software must now be highly-available, low-latency and in a constant state of iteration. The way engineers build software has changed to meet these demands. Modern applications are cloud-native, geographically and logically distributed and a mixture of first-party, third-party and open-source code. To be able to build and operate software like this, whilst enforcing quality, engineering teams need to run tests that give maximum confidence in minimum time, deploy changes rapidly, understand application behaviour instantly and recover from failures automatically.

***Begin sidebar box***
Bugs are inevitable

It is March 2016 in Seoul, South Korea. The greatest Go player of the past decade and winner of 18 world titles, Lee Sedol, sits down to play a new challenger. There is one key difference to this challenger: it is a computer program. AlphaGo has been built and trained by its creator DeepMind with tree search algorithms, neural networks and reinforcement learning. 200 million people tuned in to watch AlphaGo defeat Lee Sedol 4-1; an emphatic, unexpected victory.

This was a triumph for software engineering. But AlphaGo wasn’t entirely void of performance blips and, at one point mid-way through the match, AlphaGo seemingly experienced a glitch. This prompted Andrew Jackson of the American Go Association to remark whilst commentating on the match: “If DeepMind has figured out how to write code that doesn’t have bugs, that is a bigger news story than AlphaGo” (https://www.youtube.com/watch?v=WXuK6gekU1Y).

Even in the face of an incredible feat of artificial intelligence the presence of bugs in software seemed inevitable. Indeed, bugs are so synonymous with software it can seem like a hopeless task to rid your applications of them entirely. Should you instead learn to live with, and even embrace, the bugs in your software?
***End sidebar box***

In the pursuit of a development model that can support the required level of delivery, observability, resiliency and scalability, software engineers have been on a constant quest to decouple components in their systems over the last decade. Several patterns and techniques have been devised to support decoupling, from domain-driven design to microservices, event-driven architecture to serverless itself. But approaches to testing software have not kept up. You can go to great lengths to decouple the development and operation of your software only to couple it again during testing (see figure 7-1).


Figure 7-1 Coupling decoupled services during testing

Testing strategies are still rigid and heavily reliant on deploying applications in order to test them as whole-systems. Once deployed, APIs are called, functions are invoked, database tables are written to and read from, events are produced and messages are sent. Applications are tested from one end to another and each step in the flow is asserted and verified. In reality, does a distributed, event-driven system even have two distinct ends?

In an event-driven serverless application, microservices (a logical collection of resources scoped to a particular function of a domain) are decoupled by design. Serverless services can be iterated on independently from other services in the application’s source code. Services are operated independently and can be scaled according to where demand is in the system. Crucially, services can also continue to operate normally even whilst other services suffer from throttling or outage.

Ultimately, if your services are decoupled in development and at runtime, you must avoid coupling them in your tests. This chapter will help you to understand why serverless testing can be challenging and how to devise your own serverless testing strategy.

How can serverless applications be tested?
Serverless is an entirely new software engineering paradigm. The low-cost, ephemeral nature of serverless technology provides benefits such as increased product delivery speed, abundant freedom to experiment and iterate and bolstered confidence to ship scalable, resilient applications.

Of course, with these benefits come unique challenges. Testing serverless applications always takes top spot when someone writes a list of “things that are hard about serverless”.
Why serverless requires a novel approach to testing
There are several attributes of a typical serverless application that make them difficult to test and force us to devise a different approach:

Latency
Requests to microservices and APIs can vary in latency, with high or unpredictable latency common in services that consist of multi-step workflows or use of third party webhooks to complete processing. Tests with highly variable execution times can often timeout unexpectedly and can be difficult to comprehend and debug.

Event-driven communication
Aside from request-response API endpoints, the majority of components in a serverless application will be logically decoupled and triggered into action by events from other components. These could include asynchronous APIs, which implement mechanisms that only return an acknowledgement to the consumer rather than a full response. Event-driven architectures can be notoriously difficult to test when applying strategies not fit for purpose.

Managed services
The defining feature of serverless applications deployed to AWS are managed services. The code that powers these managed services is developed and operated by AWS. This makes them opaque boxes dotted around your architecture; components you do not own, control or fully understand. The key question here is what parts of these managed services you should be testing, if any.

Distribution
Whole applications and even distinct microservices can be distributed across networked computers, cloud resources, regions and accounts. Backups, replicas, shards and eventually consistent database tables can make systems-under-test moving targets.

Cloud-native
At its core, serverless is a modern evolution of cloud-native technology. Serverless was born in the cloud and designed to fully leverage the benefits of the cloud. This is incredibly powerful when operating your workloads in production but has presented challenges to engineering teams that are used to running and testing their code locally before pushing it to a production, or production-like, environment. Numerous tools and techniques exist to make emulating AWS resources on your machine possible. But the fact remains: it is inordinately difficult to run traditional integration and functional tests without deploying resources to the cloud. This results in an increased feedback loop and development cycle and can severely slow test execution.
Understanding whole systems
A distributed, event-driven, serverless application with all of these attributes becomes very difficult to build, test, deploy and operate as a whole; treating a serverless application as a single application simply does not scale as the codebase grows.

You should instead view your serverless system as a collection of distinct applications. And, by extension, you can only ensure the quality of the whole system by applying quality controls to its components. Each component is intentionally decoupled and operates with very little interface with or dependency on other components. If you attempt to control the quality of the system as a whole you will negate many of the benefits of serverless and, ultimately, fail to properly or efficiently enforce quality.

You will most likely be able to see this already in the your engineering practices: you may have begun to split services into directories so they can be worked on independently; you may deploy these services in isolation via their own dedicated delivery pipelines and CloudFormation stacks; and, you may have pinpointed service-level metrics to trigger alerts rather than generic application or API-level ones.
Serverless Square of Balance: the tradeoff between delivery and stability
It is time to introduce the serverless square of balance (Figure 7-2). The square of balance illustrates the four key activities that must be undertaken to achieve a resilient, high-quality serverless application: test, deliver, recover and observe. Crucially, it is not enough to simply conduct these activities; they must be designed and undertaken in the most efficient way possible. They must all be balanced against one and another by not overly relying on one or two techniques.


Figure 7-2 The Serverless Square of Balance. Achieving this balance of focus in your microservices is the key to serverless harmony.

The authors of Google’s Site Reliability Engineering (SRE) book assert that software can be too stable, to the point that stability can be detrimental to quality: “maximizing stability limits how fast new features can be developed and how quickly products can be delivered to users, and dramatically increases their cost, which in turn reduces the number of features a team can afford to offer”. The authors encourage you to take calculated risks when verifying your software before shipping it: “Our goal is to explicitly align the risk taken by a given service with the risk the business is willing to bear. We strive to make a service reliable enough, but no more reliable than it needs to be” (https://sre.google/sre-book/table-of-contents/).

The risks you take to increase delivery speed by reducing test coverage must always be counteracted with useful alerts, automated recovery from failure and effective debugging of root causes.
Move fast and make things
Chapter 6 discussed the importance of establishing and maintaining a rapid development and delivery workflow, as well as preparing for everything to fail by making operations tolerant of faults and able to recover automatically.

The quality of a serverless application relies on delivery speed and application stability. In most cases, speed should always be preferred to stability. Stability is a product of speed; without speed there is no stability.

Optimising for speed is often seen as a decision to sacrifice quality. Take the old Facebook engineering adage: “move fast and break things”. This implies your applications must be broken if you are to develop them quickly. The DevOps Research and Assessment (DORA) research found the opposite to be true amongst high-performing software product teams (https://www.devops-research.com/research.html). First published in the Accelerate book (https://itrevolution.com/product/accelerate/), the authors’ research found that high-performing teams delivered code into production (from commit to deployment) 440 times faster than low-performing teams whilst having a change failure rate 5 times lower.

In serverless applications, maintaining the quickest possible delivery speed underpins your entire strategy for promoting quality and great user experience. It is no use budgeting for errors and fine-tuning your alerts to identify bugs as soon as possible if you cannot remove the bugs from your production environment rapidly.
Balancing test coverage with observability and recovery
As your serverless application grows, exponentially adding tests for new features and regressions will prove to be the biggest drag on delivery speed. Excessive test suites will drastically slow your engineers and your pipelines down. Instead, you need to find a way to balance between pre-deployment testing and observability and resiliency in production.

As Cindy Sridharan says in her seminal post Testing Microservices, the sane way: “When it comes to testing … microservices, most organizations seem to be quite attached to an antediluvian model of testing all components in unison. Elaborate testing pipeline infrastructures are considered mandatory to enable this form of end-to-end testing where the test suite of every service is executed to confirm there aren’t any regressions or breaking changes being introduced.” She goes on to suggest: “to be able to craft a holistic strategy for understanding how our services function and gain confidence in their correctness, it becomes salient to be able to pick and choose the right subset of testing techniques given the availability, reliability and correctness requirements of the service.” (https://copyconstruct.medium.com/testing-microservices-the-sane-way-9bb31d158c16)

By far the most effective strategy to improve delivery speed is to reduce pre-deployment test coverage. This may seem counterintuitive to preserving quality at first but only when this action is assessed in isolation. Reducing test coverage without introducing any other quality assurance methods is never going to be a good idea.

Any perceived drop in pre-deployment test coverage made to preserve delivery speed should be balanced with other forms of quality assurance, including alerting of degraded performance of critical user experiences and the ability to recover from any bugs that may be introduced. You can read more about the emergent practice of observability in Chapter 8 and more about fault tolerance in Chapter 6.

The key to a scalable, effective set of tests is defining a clear test strategy to help engineers understand what to test and when to test it. Without this strategy, test suites and staging environments can quickly balloon out of control and ground development and delivery to a halt.
Serverless failure mode and effects analysis
To decide on an appropriate test strategy for your serverless application you first need to understand what can go wrong. Given the extensive use of managed services in serverless applications, it is also important to understand the division of responsibility between you and AWS.

***Begin tip box***
This chapter primarily covers the aspects of software testing that are unique to serverless and how your mindset needs to shift. But it is important to note that your fundamental approach to testing will largely remain the same and the majority of the tests you usually write will still need to be written and executed.

This is particularly true for the business logic you implement in your language of choice and run in Lambda functions. You should use unit tests to maintain the quality of this code in the exact same way as when you ran it on servers.
***End tip box***
What can go wrong?
Failure modes will largely depend on the architecture and logic of the application. When designing or implementing a new serverless application or feature, you should analyse the architecture and explore the things that could fail in production.

To help frame your analysis, review some common serverless failures:

Insufficient IAM permissions. This is a very common issue and typically returns errors such as “unauthorised operation” or “access denied” when a resource attempts to perform an operation not permitted by its IAM role. Wherever possible, IAM policies should be automated with an infrastructure-as-code tool (see Chapter 6 for more information).
Requests to API Gateway endpoints can fail due to misconfiguration of integration with Lambda function handlers or responses that exceed the maximum timeout (30 seconds for HTTP APIs and 29 seconds for REST APIs (https://docs.aws.amazon.com/apigateway/latest/developerguide/limits.html)).
Lambda functions invocations can timeout or exceed memory allocation. Function invocations can also be throttled if the maximum number of account-wide concurrent executions is exceeded.
DynamoDB operations made via the AWS SDK could fail due to incorrect syntax or document paths. Read and write operations could also be throttled if the associated capacity units are exceeded during spikes in traffic.
EventBridge rule invocations could fail if the target is incorrectly configured. An event bus could also fail to ingest an event if the maximum payload size of 256KB (at the time of writing) is exceeded. This failure can easily occur at runtime if you have a property with a potentially large value.
A Step Functions workflow could not execute to completion if a step with a direct service integration fails. A workflow could also fail to execute if the maximum input size of 256KB (at the time of writing) is exceeded. This failure can easily occur at runtime if you have a property with a potentially large value.
SQS queues with dead-letter queues and automatic redrive policies are susceptible to “poison-pill” messages that will continue to fail whenever delivery is retried. If these build up it can disrupt the queue and any downstream consumers.
Kinesis streams can fail if delivery targets are misconfigured.
Failures modes and effects analysis worksheet
The Failure Modes and Effects Analysis (FMEA) worksheet in Appendix C can be used to determine and categorise failures for the services in your application.

As you analyse the potential failures that could occur when operating your application in a production environment, use the FMEA worksheet to guide your analysis and record the details of the failure, causes and effects.

For each failure you should rate the probability of it occurring, the severity of the failure’s effects if it did occur and the likelihood of the fault being detected by a test suite before deployment to production. Each failure can then be assigned a risk level by multiplying the probability by severity and adding the detection rating. The risk level can then be used to prioritise test coverage of the component and failure mode, as well as observability and fault tolerance.

Designing a serverless test strategy
The test-driven development (TDD) movement made testing a primary concern for software engineers and championed automation over human toil. Since TDD was popularised, automated testing has become the status quo. Manual testing still has a role to play but it should only be applied in appropriate scenarios, never as the default. Predictability is of course a key proponent of automated tests and this will be explored later in this chapter.

Beyond the sociotechnical behaviours TDD encourages, the core practice of TDD involves first writing tests that will fail based on a feature’s requirements and then implementing that feature until the tests pass. In reality, with cloud-native serverless applications you will find you rarely run tests locally, aside from directly before committing the code changes to source control perhaps. This is mainly due to the difficulties associated with emulation.

With web applications or monolithic backends it is trivial to spin-up local instances and continually run full end-to-end test suites in response to every code change you make in your IDE. Testing can be a part of the development cycle. Because testing cloud-native software involves a different approach in order to integrate it into a rapid development feedback loop it has forced engineering teams to rethink the role testing plays in developer workflows.

***Begin note box***
Whilst you are getting started with serverless it can seem like a disadvantage to not be able to trivally run your code locally. However, if you can find an ergonomic, quick-enough workflow that suits you (see Chapter 6 for more on this topic), exclusively running and testing your code in the cloud will provide the most accurate (if not the quickest) feedback. You certainly won’t have any “it works on my machine” debates any more.
***End note box***

Serverless engineers work best when contributing tightly-scoped changes and frequently integrating these changes with the rest of the codebase. These changes can be deployed in isolation to the cloud and tested in full. The difference is the feedback an engineer receives is obtained remotely, in a delivery pipeline running on a continuous integration platform, rather than locally in a terminal on their machines.

Any serverless test strategy must be designed with the unique attributes of serverless applications in mind and optimised to support the serverless engineering workflow, as described in Chapter 6. Devising a test strategy as early as possible in the lifetime of your application is absolutely crucial to the scalability of its development and stability. Applying an ill-conceived or organically-evolving test strategy will eventually catch up with you and drastically slow delivery down, which in-turn will impact stability and quality.
Identifying the critical paths
A critical path is typically a user experience that is critical to the operation of your business. User requests that follow critical paths include ordering a taco, making a payment for your daughter’s Christmas toys, donating to a charitable cause or tracking a parcel. If these requests go wrong or don’t work as expected it can be considered detrimental to the service your business offers to its consumers.

Identifying the critical paths in your application can help you decide how to apply the serverless square of balance and focus engineering resource.
Critical paths
Your users are usually present at some stage of a request’s journey along a critical path. These requests are typically time-sensitive and expect a synchronous response. Recovery from failure (or fault tolerance) is a less viable strategy for supporting the quality of your application. Retrying requests could increase latency to an unacceptable level and your permission to retry these operations will be diminished when the user is no longer present or available to give explicit permission.

The operational quality of critical paths should be primarily supported through extensive test coverage and alerting. You must ship as few bugs as possible to these microservices.

***Begin note box***
The topic of load testing may seem redundant when it comes to serverless workloads. After all, you have chosen serverless for scalability. Yet, whilst your APIs and Lambda functions will usually surprise you with their effortless ability to scale to your spikiest traffic, it is still very worthwhile to conduct a series of tests that put your application under various load profiles. Load testing your critical paths in particular is essential before any user events of significant scale.

You should analyse your predicted traffic and usage patterns and design performance test scenarios based on these predictions and historical data. Pay particular attention to integration points between different AWS managed services where usage volume quotas apply (see Chapter 8) and any connections between your application and third party APIs or internal downstream systems that may not be capable of the same scalability as your application.
***End note box***
Noncritical paths
The noncritical paths in your application will usually be background processes. These will not be time-sensitive and will be fully recoverable in the event of performance degradation or outage; either in response to transient bugs or persistent errors, following a code fix or rollback.

The operational quality of noncritical paths should be primarily supported through alerting and fault tolerance. You can afford to ship a higher percentage of bugs that disrupt these paths, within your error budgets (see Chapter 8 for more information about error budgets).
Is it a critical path?
You can pose these questions of your microservices to understand if they include critical paths:
Is someone or something relying on the request being served in a timely manner; either near-immediate (synchronous responses) or as-soon-as-possible (asynchronous responses)?
Can the request be idempotently retried at a later date?
Does handling the request involve storing or updating application or business-critical data?
Just enough and just-in-time
As you have seen so far in this chapter, your test coverage should be kept to a minimum and be focused on your critical user experiences. You should only test just enough of your application to provide the confidence required to release a change into production. Serverless testing is not about catching all possible bugs, it is about catching the bugs that will wreak the most havoc to your users’ experience.

In the serverless square of balance, testing cannot restrict your ability to deliver. If you have more than enough tests that take too long to execute (or even worse, are flaky and require multiple runs to pass) this will destroy engineering productivity. In some cases, an inefficient test strategy can deter engineers from making frequent releases due to the burden and frustration associated with deploying changes.
Just enough testing
Adopting a test strategy of “test everything all the time” simply does not scale. As your application’s codebase grows and becomes increasingly fragmented across microservices and infrastructure stacks, this all-encompassing test strategy will require you to continually add more tests, spreading those tests across more service boundaries. No matter how much you optimise the performance and parallelisation of these tests they will inevitably take longer and longer to run and become more complex to orchestrate.

Test coverage can be limited to the minimum level by adapting test coverage according to production stability and risk of bugs: reduce tests for highly stable user experiences and temporarily increase coverage for unstable ones until they stabilise. Remove tests that rarely or never fail as they are probably not testing anything that is likely to break in production. Remove flaky tests that often fail initially and pass when retried. Flaky tests will promote a culture of easily ignoring test results and quickly erode confidence in your test strategy, similar to an alert that is always ignored.

***Begin warn box***
Whilst removing tests that provide little or no value is a sensible strategy for achieving an efficient balance between delivery and stability, this approach should always be used with caution. You must fully understand the purpose of the test and be sure of its lack of value before removing it. You can also consider running the test less frequently before removing it altogether.

Mutation testing is a technique that involves deliberately introducing bugs and seeing which tests catch them (https://en.wikipedia.org/wiki/Mutation_testing). As your application matures and grows, you can use mutation testing as a method for identifying useless tests. 
***End warn box***

Your test suites can also be limited by the type of tests that you write and execute. A sound strategy to apply to serverless applications is to prefer static testing as far as possible. Static testing does not require deployment of microservices to the cloud and can be implemented via unit tests and static analysis. These static tests can be further limited by primarily focusing them on your critical paths.
Just-in-time testing
To efficiently test and deliver your serverless applications, it is not enough to limit your test coverage; you must also limit the number of times those tests are run.

Serverless and infrastructure-as-code make it possible and inexpensive to replicate your production environment. However, if a test passes in one non-production environment it is likely to pass in any others. What really matters is that the code runs as expected in production. This means it is crucial to deliver that code as quickly as possible to your production environment and leverage observability to learn about your application’s behaviour under real traffic.

The practice of continuous integration (CI) encourages teams to integrate code changes as regularly as possible and is a prerequisite for continuous delivery. The Minimum Viable CD  manifesto recommends that “work integrates to the trunk at a minimum daily” (https://minimumcd.org/minimumcd/).

***Begin tip box***
For a deep-dive into continuous integration be sure to read Martin Fowler’s canonical article from 2006 (https://www.martinfowler.com/articles/continuousIntegration.html).
***End tip box***

Prior to releasing your code, the most important thing is iteration speed and integration. The closer you test your code to production the more valuable the results of this test will be. You need to shift-right on testing and make it later in your software’s delivery lifecycle. In general, you should perform the bulk of testing just before deploying to production; this is when it matters most as it is closest to being released to your users.

The best time to catch a bug is before it has the chance to impact a large percentage of your users; just in time. This could be in a pre-production staging environment or in production itself, through post-deployment tests like synthetic canaries or efficient, finely-tuned alerts.
Environments
The traditional approach to software testing involves the use of multiple pre-production, or staging, environments. A snapshot of the application is deployed to the first environment in the chain and then promoted to the next environment as soon as all the tests pass until this version of the application finally reaches production.

The common perception here is that by testing the application multiple times the more quality is guaranteed. Whilst this may be true for monolithic applications, the opposite is true for distributed, serverless applications. Simulating the variables and emergent complexity of your serverless application’s production environment is impossible. You should instead run tests in as few environments as you are comfortable with; ideally no more than one or two. The further away a code change is from production the less confidence (and therefore value) a test can provide.

One of the conundrums of serverless is the proliferation of non-production environments. The ability to provision and replicate applications across AWS accounts with speed and integrity is definitely a major benefit of serverless. However, this has been misused in an attempt to provide temporary environments to run automated tests for every single pull request. This is ultimately the antithesis of continuous integration. Many serverless teams that have adopted this practice have seen their pull request integration times exponentially increase as their codebase grows.

These ephemeral pull request environments can still be useful but they should be used sparingly for specific scenarios. In general, you should use pull request environments with caution and only run tests against deployed resources when you absolutely need to. Instead, you should leverage instant environments if you do need to run integration tests on deployed resources. Instant environments are provisioned just for tests and are isolated to the system-under-test, which is usually two or three integrated components.
Upholding standards with a Definition of Done
You may have encountered different forms of a “definition of done” or seen various definitions of such a document. The Scrum.org™ Scrum Glossary defines a definition of done as: “a formal description of the state of the Increment when it meets the quality measures required for the product. The moment a Product Backlog item meets the Definition of Done, an Increment is born. The Definition of Done creates transparency by providing everyone a shared understanding of what work was completed as part of the Increment. If a Product Backlog item does not meet the Definition of Done, it cannot be released” (https://www.scrum.org/resources/scrum-glossary).

The core intent of a definition of done is simple: if a change “meets the quality measures” it can be released. A definition of done can be used to provide a very simple indicator of whether a change to your application can be shipped to your users. That moment of merging a change to the trunk and triggered an automated deployment can be tense and fraught. To counteract these feelings it can be useful to remind yourself of what “done” really means.

***Begin sidebar box***
Defining done
Nothing is ever truly done. Software is never perfect. Bugs are inevitable.

The Cult of Done Manifesto (https://medium.com/@bre/the-cult-of-done-manifesto-724ca1c2ff13) is a motivational resource for getting things done, whatever your task may be. Point 12 rings particularly true for serverless software engineering: “If you have an idea and publish it on the internet, that counts as a ghost of done.” This can be interpreted as defining “done” as getting something in front of your users. It doesn’t matter if that thing is complete and polished; what matters most is that it is now gathering usage data that can be used to inform improvements.

Shipping imperfect features should never be confused with promoting unilateral, careless engineering. Software engineering should always be a social activity and the needs of your users held in the highest regard. But the best software is always software that is being used.

If you don’t ship your software you will never know if it really works in production, under real traffic and with all the other code and variables out there in the wild. A definition of done checklist will give you the right confidence to ship: not the confidence of whether your change will work but the confidence that you’ll know if it isn’t working.

Go forth and release the ghosts of done!
***End sidebar box***
Definition of Done template
Answering these questions will allow you to pragmatically decide whether a change can be released or not. Document them somewhere accessible to your engineers and attach it to any artefacts associated with the work being undertaken, such as pull requests or task tickets.

How will the quality of this code be measured? This will be down to your team to decide. You could link quality to Service Level Objectives (explored in Chapter 8), application performance metrics or business metrics.
How will this code be released to production users? It might be released immediately upon deployment, rolled-out with a blue/green strategy or constitute a dark release where it is available in production but not publicised to users.
How will you know if this code is broken before production? What pre-deployment tests are in place and what aspects or failure modes of the code do they cover?
How will you know if this code is broken in production? What alerts are in place and under what conditions will these alerts be triggered?
How will you be able to debug this code if it breaks in production? Is distributed tracing enabled for this component? What logs are available? Is there a runbook for triaging potential or known failures?
How will this code recover from failure in production? How is this code tolerant of faults, either its own or others? What recovery mechanisms are in place, for example dead-letter queues and retries.

Hands on serverless testing
From the previous sections of this chapter you have started to form a mental model of how to approach testing a serverless application. Now it is time to look at applying this model to an example architecture.

Before testing any application it is important to understand exactly what you are testing. As you’ve seen in this chapter serverless applications will most likely be substantially different to other types of applications you and your team have tested in the past, such as monolithic server-based backends or client-centric web applications. The two attributes of serverless that most impact testing are the extensive use of managed services and the event-driven interaction between these services as data flows through the system.
Event-driven testing
If you look beyond the purpose of your software product and the myriad AWS services available to you and instead scrutinise the patterns and actors in a serverless application you will notice a group of recurring elements (see figure 7-3).


Figure 7-3 When dissected an event-driven serverless application consists purely of business logic, managed services and the integration points between them. Effective testing relies on a clear delineation of the responsibilities between you and AWS. You are responsible for testing the business logic and integration configuration that you own. Take care not to test the managed services, events, integrations and APIs that AWS owns.
Business logic, integration points and data contracts
These are the three fundamental building blocks to event-driven, serverless applications that are crucial to understand in order to test such applications:

Business logic
The code that you write and deploy to AWS for execution is the business logic of your application; the parts of your software that encode the functional requirements and business rules of the application’s domain. The business logic is the internal mechanics of your system that you own. You are responsible for authoring, maintaining, deploying and operating this code. You are also responsible for testing this code.

Integration points
The distributed components of a serverless application operate in isolation and communicate their independent activity to each other through asynchronous events or synchronous requests. Architecturally speaking, these events and requests reside in a zone between the source and target that can be referred to as an integration point. The integration point between two components represents the method of communication and the format and structure of the messages passed between them. The integration points in your system will almost exclusively be owned and operated by AWS but you will be responsible for configuring these integration points and defining the rules that govern the communication.

Data contracts
A data contract is an encoded ruleset to facilitate communication between logically decoupled services. These contracts are applied between two components in your system, at their point of integration, and enforce the target’s expectations of a source. As well as facilitating verifiable communication at runtime, data contracts are crucial to enabling a scalable and efficient test strategy.

Figure 7-4 shows how these elements map to a simple serverless architecture. The following sections introduce the types of tests that can be used to test this architecture.


Figure 7-4 This reference architecture of a simple event-driven flow shows a common serverless pattern. The EventBridge managed service is used alongside business logic in a Lambda function. You can see two integration points and the types of data contracts that can exist between the components.
Integration points testing checklist
For each integration point you should capture the failure modes for the categories listed in Table 7-5 and decide whether to cover them with tests.

Table 7-5 Integration points testing checklist
Failure Category
Description
Recommended Tests
Configuration
You are responsible for configuring the integration points between managed services, such as event buses and rules. You should verify that the integration exists and is configured according to AWS rules and your business requirements.
Infrastructure tests, unit tests
Permissions
You are responsible for granting the necessary permissions for integrated components to interact with each other. You should verify that the source component has permission to publish events or messages and the target has permission to consume them.
Infrastructure tests
Payloads
The communication channel and message payload used by integrated components should be verified to ensure that an event producer is sending messages according to the contract and the consumer is handling input according to the contract.
Unit tests, contract tests, static analysis


***Begin tip box***
Remember not to couple decoupled components in your tests. Whenever possible, test the source and target of an integration point separately.
***End tip box***
Unit testing business logic in Lambda functions
The business logic of a serverless application is written and executed in Lambda functions. The bulk of business logic testing can be achieved through unit tests that assert the various operations of a Lambda function. You will usually test the individual operations of a Lambda function in isolation rather than testing the function as a whole, by calling the handler method, for instance.

Making your Lambda functions testable will usually involve abstracting and isolating your business logic and sharing the methods with test files. In this simple example of a testable Node.js Lambda function the greeting method can easily be called and verified:

# javascript
export const greeting = (name) => {
	return `hello ${name}`;
}

export const handler = async (event) => {
	return greeting(event.name)
};

The corresponding unit test can import the abstracted method and verify it in isolation:

# javascript
import { greeting } from "./";

test("Should say hello world", () => {
   const actual = greeting("world");

   const expected = "hello world";

   expect(actual).toEqual(expected);
 });
Mocking
Unit tests should be predictable. In other words, a unit test should produce the same result every time it is executed with the same input.

Take the addNumbers method below:

# javascript
export const addNumbers = (numbers) => {
	return numbers.reduce((a, b) => {
return a + b;
});
};

export const handler = async (event) => {
	return addNumbers(event.numbers);
};

This method can be unit tested as any assertions will always produce the same results:

# javascript
import { addNumbers } from "./";

test("Should calculate 1+2+3+4=10", () => {
 const actual = addNumbers([1, 2, 3, 4]);

 const expected = 10;

 expect(actual).toEqual(expected);
});

Any non-trivial Lambda function will usually contain side-effects, such as network requests to third-party vendors or AWS SDK calls. These side-effects are inherently unpredictable. The side-effect could rely on a network connection to the public internet, for example. The computed result of a side-effect may also depend upon a third-party implementation that is subject to change.

These side-effects must be mocked to keep unit tests predictable - and fast.

***Begin note box***
The popular criticism of mocking (or “stubbing”) parts of a system-under-test is that it is not a true test of the system. This is certainly a valid criticism but only if your aim is to properly replicate the whole system in order to verify its quality and adherence to its requirements.

You have already begun to see why testing a serverless system as a whole may not be the optimum strategy. Identifying the parts of your Lambda functions to mock is usually a by-product of drawing the boundaries of responsibility between you and your vendors. It is a sensible strategy to mock any code that you are not responsible for testing or fixing.
***End note box***

Mocking is an essential tool when testing serverless microservices but it is not without its pitfalls. The problem with mocking comes at scale. Your tests will scale with a lot less friction if you isolate mocks to individual tests and units-under-test rather than mocking once on a global level.

The following example uses the JavaScript AWS SDK to put an event on an EventBridge event bus:

# javascript
import { EventBridgeClient, PutEventsCommand } from "@aws-sdk/client-eventbridge";

export const eventbridgeClient = new EventBridgeClient();

export const handler = async () => {
 const putEventsCommand = new PutEventsCommand({
   Entries: [
     {
       Detail: JSON.stringify({ "order": "1234" }),
       DetailType: "Order.Created",
       EventBusName: "order-bus",
       Source: "service.order",
     },
   ],
 });

 await eventbridgeClient.send(putEventsCommand);

 return;
};

The send method on the EventBridge client can be mocked in the unit test. When the Lambda function handler is called, the SDK request won’t be made. Instead, a spy can be attached to the mock, allowing you to assert the SDK request will be made with specific parameters:

# javascript
test("Should put event", async () => {
   const putEventsCommandSpy = jest
     .spyOn(eventbridgeClient, "send")
     .mockImplementation(() => {});

   await handler();

   expect(putEventsCommandSpy).toHaveBeenCalledTimes(1);

   expect(putEventsCommandSpy).toHaveBeenCalledWith(
     expect.objectContaining({
       input: {
         Entries: [
           {
             Detail: '{"orderId":"1234"}',
             DetailType: "Order.Created",
             Source: "service.order",
           },
         ],
       },
     })
   );
 });
Static analysis
If you are using a language and runtime that supports static typing you can leverage static analysis as a method to verify the requests sent to a third party and your handling of their response.

***Begin note box***
Static analysis is the process of verifying software without executing it.
***End note box***

Third parties will often provide official type definitions in various programming languages. These type definitions should be applied to operations in your Lambda functions that involve sending API requests and handling responses. Providing the type definitions are correct and synchronised with the version of the API you are using, you can assume that the request you send will be accepted and produce the expected result:

# typescript
import { PaymentRequest, PaymentResponse } from "@payment/api"

const handler = async () => {
	const response: PaymentResponse = await fetch("https://payments.co/api/payment/", {
		body: JSON.stringify({ "amount": 100 } as PaymentRequest),
		method: "POST",
});

	return response.paymentId;
};

Aside from some specific scenarios, there is usually no need to make the API request to verify your integration with a third party. The type definitions represent your data contract with the third party vendor. Figure 7-5 shows how this might look as a conversation.


Figure 7-5: Contracts can be established between you and your third party providers through request and response schema and enforced in your codebase with type definitions and static analysis
Contract testing integration points
The typical approach to testing the integration between two or more components, or microservices, in a system involves deploying the components, making a request to an entry point, like an API endpoint, to trigger the integrated process and asserting on the intermediate and ultimate state of the components.

This integration testing strategy usually requires the creation and maintenance of a complex delivery pipeline and produces brittle test suites that couple the decoupled components-under-test. Whilst there may be scenarios where this approach makes sense, it will probably generate far too much overhead to be valuable.

***Begin sidebar box***
Testing of the cloud

One additional consideration for serverless applications is the role of managed services. The business logic components in your application will most likely be integrated with a managed service. Where integration points involve managed services it becomes necessary to consider the remit of your operational and, by extension, your testing responsibility. You should only be testing the code you are responsible for and make sure you are not testing AWS. It can be useful to keep in mind the mantra: “if you can’t fix it you shouldn’t test it”.

The shared responsibility model (covered in Chapter 4) for cloud security can be extended to provide guidance on where to draw the boundaries of application testing. The responsibility of AWS can broadly be described as testing of the cloud. Take the example of an EventBridge rule. It is your responsibility to configure the custom event bus that will receive events (unless using the default event bus), the event pattern to match against incoming events and the target to trigger when matching events are received by the bus. AWS will operate the event bus, accept incoming events, analyse events for matching patterns and trigger the corresponding targets.

You are responsible for the configuration of managed services and AWS are responsible for the operation of them. To preserve this boundary in your tests, you should be able to test this configuration without the need to invoke the underlying services.
***End sidebar box***

Instead of testing integration points by deploying and invoking the integrated microservices and managed services you can use data contracts to verify the correctness of integrations.

***Begin note box***
You may have encountered contract testing before. The prevalent approach to contract testing involves the use of the Pact framework (https://pact.io/). Whilst you may choose to use such a framework, it is important to distinguish between the principle of contract testing (statically testing requests and responses against agreed data types) and the implementation of contract testing via frameworks such as Pact.

This chapter explores contract testing as a form of unit testing, without the use of any additional frameworks beyond standard primitives like JSON Schema.
***End note box***

In the context of a serverless application on AWS, a data contract can exist between any distinct resources that are connected by an asynchronous (e.g. event or message) or synchronous (e.g. API request) communication. A data contract could be enforced to verify the correctness of an integration for SQS messages, API Gateway integrations, Step Functions inputs, DynamoDB operation payloads and so on.

As highlighted earlier in this section, for each integration point there are usually three elements to test: permissions, payloads and configuration. Let’s look at an example for each of these elements based on the reference architecture described in Figure 7-4.
Testing integration configuration
In the example architecture (Figure 7-4), you are responsible for the configuration of the custom EventBridge event bus and the EventBridge rule, which includes the event pattern and the target.

Using an infrastructure-as-code framework such as the AWS Cloud Development Kit (CDK) allows you to make assertions about the resources in the underlying CloudFormation template.

This example demonstrates a strategy for testing EventBridge event patterns to ensure the rule will match events as expected:

# javascript
import { Capture, Template } from "aws-cdk-lib/assertions";
import { EventBridgeClient, TestEventPatternCommand } from "@aws-sdk/client-eventbridge";
import OrderCreated from "./schema/service.order@OrderCreated-v1.json";

const eventbridge = new EventBridgeClient({});

test("Order.Created rule event pattern matches Order.Created events", async () => {
 const eventPatternCapture = new Capture();

 template.hasResourceProperties("AWS::Events::Rule", {
   EventPattern: eventPatternCapture,
 });

 const testOrderCreatedPatternCommand = new TestEventPatternCommand({
   Event: JSON.stringify({
     account: stack.account,
     "detail-type": OrderCreated["x-amazon-events-detail-type"],
     source: OrderCreated["x-amazon-events-source"],
     time: new Date(),
     region: stack.region,
   }),
   EventPattern: JSON.stringify(eventPatternCapture.asObject()),
 });

 const testOrderCreatedPattern = await eventbridge.send(
   testOrderCreatedPatternCommand
 );

 expect(testOrderCreatedPattern.Result).toEqual(true);
});
Testing integration permissions
In the example architecture (Figure 7-4), you are responsible for applying the necessary permissions for the event producer function to put events on the event bus and the rule to invoke the target function.

# javascript
test("EventProducer function has permission to put events on OrdersBus", () => {
 template.hasResourceProperties("AWS::IAM::Policy", {
   PolicyDocument: {
     Statement: [
       {
         Action: "events:PutEvents",
         Effect: "Allow",
         Resource: {
           "Fn::GetAtt": [getLogicalId(stack, stack.eventBus), "Arn"],
         },
       },
     ],
     Version: "2012-10-17",
   },
   Roles: [
     {
       Ref: getLogicalId(stack, stack.eventProducer.role),
     },
   ],
 });
});

test("Order.Created rule has permission to invoke EventConsumer function", () => {
 template.hasResourceProperties("AWS::Lambda::Permission", {
   Action: "lambda:InvokeFunction",
   FunctionName: {
     "Fn::GetAtt": [getLogicalId(stack, stack.eventConsumer), "Arn"],
   },
   SourceArn: {
     "Fn::GetAtt": [getLogicalId(stack, stack.orderCreatedRule), "Arn"],
   },
 });
});
Testing integration payloads
In the example architecture (Figure 7-4), you can test the payload sent to EventBridge by the event producer Lambda function by verifying it against a schema definition of the event.

In JavaScript, you could use a JSON schema validation library, such as Ajv (https://github.com/ajv-validator/ajv):

# javascript
import Ajv from "ajv";
import { generateOrder } from "./producer";
import OrderCreated from "../schema/service.order@OrderCreated-v1.json";

test("Should generate valid order", () => {
 const actual = generateOrder();

 const ajv = new Ajv();

 const validate = ajv.compile(OrderCreated);

 expect(validate(actual)).toEqual(true);
});

Summary
Testing serverless applications is generally considered a difficult task. Yet this is often from the viewpoint of a traditional approach to testing. The reality is there are attributes of a serverless application that can make certain testing strategies difficult to practise. Instead, you must reassess the way you test, as well as reconsidering your overall aims for testing and quality assurance.

Rather than battling with your serverless system-under-test, use its unique properties, such as its event-driven architecture and integration with managed services, to design a tailored testing strategy. Serverless testing provides maximum confidence with minimum coverage and should always be balanced with delivery, observation and recovery. Understand what can go wrong with serverless but recognise that bugs are inevitable. Focus on critical paths and use static unit tests and type analysis as far as possible.

Your first step should be to use the serverless square of balance to guide the process of defining your serverless test strategy. The earlier you do this in your project the better. Once you have identified your critical paths and agreed the components and integrations you need to cover with tests, begin to get an idea of how it feels to write and run these tests and gauge the confidence they give you to deliver code into production at speed.

You must be brave enough to learn about your application’s behaviour and layer in tests over time to account for emerging quirks and failures. As the serverless square of balance shows us, the key to a reliable application is leveraging observability and recovery alongside testing to maintain stability and speed. It is time for you to explore serverless software operations.

Interview with an industry expert
Sarah Hamilton, AWS Community Builder and Senior Software Engineer
Sarah Hamilton is a Senior Software Engineer and AWS Community Builder. During her career, she’s been a huge supporter of Serverless technology and takes great pride in contributing to the entire development cycle, from designing architectures to the hands-on process of building and deploying solutions. She enjoys sharing her knowledge by speaking at conferences and writing blog posts.

Q: Serverless has matured as a technology in the last couple of years and best-practice continues to evolve. However, testing still seems to be something teams find difficult to get right with serverless. How do you see the current state and best practice of serverless testing?
Undoubtedly, the testing of Serverless applications is frequently overlooked or seen as an ‘after-thought’. Whilst I believe that our overall understanding of testing Serverless applications is improving, there is still a lot of work to do. There are a few reasons why I believe we haven’t progressed at a faster rate.

Firstly, whilst testing strategies for frontend applications are generally well understood and well documented, with unit tests for business logic and end-to-end browser tests, there is a lack of understanding over exactly what to test in the backend. A lot of my testing knowledge comes from speaking to others in the community and asking what they do. I will outline my current strategy towards testing.

Write unit tests for business logic before writing the logic itself. This is in line with traditional test-driven development. However, I find it to be far more important in Serverless development as it speeds up your development feedback loop. You can simply develop while running your tests rather than deploying to test that your business logic works.
End-to-end tests are crucial, and the real infrastructure should be tested upon. When we build tests, we want to ensure that the testing environment mimics the production environment, and the best way to do this is to test on a deployed copy of the production environment. One caveat is that end-to-end tests tend to require more development time, and creativity and take longer to run in your CI/CD pipeline. That is why I would advocate choosing business-critical flows to test and investing in those.  As an example, take a payment system comprising a few different services. An end-to-end test may simply be “Given an order is placed, then the orders table is updated”. Whilst many different processes may have taken place in the services in between, the end-to-end test is capturing that a particular input produces a particular output. This is a useful test, as it resembles the overall health of the system. If the test fails, then we can assert that something is wrong. But how do we diagnose the exact service that is broken? 
Integration tests! To have a better view of the system and diagnose a fault, it is important to have integration tests that test on a narrower part of the system. You may have several integration tests which break down the overall end-to-end test. The following would be examples of integration tests: 
“Given an order is placed, then an ‘orderCreated’ event arrives on the event bus”
“Given an event arrives on the event bus, then the orders table is updated” 
You can see that the end-to-end test has been broken into two. If a. fails and b. passes, then we can assume there is a fault at the beginning of the flow – but the end-to-end test does not give you that level of detail.

Another issue that arises for developers writing tests is how to deal with the asynchronous nature of serverless applications. When testing on real infrastructure, you must handle the time taken to complete a process – after all, we designed our architecture to be decoupled and asynchronous. Unfortunately, there is no particularly smart way of handling this at the time of writing. I would opt for implementing retries on the assertions we are making and after a reasonable amount of time, fail the test if your expected result doesn’t come back. Of course, these timings and number of retries can be tweaked as you get to know how your system performs.

In addition to this, some Serverless services cannot be inspected easily with the cloud SDK you are using. Storage services can often be easily asserted as you can usually get the object with the SDK and check the result you are expecting.  Other tests can be trickier. Recently, I wanted to test that “Given an object is placed in storage, then the output of the subsequent function is X”. I soon realised that I had no way of inspecting the output of the actual function using the SDK. I found myself writing unwieldy tests to inspect the logs to find the output which had been logged in the function. The test required many retries of various SDK calls. In the end, the test worked, but I decided to abandon it because it was not robust and would be confusing to any other developer who came across it. I decided that the end-to-end test would suffice. The lesson I learnt from this, is that integration testing is sometimes difficult and overcomplicated, but invaluable when done properly.
Q: As a serverless consultant you worked with many startups building diverse serverless applications. How did the test strategies differ between these teams and projects?
Given the context of collaborating with start-ups aiming to swiftly deliver applications to customers, a strategic decision must be made regarding the extent to which testing should be undertaken, with the ultimate goal of achieving a high-quality application.

During my time as a consultant, it was clear that some stakeholders, possessing a background in development, understood the significance of writing tests and upholding quality. Conversely, other stakeholders with a background in business, emphasised speed over quality to meet deadlines. Consequently, the scope of testing could vary somewhat between projects.

With the passage of time, my perspective has evolved, highlighting the necessity of personally advocating for quality assurance. I now ensure that I withhold the label of “completion” until a satisfactory level of testing accompanies the code being deployed. That’s not to say that you shouldn’t have some flexibility because “satisfactory” really does vary depending on the scale of the application being developed.

My definition of “satisfactory” (in terms of testing) for a start-up looking to quickly deliver to market, would look something like the following:

Unit testing is done to a high standard - which means that there is high coverage. Any business logic should be well-tested. Whether this is a start-up or a larger enterprise, this is non-negotiable. It’s a quick win and delivers a lot of confidence in your code and business logic. They also have a low overhead - unit tests tend to run extremely quickly, and therefore don’t take up a large amount of time and resources in your CI/CD pipeline. In addition to this, artificial intelligence pair programmers are very effective at writing unit tests for code, making them extremely quick to produce – of course, these should be used with caution and should only be used as a guide. Code changes should not be merged without unit tests accompanying business logic. 
An end-to-end/integration testing strategy is put together for business-critical paths. End-to-end/integration testing can be somewhat time-consuming so it’s understandable that a vast amount of time spent on this may not be welcomed by stakeholders pushing to get a product out. This is where it’s about compromise - identify your business-critical paths - the paths that must work for the application to be functional. For an e-commerce website, this may be the ‘modifying cart’ flow and the ‘payments’ flow. Once you have identified these, think of a testing strategy that will be effective, but also efficient. Usually, a simple end-to-end test will be a good fit, testing that an input produces a certain output. This will give you the confidence that your overall system is working as expected.
Q: As well as working with startups on greenfield projects you have also seen how mature, enterprise-scale workloads operate in production. How do the enterprise teams you’ve worked with approach testing event-driven serverless systems and what role do quality assurance (QA) engineers play?
At the enterprise level, the impact associated with defects on an application can be very high (in terms of revenue loss, brand reputation etc). Consequently, as companies expand and evolve, more money is invested in upholding quality standards.  

Whilst application engineers continue to write their own unit tests and integration tests where they see fit, QA engineers are designing and implementing clever end-to-end tests, regression testing and ensuring quality is upheld within teams. Of course, application engineers would likely have the skill set to do this, however, many of the more complex tests and overall upkeep of the test suite can be very time-consuming and distract from features those engineers are building. In my view, a notable distinction between start-ups and larger enterprises concerning testing lies in the pronounced emphasis on test coverage, balanced with the efficiency of the CI/CD pipeline to maintain productivity. 

One challenge in enterprises is the mindset shift from manual QA work to writing effective automated tests for serverless applications. Since writing tests for serverless applications will likely require the use of an SDK to interrogate cloud resources, it can be a steep learning curve. It is important that this learning curve is taken as I believe that automated testing is the only way a business can scale with confidence in the increased number of deployments. I believe that QA engineers can get more job satisfaction by owning and maintaining a comprehensive test suite. I have also found that this shift in mindset helps QA engineers and application engineers work more closely together and thus achieve higher-quality products.
Q: You are an outstanding member of the AWS and serverless community, notably as an AWS Community Builder, speaker, podcast guest and open-source contributor. What role can the community play in improving the state of affairs when it comes to serverless testing?
I’ve spoken to many developers about their thoughts on how to test Serverless applications and it is clear to me that there is currently no ‘golden path’ regarded by Serverless engineers. I think that the best way to develop best practices for testing serverless applications is to share our knowledge with each other. Therefore, I think it is very much the community that can drive innovation in our approach to testing serverless applications. Approaches can be very opinionated and therefore it is beneficial that we have increasing content so that developers can form their own opinions on how best to test their applications.

Back in 2021, I wrote a blog article about an integration testing strategy for EventBridge-based serverless architectures. I didn’t anticipate a wide readership, but I believed it was worthwhile to share the strategy my colleagues and I had devised. I consider the blog post a success as it continues to attract a substantial readership event today. However, I believe a contributing factor to its sustained reader interest is the relatively limited amount of content available on this subject – there is a clear need for more opinions on this topic!

I think many people are worried about putting the ‘wrong’ opinion out there for all to see. However, we can all only speak from our own experiences and those experiences are not ‘right’ or ‘wrong’. Personally, I’d love to see more blog posts delving into the challenges and setbacks developers have encountered. At times I think of something to try out, only to discover a lack of related content. Yet, after investing time working on it, I realise it does not work in the way I’d like. It is possible that many others have tried the same thing as me, but chose not to share their unsuccessful experiences, as we generally refrain from publicising our failed attempts. However, I firmly believe that expanding our collective knowledge base empowers us all.
Q: What advice would you give to enterprise software teams starting out with serverless testing?
First and foremost, ensure that you have good coverage on your unit tests and end-to-end tests written for your business-critical paths – those are the basics. Once you have those covered, you can begin to think about integration testing which can help developers to diagnose issues more efficiently.


During this Q&A I’ve purposefully avoided discussing mocking and so-called ‘offline testing’. As a rule of thumb, I’d always opt for testing on the real infrastructure (for integration and end-to-end testing).  However, that isn’t to say there isn’t a place for mocking. Mocking third parties can be especially useful. Your tests should test the code that you can control, not the third-party code. Third parties go down often, which will cause tests to fail. When the tests are integrated into the CI/CD pipeline, the engineers will be blocked from pushing code into production. However, this shouldn’t be the case if the fault isn’t due to the codebase you can control. Therefore, large enterprises may want to think about a strategy to mock third parties – if you do this and your test fails then you know that it’s down to something under your control and not a third-party error. If you do choose to mock your third parties, then the response should be identical to what you would expect from the third party so that it mimics what should happen.  

Therefore, if you have the basics covered and are looking to improve your integration/end-to-end tests, I’d suggest setting up a way of mocking the third parties that you use. I advise this for enterprises as the initial investment is worth it when you have many engineers working on a codebase that could be blocked by the unnecessary failure of the tests.

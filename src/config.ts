export const site = {
	title: "lukehedger.dev",
	description: "Luke Hedger Software Engineer",
	author: "Luke Hedger",
	url: "https://lukehedger.dev",
	lang: "en-GB",
	ogLocale: "en_GB",
	dateLocale: "en-GB",
	dateOptions: {
		day: "numeric",
		month: "short",
		year: "numeric",
	} satisfies Intl.DateTimeFormatOptions,
} as const;

export const menu: ReadonlyArray<{ title: string; path: string }> = [
	{ title: "Home", path: "/" },
	{ title: "Book", path: "/book/" },
	{ title: "Posts", path: "/posts/" },
];

export const social: ReadonlyArray<{ name: string; href: string; icon: "bluesky" | "github" }> = [
	{ name: "Bluesky", href: "https://bsky.app/profile/lukehedger.dev", icon: "bluesky" },
	{ name: "GitHub", href: "https://github.com/lukehedger", icon: "github" },
];

export const intro = {
	heading: "Luke Hedger",
	roles: [
		`software engineer working on distributed systems, serverless, event sourcing, durable execution and continuous ai`,
		`co-author of <a class="cactus-link" href="/book">The Serverless Book</a>`,
		`<a class="cactus-link" href="#talks">speaker</a> at ServerlessDays, GOTO and AWS Summit`,
		`engineering lead at the LEGO Group since 2021. Previously at Cancer Research UK, JAAK Music, Unlease, M&C Saatchi and Lean Mean Fighting Machine`,
	],
} as const;

export const experiments: ReadonlyArray<{ title: string; href: string; desc: string }> = [
	{
		title: "ao",
		href: "https://github.com/lukehedger/ao",
		desc: "Agent orchestrator",
	},
	{
		title: "ao-jj",
		href: "https://github.com/lukehedger/ao-jj",
		desc: "Agent orchestrator with Jujutsu VCS",
	},
	{
		title: "ao-chat",
		href: "https://github.com/lukehedger/ao-chat",
		desc: "Agent orchestrator with inter-agent chat via iroh-gossip mesh",
	},
	{
		title: "giants",
		href: "https://github.com/lukehedger/giants",
		desc: "Serverless development framework",
	},
	{
		title: "meeseeks",
		href: "https://github.com/lukehedger/meeseeks",
		desc: "Personal software factory",
	},
	{
		title: "metrix",
		href: "https://github.com/lukehedger/metrix",
		desc: "TUI dashboard for Claude Code usage metrics",
	},
	{
		title: "sbox",
		href: "https://github.com/lukehedger/sbox",
		desc: "Wrapper around Docker Sandboxes",
	},
	{
		title: "Decider",
		href: "https://github.com/lukehedger/decider",
		desc: "Functional event sourcing decider pattern in TypeScript",
	},
	{
		title: "LSM",
		href: "https://github.com/lukehedger/lsm-ts",
		desc: "Toy LSM tree-based database in TypeScript",
	},
	{
		title: "Lambda Strategy Pattern",
		href: "https://github.com/lukehedger/lambda-strategy-pattern",
		desc: "Implementation of the Strategy Pattern on AWS Lambda",
	},
	{
		title: "Bun Powertools Event Handler",
		href: "https://github.com/lukehedger/bun-powertools-event-handler",
		desc: "Monolithic HTTP proxy Lambda function",
	},
	{
		title: "Bun Lambda",
		href: "https://github.com/lukehedger/bun-lambda",
		desc: "Template for Lambda functions with Bun and CDK",
	},
	{
		title: "Bloblang Lambda",
		href: "https://github.com/lukehedger/bloblang-lambda",
		desc: "Run Bloblang mappings in AWS Lambda",
	},
	{
		title: "Custom Intrinsics",
		href: "https://github.com/lukehedger/custom-intrinsics",
		desc: "Custom Step Functions intrinsic functions powered by LLRT",
	},
	{
		title: "Fluent Lambda Functions",
		href: "https://github.com/lukehedger/fluent-lambda",
		desc: "Write Lambda functions as a fluent interface",
	},
	{
		title: "Wide Telemetry",
		href: "https://github.com/lukehedger/wide-telemetry",
		desc: "Wide logging and wide tracing for AWS Lambda and Step Functions",
	},
];

export const talks: ReadonlyArray<{ title: string; href: string; desc: string }> = [
	{
		title: "What are you waiting for?",
		href: "https://youtu.be/6ssC8590c70",
		desc: "ServerlessDays Cardiff, Oct 2024",
	},
	{
		title: "Serverless Development on AWS",
		href: "https://gotopia.tech/episodes/327/serverless-development-on-aws-building-enterprise-scale-serverless-solutions",
		desc: "Goto Book Club, Sep 2024",
	},
	{
		title: "How to replace a critical API",
		href: "https://www.youtube.com/watch?v=z1WN7AXim3g",
		desc: "ServerlessDays Belfast, May 2024",
	},
	{
		title: "A Serverless User Journey",
		href: "https://www.aleios.com/talks/a-serverless-user-journey-on-lego-com",
		desc: "Serverless London, May 2023",
	},
	{
		title: "A Serverless User Journey",
		href: "https://serverless-architecture.io/serverless-architecture-design/serverless-user-journey/",
		desc: "Serverless Architecture Conf London, Apr 2023",
	},
	{
		title: "Cross-Domain Events with AsyncAPI and AWS",
		href: "https://www.youtube.com/watch?v=qjarcJQVLOg",
		desc: "AsyncAPI Conference, Nov 2022",
	},
	{
		title: "Pioneering Serverless Payments",
		href: "https://slides.com/lh4/pioneering-serverless",
		desc: "Serverless Architecture Conf Berlin, Oct 2022",
	},
	{
		title: "How To Write Node.js Lambda Functions",
		href: "https://www.youtube.com/live/ktTPSC4uEqw?si=zYiSXFMnHZlmqsW2&t=11316",
		desc: "Serverless Days Student Edition, Aug 2022",
	},
	{
		title: "Serverless: Ship on Day 1",
		href: "https://www.youtube.com/live/h1v2xfaEWc8?si=Dw5PbAyxil9uw-u2&t=13731",
		desc: "Serverless Days Student Edition, Aug 2022",
	},
	{
		title: "Pioneering Serverless Payments",
		href: "https://slides.com/lh4/serverless-payments",
		desc: "Brick by Brick, Aug 2022",
	},
	{
		title: "Continuous Serverless Delivery",
		href: "https://www.youtube.com/watch?v=6FzLjpMYcu8&t=8052s",
		desc: "SST 1.0 Conf, May 2022",
	},
	{
		title: "Sensitive Data Detection Pipelines",
		href: "https://slides.com/lh4/sensitive-data-detection-pipelines-06fc75",
		desc: "AWS Summit London, Apr 2022",
	},
	{
		title: "Serverless at Cancer Research UK",
		href: "https://www.youtube.com/watch?v=s0nX_MDSDag&t=742s",
		desc: "Serverless London, May 2020",
	},
];

export const POSTS_PER_PAGE = 10;

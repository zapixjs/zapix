export type PostBlock =
	| { type: 'p'; text: string }
	| { type: 'h2'; text: string }
	| { type: 'h3'; text: string }
	| { type: 'code'; lang: string; code: string; filename?: string }
	| { type: 'ul'; items: string[] }
	| { type: 'ol'; items: string[] }
	| { type: 'callout'; variant: 'tip' | 'note' | 'warning'; text: string }
	| { type: 'hr' };

export type Post = {
	slug: string;
	title: string;
	description: string;
	date: string; // ISO YYYY-MM-DD
	author: string;
	readingTime: string;
	tags: string[];
	content: PostBlock[];
};

const posts: Post[] = [
	{
		slug: 'why-we-built-zapix',
		title: 'Why We Built Zapix: Express-style Routing for AWS Lambda',
		description:
			'The story behind Zapix — how the frustration of writing boilerplate Lambda handlers led us to build a tiny, zero-config routing library with the DX you already love.',
		date: '2026-03-14',
		author: 'Raihan Sharif Rimon',
		readingTime: '5 min read',
		tags: ['zapix', 'serverless', 'aws-lambda', 'open-source'],
		content: [
			{
				type: 'p',
				text: 'Every time I started a new AWS Lambda project, the routine was the same: write a giant switch-case on event.httpMethod + event.path, manually parse JSON bodies, forget to set Content-Type headers, reinvent 404 handling, and paste the same middleware boilerplate from the last project. Sound familiar?',
			},
			{
				type: 'p',
				text: 'Zapix was born out of that frustration. The goal was simple: bring the Express.js developer experience to serverless Lambda — without sacrificing cold-start performance or adding a mountain of dependencies.',
			},
			{
				type: 'h2',
				text: 'The problem with Lambda handlers in the wild',
			},
			{
				type: 'p',
				text: 'Most Lambda HTTP handlers end up looking something like this:',
			},
			{
				type: 'code',
				lang: 'typescript',
				filename: 'handler.ts (before Zapix)',
				code: `export async function handler(event: APIGatewayProxyEvent) {
  if (event.httpMethod === 'GET' && event.path === '/users') {
    const users = await getUsers();
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(users),
    };
  }
  if (event.httpMethod === 'POST' && event.path === '/users') {
    const body = JSON.parse(event.body ?? '{}');
    // validate, save, respond...
  }
  return { statusCode: 404, body: 'Not found' };
}`,
			},
			{
				type: 'p',
				text: 'This is brittle, hard to test, and impossible to scale. Add a few more routes and you have a 200-line function nobody wants to touch.',
			},
			{
				type: 'h2',
				text: 'The Zapix approach',
			},
			{
				type: 'p',
				text: 'We took inspiration from Express.js — arguably the most ergonomic HTTP routing API ever designed — and built a minimal adapter that speaks the Lambda event/response protocol natively:',
			},
			{
				type: 'code',
				lang: 'typescript',
				filename: 'handler.ts (with Zapix)',
				code: `import { Zapix } from 'zapix';
import { handler } from 'zapix/aws';

const app = Zapix();

app.get('/users', async (req, res) => {
  const users = await getUsers();
  res.json(users);
});

app.post('/users', async (req, res) => {
  const body = req.body;
  const user = await createUser(body);
  res.status(201).json(user);
});

export const main = handler(app);`,
			},
			{
				type: 'callout',
				variant: 'tip',
				text: 'The handler() adapter converts the Zapix app into a standard Lambda handler. You export main and Lambda calls it — no glue code needed.',
			},
			{
				type: 'h2',
				text: 'Design decisions we made deliberately',
			},
			{
				type: 'ul',
				items: [
					'**Zero dependencies** — No bloated node_modules subtree slowing down your cold start. Zapix has zero runtime dependencies.',
					'**< 5KB bundle** — Small enough to fit comfortably in a Lambda layer or inline in any deployment package.',
					'**TypeScript first** — Full type inference on req, res, and route params. No @types/* packages needed.',
					'**Zero config** — Import, route, export. Done. No app.listen(), no port management, no server lifecycle.',
					'**Chainable middleware** — app.use() works exactly the way you expect it to.',
				],
			},
			{
				type: 'h2',
				text: "What's next",
			},
			{
				type: 'p',
				text: "We just released v1.0.0-beta.1. The API is stable and we're using it in production. Coming up: route-level caching hints, built-in validation helpers, and a companion CDK/SAM construct for instant deployment.",
			},
			{
				type: 'p',
				text: 'If Zapix solves a real problem for you, give us a star on GitHub — it helps more developers find the project.',
			},
		],
	},
	{
		slug: 'lambda-cold-start-optimization-2025',
		title: 'Lambda Cold Start Optimization in 2025: A Practical Guide',
		description:
			'Cold starts are the top complaint about AWS Lambda. Here are the techniques that actually move the needle — from bundle size to init code placement — with benchmarks.',
		date: '2026-03-14',
		author: 'Raihan Sharif Rimon',
		readingTime: '7 min read',
		tags: ['aws-lambda', 'performance', 'serverless', 'typescript'],
		content: [
			{
				type: 'p',
				text: "Cold starts add latency on the first request after a Lambda function is idle. For most functions this is 200–600ms on Node.js — annoying for APIs, deal-breaking for latency-sensitive workloads. Here's what actually works.",
			},
			{
				type: 'h2',
				text: '1. Minimize your bundle size',
			},
			{
				type: 'p',
				text: 'Lambda initializes by loading your deployment package into memory. Smaller package = faster init. The single biggest win is tree-shaking your dependencies with esbuild or tsup:',
			},
			{
				type: 'code',
				lang: 'bash',
				code: `# Bundle your handler with esbuild — output is typically 10-50x smaller
npx esbuild src/handler.ts \\
  --bundle \\
  --platform=node \\
  --target=node22 \\
  --outfile=dist/handler.js \\
  --minify`,
			},
			{
				type: 'callout',
				variant: 'note',
				text: 'Zapix is < 5KB bundled — it adds virtually nothing to your cold start budget.',
			},
			{
				type: 'h2',
				text: '2. Move heavy imports out of the hot path',
			},
			{
				type: 'p',
				text: "Imports at module level are evaluated during cold start. Lazy-load anything that isn't needed on every invocation:",
			},
			{
				type: 'code',
				lang: 'typescript',
				code: `// ❌ Imported eagerly — pays the cost even if never called
import { PDFDocument } from 'pdf-lib';

// ✅ Lazy — only loaded when the route is actually hit
app.post('/generate-pdf', async (req, res) => {
  const { PDFDocument } = await import('pdf-lib');
  // ...
});`,
			},
			{
				type: 'h2',
				text: '3. Cache database connections outside the handler',
			},
			{
				type: 'p',
				text: 'Lambda reuses execution environments across warm invocations. Initializing your DB client at module scope means it persists across requests — a huge win:',
			},
			{
				type: 'code',
				lang: 'typescript',
				code: `// Module scope — initialized once per execution environment
const db = new DatabaseClient({ connectionString: process.env.DB_URL });

const app = Zapix();

app.get('/users', async (req, res) => {
  // db is already connected — no reconnect overhead
  const users = await db.query('SELECT * FROM users');
  res.json(users);
});

export const main = handler(app);`,
			},
			{
				type: 'h2',
				text: "4. Use ARM64 (Graviton) — it's faster AND cheaper",
			},
			{
				type: 'p',
				text: "ARM64 Lambda functions typically have 10–20% faster cold starts compared to x86_64 and cost 20% less per GB-second. It's the easiest free performance win available:",
			},
			{
				type: 'code',
				lang: 'yaml',
				filename: 'template.yaml (SAM)',
				code: `Globals:
  Function:
    Architectures:
      - arm64
    Runtime: nodejs22.x`,
			},
			{
				type: 'h2',
				text: '5. Use Lambda SnapStart (where applicable)',
			},
			{
				type: 'p',
				text: 'AWS Lambda SnapStart is available for Node.js 22+ functions. It snapshots the initialized execution environment and restores it on cold start, reducing latency by up to 90% in some workloads. Enable it in your function configuration — no code changes required.',
			},
			{
				type: 'h2',
				text: 'Quick benchmark summary',
			},
			{
				type: 'ul',
				items: [
					'**Unoptimized handler (200KB bundle):** ~580ms cold start',
					'**Esbuild-bundled (18KB):** ~220ms cold start',
					'**+ ARM64:** ~185ms cold start',
					'**+ SnapStart (Node 22):** ~40ms cold start',
				],
			},
			{
				type: 'p',
				text: 'Combining all techniques gets you sub-50ms cold starts on modern Lambda runtimes — competitive with container-based deployments without the operational overhead.',
			},
			{
				type: 'callout',
				variant: 'tip',
				text: 'Use Zapix for routing and keep your bundle lean. Every KB you save is latency you get back.',
			},
		],
	},
	{
		slug: 'express-to-zapix-migration-guide',
		title: 'Migrating from Express to Zapix on AWS Lambda',
		description:
			'Already know Express? You already know 90% of Zapix. This guide walks through migrating a real Express API to a Lambda-native Zapix handler — route by route.',
		date: '2026-03-14',
		author: 'Raihan Sharif Rimon',
		readingTime: '6 min read',
		tags: ['zapix', 'express', 'migration', 'aws-lambda', 'tutorial'],
		content: [
			{
				type: 'p',
				text: "If you're running an Express API and want to move it to AWS Lambda — maybe to cut costs, remove server management, or handle unpredictable traffic — Zapix is the fastest path. The API surface is intentionally Express-compatible so the migration is mostly mechanical.",
			},
			{
				type: 'h2',
				text: 'Install Zapix',
			},
			{
				type: 'code',
				lang: 'bash',
				code: `npm install zapix`,
			},
			{
				type: 'h2',
				text: 'Step 1: Replace app initialization',
			},
			{
				type: 'code',
				lang: 'typescript',
				code: `// Express
import express from 'express';
const app = express();
app.use(express.json());

// Zapix — body parsing is built-in, no middleware needed
import { Zapix } from 'zapix';
const app = Zapix();`,
			},
			{
				type: 'h2',
				text: 'Step 2: Routes stay the same',
			},
			{
				type: 'p',
				text: "Route definitions are identical. If you've used Express, there's nothing new to learn:",
			},
			{
				type: 'code',
				lang: 'typescript',
				code: `// Express
app.get('/users/:id', async (req, res) => {
  const user = await getUser(req.params.id);
  res.json(user);
});

// Zapix — identical API
app.get('/users/:id', async (req, res) => {
  const user = await getUser(req.params.id);
  res.json(user);
});`,
			},
			{
				type: 'h2',
				text: 'Step 3: Middleware works the same way',
			},
			{
				type: 'code',
				lang: 'typescript',
				code: `// Auth middleware — same pattern as Express
const requireAuth = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Unauthorized' });
  req.user = await verifyToken(token);
  next();
};

app.use('/admin', requireAuth);
app.get('/admin/stats', async (req, res) => {
  res.json(await getStats());
});`,
			},
			{
				type: 'h2',
				text: 'Step 4: Replace app.listen() with the Lambda handler export',
			},
			{
				type: 'p',
				text: 'This is the only structural difference. Instead of calling app.listen(port), you export the Lambda handler using the Zapix adapter:',
			},
			{
				type: 'code',
				lang: 'typescript',
				code: `// Express (remove this)
app.listen(3000, () => console.log('Server running'));

// Zapix (replace with this)
import { handler } from 'zapix/aws';
export const main = handler(app);`,
			},
			{
				type: 'callout',
				variant: 'note',
				text: 'Your Lambda function handler must be set to "handler.main" (or whatever filename you use) in your SAM/CDK/Serverless Framework config.',
			},
			{
				type: 'h2',
				text: 'Step 5: Update your Lambda config',
			},
			{
				type: 'code',
				lang: 'yaml',
				filename: 'template.yaml (SAM)',
				code: `Resources:
  ApiFunction:
    Type: AWS::Serverless::Function
    Properties:
      Handler: dist/handler.main
      Runtime: nodejs22.x
      Architectures: [arm64]
      Events:
        Api:
          Type: HttpApi
          Properties:
            Path: /{proxy+}
            Method: ANY`,
			},
			{
				type: 'h2',
				text: 'What you get for free',
			},
			{
				type: 'ul',
				items: [
					'**Cold-start optimized** — Zapix is < 5KB, Express is ~200KB with its transitive deps',
					'**No server management** — Lambda scales to zero, you pay only for actual requests',
					'**Auto-scaling** — Lambda handles concurrency without any configuration',
					'**TypeScript types** — req.params, req.body, req.query are all typed out of the box',
				],
			},
			{
				type: 'p',
				text: 'The migration for a typical 10-route Express API takes about 30 minutes. Most of that is updating your deployment config, not your application code.',
			},
		],
	},
];

export function getAllPosts(): Post[] {
	return [...posts].sort(
		(a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
	);
}

export function getPostBySlug(slug: string): Post | undefined {
	return posts.find((p) => p.slug === slug);
}

export function formatDate(iso: string): string {
	return new Date(iso).toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	});
}

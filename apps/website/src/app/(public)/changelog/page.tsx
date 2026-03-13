import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

export const metadata: Metadata = {
	title: 'Changelog',
	description: 'All notable changes to Zapix, following Semantic Versioning.',
	alternates: { canonical: '/changelog' },
};

type Change = { label: 'Added' | 'Changed' | 'Fixed'; items: string[] };

type Release = {
	version: string;
	date: string;
	changes: Change[];
};

const releases: Release[] = [
	{
		version: 'Unreleased',
		date: '',
		changes: [
			{ label: 'Added', items: ['Planned features and improvements'] },
		],
	},
	{
		version: '0.1.9',
		date: '2025-12-18',
		changes: [
			{
				label: 'Added',
				items: [
					'Global middleware support',
					'Updated documentation with usage examples of global middleware.',
				],
			},
		],
	},
	{
		version: '0.1.8',
		date: '2025-11-29',
		changes: [
			{
				label: 'Added',
				items: [
					'Improved `Response()` utility — automatically detects success vs error based on the parameters.',
					'Supports strings, JS `Error` instances, arrays of validation errors, and generic objects.',
					'Updated documentation with usage examples.',
				],
			},
			{
				label: 'Changed',
				items: [
					'Improved type safety and developer experience for `Response()`.',
				],
			},
		],
	},
	{
		version: '0.1.7',
		date: '2025-08-23',
		changes: [
			{
				label: 'Added',
				items: [
					'Global error handler: `router.useError` for centralized error handling, similar to Express.js.',
					'Express.js-like middleware chaining — validation, authentication, etc. can be chained before controllers.',
					'`safeJsonParse` utility for safe JSON parsing.',
					'`Response` utility for consistent HTTP responses.',
				],
			},
			{
				label: 'Changed',
				items: [
					'Improved documentation with detailed usage examples for middleware, error handling, and utilities.',
					'Enhanced type safety and developer experience.',
				],
			},
			{
				label: 'Fixed',
				items: ['Minor internal improvements and bug fixes.'],
			},
		],
	},
	{
		version: '0.1.6',
		date: '2025-08-22',
		changes: [
			{
				label: 'Added',
				items: [
					'Initial public release of Zapix — lightweight router for AWS Lambda.',
					'Built-in TypeScript support with full type safety and IntelliSense.',
					'Minimal router with `get`, `post`, `put`, `patch`, `delete`, `options`, `all` methods.',
					'Middleware + handler chaining support.',
					'Strongly typed `RequestHandler`, `RouteHandler`, and `RouteMiddleware`.',
					'Distributed with bundled `.d.ts` files for npm type support.',
					'Works seamlessly with AWS Lambda event/response objects.',
				],
			},
		],
	},
];

const badgeColor: Record<Change['label'], string> = {
	Added: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
	Changed: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
	Fixed: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
};

export default function ChangelogPage() {
	return (
		<main className="mx-auto max-w-2xl px-6 py-20">
			{/* Header */}
			<div className="mb-14">
				<span className="mb-4 inline-block rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary">
					Changelog
				</span>
				<h1 className="mb-3 text-4xl font-bold tracking-tight">
					What&apos;s new
				</h1>
				<p className="text-muted-foreground">
					All notable changes to Zapix.{' '}
					<Link
						href="https://github.com/zapixjs/zapix/releases"
						target="_blank"
						rel="noopener noreferrer"
						className="inline-flex items-center gap-0.5 text-primary hover:underline"
					>
						View releases on GitHub
						<ArrowUpRight className="size-3.5" />
					</Link>
				</p>
			</div>

			{/* Timeline */}
			<div className="relative border-l border-border/40 pl-8">
				{releases.map((release) => (
					<div key={release.version} className="mb-12 last:mb-0">
						{/* Dot */}
						<div className="absolute -left-[5px] mt-1.5 size-2.5 rounded-full border-2 border-primary bg-background" />

						{/* Version + date */}
						<div className="mb-4 flex flex-wrap items-baseline gap-3">
							<h2 className="text-lg font-semibold">
								{release.version === 'Unreleased'
									? 'Unreleased'
									: `v${release.version}`}
							</h2>
							{release.date && (
								<time
									dateTime={release.date}
									className="text-xs text-muted-foreground"
								>
									{new Date(release.date).toLocaleDateString(
										'en-US',
										{
											year: 'numeric',
											month: 'long',
											day: 'numeric',
										},
									)}
								</time>
							)}
						</div>

						{/* Changes */}
						<div className="space-y-4">
							{release.changes.map((group) => (
								<div key={group.label}>
									<span
										className={`mb-2 inline-block rounded-full border px-2 py-0.5 text-[11px] font-medium ${badgeColor[group.label]}`}
									>
										{group.label}
									</span>
									<ul className="space-y-1.5 pl-1">
										{group.items.map((item) => (
											<li
												key={item}
												className="flex items-start gap-2 text-sm text-muted-foreground"
											>
												<span className="mt-2 size-1 shrink-0 rounded-full bg-muted-foreground/40" />
												<span>{item}</span>
											</li>
										))}
									</ul>
								</div>
							))}
						</div>
					</div>
				))}
			</div>
		</main>
	);
}

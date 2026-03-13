import type { Metadata } from 'next';
import { ArrowUpRight, Github, Package } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
	title: 'About',
	description:
		'Learn about Zapix – why it was built, what problems it solves, and who maintains it.',
	alternates: { canonical: '/about' },
};

const contributors = [
	{
		name: 'Raihan Sharif Rimon',
		role: 'Creator & Maintainer',
		github: 'https://github.com/raihansharifrimon',
	},
];

const values = [
	{
		title: 'Zero Config',
		body: 'Works out of the box with AWS API Gateway v1 and v2 event shapes. No bootstrapping, no ceremony.',
	},
	{
		title: 'TypeScript First',
		body: 'Every handler and middleware is fully typed. Ship with confidence, catch mistakes at compile time.',
	},
	{
		title: 'Tiny Footprint',
		body: 'Under 5 KB minified + gzipped. Cold-start latency matters in Lambda — we take that seriously.',
	},
	{
		title: 'Open Source',
		body: 'MIT licensed. Fork it, extend it, contribute back. The roadmap is public and community-driven.',
	},
];

export default function AboutPage() {
	return (
		<main className="mx-auto max-w-3xl px-6 py-20">
			{/* Header */}
			<div className="mb-16">
				<span className="mb-4 inline-block rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary">
					About
				</span>
				<h1 className="mb-4 text-4xl font-bold tracking-tight">
					Why Zapix exists
				</h1>
				<p className="text-lg text-muted-foreground leading-relaxed">
					Serverless functions shouldn&apos;t need a framework the
					size of a framework. Zapix started as a frustration with
					routing boilerplate inside AWS Lambda handlers — and grew
					into a focused, zero-dependency tool that feels just like
					Express but weighs almost nothing.
				</p>
			</div>

			{/* Values */}
			<section className="mb-16">
				<h2 className="mb-6 text-xl font-semibold">Core values</h2>
				<div className="grid gap-4 sm:grid-cols-2">
					{values.map((v) => (
						<div
							key={v.title}
							className="rounded-xl border border-border/40 bg-muted/20 p-5"
						>
							<h3 className="mb-1.5 font-medium">{v.title}</h3>
							<p className="text-sm text-muted-foreground leading-relaxed">
								{v.body}
							</p>
						</div>
					))}
				</div>
			</section>

			{/* Contributors */}
			<section className="mb-16">
				<h2 className="mb-6 text-xl font-semibold">Maintainers</h2>
				<div className="flex flex-col gap-3">
					{contributors.map((c) => (
						<div
							key={c.name}
							className="flex items-center justify-between rounded-xl border border-border/40 bg-muted/20 px-5 py-4"
						>
							<div>
								<p className="font-medium">{c.name}</p>
								<p className="text-sm text-muted-foreground">
									{c.role}
								</p>
							</div>
							<Link
								href={c.github}
								target="_blank"
								rel="noopener noreferrer"
								className="flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
							>
								<Github className="size-4" />
								GitHub
								<ArrowUpRight className="size-3" />
							</Link>
						</div>
					))}
				</div>
			</section>

			{/* CTA */}
			<section className="rounded-2xl border border-border/40 bg-muted/20 px-8 py-10 text-center">
				<h2 className="mb-2 text-xl font-semibold">
					Want to contribute?
				</h2>
				<p className="mb-6 text-muted-foreground">
					Issues, PRs, and ideas are all welcome. Check out the GitHub
					repository to get started.
				</p>
				<div className="flex flex-wrap justify-center gap-3">
					<Button asChild size="sm">
						<Link
							href="https://github.com/zapixjs/zapix"
							target="_blank"
							rel="noopener noreferrer"
							className="gap-1.5"
						>
							<Github className="size-3.5" />
							View on GitHub
						</Link>
					</Button>
					<Button asChild size="sm" variant="outline">
						<Link
							href="https://www.npmjs.com/package/zapix"
							target="_blank"
							rel="noopener noreferrer"
							className="gap-1.5"
						>
							<Package className="size-3.5" />
							View on npm
						</Link>
					</Button>
				</div>
			</section>
		</main>
	);
}

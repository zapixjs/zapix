/** biome-ignore-all lint/suspicious/noArrayIndexKey: <explanation> */
import type { PostBlock } from '@/lib/blog';
import { formatDate, getAllPosts, getPostBySlug } from '@/lib/blog';
import { ArrowLeft, Clock, Tag, User } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://zapix.dev';

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
	return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { slug } = await params;
	const post = getPostBySlug(slug);
	if (!post) return {};

	return {
		title: `${post.title} — Zapix Blog`,
		description: post.description,
		alternates: { canonical: `${siteUrl}/blog/${post.slug}` },
		openGraph: {
			title: post.title,
			description: post.description,
			url: `${siteUrl}/blog/${post.slug}`,
			type: 'article',
			publishedTime: post.date,
			authors: [post.author],
			tags: post.tags,
		},
		twitter: {
			card: 'summary_large_image',
			title: post.title,
			description: post.description,
		},
	};
}

function renderBlock(block: PostBlock, i: number) {
	switch (block.type) {
		case 'h2':
			return (
				<h2
					key={i}
					className="mt-10 mb-4 text-2xl font-bold tracking-tight text-foreground"
				>
					{block.text}
				</h2>
			);
		case 'h3':
			return (
				<h3
					key={i}
					className="mt-8 mb-3 text-xl font-semibold tracking-tight text-foreground"
				>
					{block.text}
				</h3>
			);
		case 'p':
			return (
				<p key={i} className="mb-4 leading-7 text-muted-foreground">
					{block.text}
				</p>
			);
		case 'code':
			return (
				<div key={i} className="my-6">
					{block.filename && (
						<div className="flex items-center rounded-t-lg border border-b-0 border-border/40 bg-muted/30 px-4 py-2 font-mono text-[11px] text-muted-foreground">
							{block.filename}
						</div>
					)}
					<pre
						className={`overflow-x-auto border border-border/40 bg-[#0d0d0d] p-5 font-mono text-[13px] leading-6 text-slate-200 ${block.filename ? 'rounded-b-lg' : 'rounded-lg'}`}
					>
						<code>{block.code}</code>
					</pre>
				</div>
			);
		case 'ul':
			return (
				<ul key={i} className="my-4 ml-4 space-y-2 list-none">
					{block.items.map((item, j) => (
						<li
							key={j}
							className="flex gap-2 leading-7 text-muted-foreground"
						>
							<span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-primary/60" />
							<span
								// biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
								dangerouslySetInnerHTML={{
									__html: item.replace(
										/\*\*(.+?)\*\*/g,
										'<strong class="font-semibold text-foreground">$1</strong>',
									),
								}}
							/>
						</li>
					))}
				</ul>
			);
		case 'ol':
			return (
				<ol key={i} className="my-4 ml-4 space-y-2 list-decimal">
					{block.items.map((item, j) => (
						<li
							key={j}
							className="ml-4 leading-7 text-muted-foreground"
						>
							{item}
						</li>
					))}
				</ol>
			);
		case 'callout':
			return (
				<div
					key={i}
					className={`my-6 rounded-lg border px-5 py-4 text-sm leading-relaxed ${
						block.variant === 'tip'
							? 'border-primary/30 bg-primary/8 text-primary'
							: block.variant === 'warning'
								? 'border-amber-500/30 bg-amber-500/8 text-amber-500'
								: 'border-border/50 bg-muted/40 text-muted-foreground'
					}`}
				>
					<span className="mr-1.5 font-semibold uppercase tracking-wide text-[11px]">
						{block.variant === 'tip'
							? '💡 Tip'
							: block.variant === 'warning'
								? '⚠️ Warning'
								: 'ℹ️ Note'}
						:
					</span>
					{block.text}
				</div>
			);
		case 'hr':
			return <hr key={i} className="my-8 border-border/30" />;
		default:
			return null;
	}
}

export default async function PostPage({ params }: Props) {
	const { slug } = await params;
	const post = getPostBySlug(slug);
	if (!post) notFound();

	const jsonLd = {
		'@context': 'https://schema.org',
		'@type': 'BlogPosting',
		headline: post.title,
		description: post.description,
		datePublished: post.date,
		author: { '@type': 'Person', name: post.author },
		publisher: {
			'@type': 'Organization',
			name: 'Zapix',
			url: siteUrl,
		},
		url: `${siteUrl}/blog/${post.slug}`,
		keywords: post.tags.join(', '),
	};

	return (
		<>
			<script
				type="application/ld+json"
				// biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
				dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
			/>

			<main className="mx-auto max-w-3xl px-6 py-16">
				{/* Back link */}
				<Link
					href="/blog"
					className="mb-10 flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
				>
					<ArrowLeft className="size-3.5" />
					All posts
				</Link>

				{/* Tags */}
				<div className="mb-4 flex flex-wrap gap-1.5">
					{post.tags.map((tag) => (
						<span
							key={tag}
							className="flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-[11px] font-medium text-primary"
						>
							<Tag className="size-2.5" />
							{tag}
						</span>
					))}
				</div>

				{/* Title */}
				<h1 className="text-3xl font-bold leading-tight tracking-tight md:text-[2.5rem]">
					{post.title}
				</h1>

				{/* Description */}
				<p className="mt-3 text-base leading-relaxed text-muted-foreground">
					{post.description}
				</p>

				{/* Post meta */}
				<div className="mt-5 mb-10 flex flex-wrap items-center gap-4 border-b border-border/30 pb-8 text-xs text-muted-foreground/60">
					<span className="flex items-center gap-1.5">
						<User className="size-3.5" />
						{post.author}
					</span>
					<span>·</span>
					<span>{formatDate(post.date)}</span>
					<span>·</span>
					<span className="flex items-center gap-1.5">
						<Clock className="size-3.5" />
						{post.readingTime}
					</span>
				</div>

				{/* Content */}
				<div>
					{post.content.map((block, i) => renderBlock(block, i))}
				</div>

				{/* Footer CTA */}
				<div className="mt-16 rounded-xl border border-primary/20 bg-primary/5 p-8 text-center">
					<p className="text-lg font-semibold">
						Try Zapix in your next Lambda project
					</p>
					<p className="mt-1 text-sm text-muted-foreground">
						Zero config. TypeScript first. Under 5KB.
					</p>
					<div className="mt-5 flex flex-wrap justify-center gap-3">
						<Link
							href="/#get-started"
							className="rounded-lg bg-gradient-to-r from-[#D86613] to-[#E8892A] px-5 py-2 text-sm font-medium text-white shadow-[0_0_16px_rgba(216,102,19,0.3)] hover:brightness-110"
						>
							Get Started
						</Link>
						<Link
							href="https://github.com/zapixjs/zapix"
							target="_blank"
							rel="noopener noreferrer"
							className="rounded-lg border border-border/40 px-5 py-2 text-sm font-medium text-foreground hover:border-primary/30 hover:bg-primary/5"
						>
							Star on GitHub
						</Link>
					</div>
				</div>
			</main>
		</>
	);
}

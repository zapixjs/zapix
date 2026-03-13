import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Clock, Tag } from 'lucide-react';
import { getAllPosts, formatDate } from '@/lib/blog';
import { Badge } from '@/components/ui/badge';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://zapix.dev';

export const metadata: Metadata = {
	title: 'Blog — Zapix',
	description:
		'Tutorials, release notes, and serverless tips from the Zapix team.',
	alternates: { canonical: `${siteUrl}/blog` },
	openGraph: {
		title: 'Blog — Zapix',
		description:
			'Tutorials, release notes, and serverless tips from the Zapix team.',
		url: `${siteUrl}/blog`,
		type: 'website',
	},
};

export default function BlogPage() {
	const posts = getAllPosts();

	return (
		<main className="mx-auto max-w-4xl px-6 py-20">
			{/* Header */}
			<div className="mb-14">
				<Badge
					variant="outline"
					className="mb-4 border-primary/30 bg-primary/10 text-primary"
				>
					Blog
				</Badge>
				<h1 className="text-4xl font-bold tracking-tight md:text-5xl">
					From the Zapix team
				</h1>
				<p className="mt-3 max-w-xl text-muted-foreground">
					Tutorials, release announcements, and serverless engineering
					tips.
				</p>
			</div>

			{/* Post list */}
			<div className="flex flex-col gap-6">
				{posts.map((post) => (
					<article
						key={post.slug}
						className="group rounded-xl border border-border/40 bg-muted/20 p-6 transition-colors hover:border-primary/30 hover:bg-primary/5"
					>
						<Link href={`/blog/${post.slug}`} className="block">
							{/* Tags */}
							<div className="mb-3 flex flex-wrap gap-1.5">
								{post.tags.slice(0, 3).map((tag) => (
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
							<h2 className="text-xl font-semibold leading-snug tracking-tight group-hover:text-primary transition-colors md:text-2xl">
								{post.title}
							</h2>

							{/* Description */}
							<p className="mt-2 text-sm leading-relaxed text-muted-foreground">
								{post.description}
							</p>

							{/* Meta */}
							<div className="mt-4 flex items-center justify-between">
								<div className="flex items-center gap-3 text-xs text-muted-foreground/60">
									<span>{formatDate(post.date)}</span>
									<span>·</span>
									<span className="flex items-center gap-1">
										<Clock className="size-3" />
										{post.readingTime}
									</span>
								</div>
								<span className="flex items-center gap-1 text-xs font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
									Read post
									<ArrowRight className="size-3" />
								</span>
							</div>
						</Link>
					</article>
				))}
			</div>
		</main>
	);
}

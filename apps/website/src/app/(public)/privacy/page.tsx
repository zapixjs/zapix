import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Privacy Policy',
	description: 'Privacy policy for the Zapix website.',
	alternates: { canonical: '/privacy' },
};

const sections = [
	{
		heading: 'Overview',
		body: 'Zapix is an open-source library. This website (zapix.dev) is a documentation and marketing site. We collect no personal data, run no user accounts, and store nothing about visitors.',
	},
	{
		heading: 'Information we collect',
		body: 'We do not collect any personally identifiable information. We may use anonymous, aggregated analytics (e.g. page views) to understand how the site is used. No cookies beyond those strictly necessary for the site to function are set.',
	},
	{
		heading: 'Third-party services',
		body: 'The site links to GitHub and npm. Visiting those links is subject to their respective privacy policies. We have no control over data collected by those services.',
	},
	{
		heading: 'Open-source package',
		body: 'The Zapix npm package itself is a server-side library. It does not collect, transmit, or store any data from your users or your infrastructure.',
	},
	{
		heading: 'Changes to this policy',
		body: 'We may update this page from time to time. Significant changes will be noted in the changelog. Continued use of the site after updates constitutes acceptance of the revised policy.',
	},
	{
		heading: 'Contact',
		body: 'Questions? Open an issue at github.com/zapixjs/zapix.',
	},
];

export default function PrivacyPage() {
	return (
		<main className="mx-auto max-w-2xl px-6 py-20">
			<div className="mb-12">
				<span className="mb-4 inline-block rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary">
					Legal
				</span>
				<h1 className="mb-3 text-4xl font-bold tracking-tight">
					Privacy Policy
				</h1>
				<p className="text-sm text-muted-foreground">
					Last updated:{' '}
					<time dateTime="2025-12-01">December 1, 2025</time>
				</p>
			</div>

			<div className="space-y-10">
				{sections.map((s) => (
					<section key={s.heading}>
						<h2 className="mb-2 text-base font-semibold">
							{s.heading}
						</h2>
						<p className="text-sm text-muted-foreground leading-relaxed">
							{s.body}
						</p>
					</section>
				))}
			</div>
		</main>
	);
}

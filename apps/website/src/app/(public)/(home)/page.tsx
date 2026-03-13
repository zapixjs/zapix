import {
	CLISection,
	CodeSection,
	FeaturesSection,
	GetStartedSection,
	HeroSection,
	IntegrationsSection,
	StatsSection,
	WhySection,
} from './components';
import { fetchProjectStats } from '@/lib/project-stats';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://zapix.dev';

const jsonLd = {
	'@context': 'https://schema.org',
	'@type': 'SoftwareApplication',
	name: 'Zapix',
	applicationCategory: 'DeveloperApplication',
	operatingSystem: 'Any',
	description:
		'A lightweight, TypeScript-first router for building serverless APIs on AWS Lambda. Express-style routing, chainable middleware, and zero config.',
	url: siteUrl,
	sameAs: [
		'https://github.com/zapixjs/zapix',
		'https://www.npmjs.com/package/zapix',
	],
	license: 'https://github.com/zapixjs/zapix/blob/main/LICENSE',
	programmingLanguage: 'TypeScript',
	keywords:
		'aws lambda, serverless, router, typescript, api gateway, middleware',
	offers: {
		'@type': 'Offer',
		price: '0',
		priceCurrency: 'USD',
	},
};

const page = async () => {
	const { stars } = await fetchProjectStats();

	return (
		<>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
			/>
			<div>
				<HeroSection stars={stars} />
				<StatsSection />
				<FeaturesSection />
				<IntegrationsSection />
				<CodeSection />
				<WhySection />
				<CLISection />
				<GetStartedSection />
			</div>
		</>
	);
};

export default page;

import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { ThemeProvider } from '@/components/theme-provider';
import './globals.css';

const geistSans = localFont({
	src: './fonts/GeistVF.woff',
	variable: '--font-geist-sans',
});
const geistMono = localFont({
	src: './fonts/GeistMonoVF.woff',
	variable: '--font-geist-mono',
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://zapix.dev';

export const metadata: Metadata = {
	metadataBase: new URL(siteUrl),
	title: {
		default: 'Zapix – Express-style routing for AWS Lambda',
		template: '%s | Zapix',
	},
	description:
		'A lightweight, TypeScript-first router for building serverless APIs on AWS Lambda. Express-style routing, chainable middleware, and zero config.',
	keywords: [
		'aws lambda',
		'serverless',
		'router',
		'typescript',
		'api gateway',
		'middleware',
		'express',
		'zapix',
		'lambda router',
		'serverless api',
	],
	authors: [
		{ name: 'Zapix Contributors', url: 'https://github.com/zapixjs/zapix' },
	],
	creator: 'Zapix Contributors',
	openGraph: {
		type: 'website',
		locale: 'en_US',
		url: siteUrl,
		siteName: 'Zapix',
		title: 'Zapix – Express-style routing for AWS Lambda',
		description:
			'A lightweight, TypeScript-first router for building serverless APIs on AWS Lambda. Express-style routing, chainable middleware, and zero config.',
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Zapix – Express-style routing for AWS Lambda',
		description:
			'A lightweight, TypeScript-first router for building serverless APIs on AWS Lambda.',
	},
	alternates: {
		canonical: siteUrl,
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={`${geistSans.variable} ${geistMono.variable}`}>
				<ThemeProvider>{children}</ThemeProvider>
				<Analytics />
				<SpeedInsights />
			</body>
		</html>
	);
}

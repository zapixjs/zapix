import type { Metadata } from 'next';
import localFont from 'next/font/local';
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

export const metadata: Metadata = {
	title: 'Zapix - Express-style routing for AWS Lambda',
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
	],
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
			</body>
		</html>
	);
}

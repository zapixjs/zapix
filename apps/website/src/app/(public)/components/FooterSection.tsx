import Image from 'next/image';
import Link from 'next/link';

const links = [
	{
		label: 'GitHub',
		href: 'https://github.com/zapixjs/zapix',
		external: true,
	},
	{
		label: 'npm',
		href: 'https://www.npmjs.com/package/zapix',
		external: true,
	},
	{ label: 'Blog', href: '/blog', external: false },
	{ label: 'Changelog', href: '/changelog', external: false },
	{ label: 'About', href: '/about', external: false },
	{ label: 'Privacy', href: '/privacy', external: false },
	{
		label: 'License',
		href: 'https://github.com/zapixjs/zapix/blob/main/LICENSE',
		external: true,
	},
];

const FooterSection = () => {
	return (
		<footer className="border-t border-border/30 py-5">
			<div className="mx-auto max-w-7xl px-6">
				<div className="flex flex-col items-center justify-between gap-8 md:flex-row">
					<div className="flex items-center gap-2">
						<Link href="/" className="flex items-center gap-2">
							<Image
								src="/logo.svg"
								alt="Zapix"
								width={24}
								height={24}
								className="rounded-md"
							/>
							<span className="text-lg font-semibold">zapix</span>
						</Link>
						<span className="text-muted-foreground">|</span>
						<span className="text-xs text-muted-foreground/50">
							Built for the serverless era
						</span>
					</div>

					<div className="flex flex-wrap items-center gap-5">
						{links.map((link) => (
							<Link
								key={link.label}
								href={link.href}
								{...(link.external
									? {
											target: '_blank',
											rel: 'noopener noreferrer',
										}
									: {})}
								className="text-xs text-muted-foreground/50 transition-colors hover:text-foreground"
							>
								{link.label}
							</Link>
						))}
					</div>
				</div>
			</div>
		</footer>
	);
};

export default FooterSection;

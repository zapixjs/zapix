import Image from 'next/image';
import Link from 'next/link';

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

					<div className="flex items-center gap-5">
						{[
							{
								label: 'GitHub',
								href: 'https://github.com/zapixjs/zapix',
							},
							{
								label: 'npm',
								href: 'https://www.npmjs.com/package/zapix',
							},
							{
								label: 'License',
								href: 'https://github.com/zapixjs/zapix/blob/main/LICENSE',
							},
						].map((link) => (
							<Link
								key={link.label}
								href={link.href}
								target="_blank"
								rel="noopener noreferrer"
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

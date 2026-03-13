import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const GitHubIcon = ({ className }: { className?: string }) => (
	<svg
		role="img"
		viewBox="0 0 24 24"
		xmlns="http://www.w3.org/2000/svg"
		fill="currentColor"
		className={className}
		aria-hidden="true"
	>
		<path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
	</svg>
);
import Image from 'next/image';
import Link from 'next/link';

const navLinks = [
	{ label: 'Features', href: '/#features' },
	{ label: 'Examples', href: '/#code' },
	{ label: 'CLI', href: '/#cli' },
	{ label: 'Blog', href: '/blog' },
	{ label: 'Changelog', href: '/changelog' },
];

const HeaderSection = () => {
	return (
		<header className="sticky top-0 z-50 border-b border-border/30 bg-background/60 backdrop-blur-2xl">
			<div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-6">
				<Link href="/" className="flex items-center gap-2.5 group">
					<Image
						src="/logo.svg"
						alt="Zapix"
						width={28}
						height={28}
						className="rounded-md shadow-[0_0_12px_rgba(216,102,19,0.3)]"
					/>
					<span className="text-base font-semibold tracking-tight">
						zapix
					</span>
				</Link>

				<nav className="hidden items-center gap-1 md:flex">
					{navLinks.map((link) => (
						<Link
							key={link.href}
							href={link.href}
							className="rounded-md px-3 py-1.5 text-[13px] text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
						>
							{link.label}
						</Link>
					))}
					<Link
						href="https://github.com/zapixjs/zapix"
						target="_blank"
						rel="noopener noreferrer"
						className="flex items-center gap-1.5 rounded-md px-3 py-1.5 text-[13px] text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
					>
						<GitHubIcon className="size-3.5" />
						GitHub
					</Link>
				</nav>

				<div className="flex items-center gap-2.5">
					<ThemeToggle />
					<div className="hidden items-center rounded-md border border-border/40 bg-muted/30 px-3 py-1.5 font-mono text-[11px] text-muted-foreground sm:flex">
						<span className="mr-2 text-primary/60">$</span>
						npm i zapix
					</div>
					<Button
						size="sm"
						className="h-8 bg-linear-to-r from-[#D86613] to-[#E8892A] text-white shadow-[0_0_16px_rgba(216,102,19,0.25)] hover:shadow-[0_0_24px_rgba(216,102,19,0.35)] hover:brightness-110"
						asChild
					>
						<Link href="#get-started" className="gap-1.5 text-xs">
							Get Started
							<ArrowRight className="size-3" />
						</Link>
					</Button>
				</div>
			</div>
		</header>
	);
};

export default HeaderSection;

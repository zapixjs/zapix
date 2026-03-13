import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
import { ArrowRight, Github } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

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
					{[
						{ label: 'Features', href: '#features' },
						{ label: 'Examples', href: '#code' },
						{ label: 'CLI', href: '#cli' },
					].map((link) => (
						<Link
							key={link.href}
							href={link.href}
							className="rounded-md px-3 py-1.5 text-[13px] text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
						>
							{link.label}
						</Link>
					))}
					<Link
						href="https://github.com/nicepixels-org/zapixjs"
						target="_blank"
						rel="noopener noreferrer"
						className="flex items-center gap-1.5 rounded-md px-3 py-1.5 text-[13px] text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
					>
						<Github className="size-3.5" />
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

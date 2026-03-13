import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ArrowRight, BookOpen, Copy } from 'lucide-react';
import Link from 'next/link';

const GetStartedSection = () => {
	return (
		<section id="get-started" className="relative py-16 md:py-20">
			<div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-primary/20 to-transparent" />

			<div className="mx-auto max-w-7xl px-6">
				<div className="relative overflow-hidden rounded-2xl border border-border/40">
					{/* Background layers */}
					<div className="absolute inset-0 bg-linear-to-br from-[#D86613]/8 via-background to-amber-500/5" />
					<div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(216,102,19,0.06)_0%,transparent_50%)]" />
					<div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle,oklch(0.25_0.01_60)_1px,transparent_1px)] bg-size-[24px_24px] opacity-[0.08] dark:opacity-20" />

					<div className="relative px-8 py-16 text-center md:px-16 md:py-20">
						<h2 className="text-3xl font-bold tracking-tight md:text-4xl">
							Start building in seconds
						</h2>
						<p className="mx-auto mt-4 max-w-md text-muted-foreground">
							Install the package and ship your first serverless
							API today.
						</p>

						{/* Install commands */}
						<div className="mx-auto mt-10 flex max-w-md flex-col gap-3">
							<InstallCommand
								label="Install"
								command="npm install zapix"
							/>
							<div className="flex items-center gap-4">
								<Separator className="flex-1" />
								<span className="text-xs text-muted-foreground">
									or scaffold a project
								</span>
								<Separator className="flex-1" />
							</div>
							<InstallCommand
								label="Create"
								command="npx zapix create my-api"
							/>
						</div>

						<div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
							<Button
								size="lg"
								className="h-11 gap-2 bg-linear-to-r from-[#D86613] to-[#E8892A] px-7 text-sm text-white shadow-[0_0_20px_rgba(216,102,19,0.3)] hover:shadow-[0_0_30px_rgba(216,102,19,0.45)] hover:brightness-110"
								asChild
							>
								<Link
									href="https://github.com/nicepixels-org/zapixjs"
									target="_blank"
									rel="noopener noreferrer"
								>
									<BookOpen className="size-4" />
									Read the Docs
								</Link>
							</Button>
							<Button
								size="lg"
								variant="outline"
								className="h-11 gap-2 border-border/50 px-7 text-sm hover:border-primary/30 hover:bg-primary/5"
								asChild
							>
								<Link
									href="https://github.com/nicepixels-org/zapixjs/tree/main/examples"
									target="_blank"
									rel="noopener noreferrer"
								>
									View Examples
									<ArrowRight className="size-3.5" />
								</Link>
							</Button>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default GetStartedSection;

function InstallCommand({
	label,
	command,
}: {
	label: string;
	command: string;
}) {
	return (
		<div className="flex items-center overflow-hidden rounded-lg border border-border/40 bg-muted/30">
			<span className="shrink-0 border-r border-border/40 bg-muted/50 px-3 py-3 text-[11px] font-medium uppercase tracking-wider text-muted-foreground/60">
				{label}
			</span>
			<div className="flex flex-1 items-center gap-2 px-4 py-3 font-mono text-sm">
				<span className="text-primary/50">$</span>
				<span className="text-foreground/80">{command}</span>
			</div>
			<button
				type="button"
				className="shrink-0 border-l border-border/40 px-3 py-3 text-muted-foreground/40 transition-colors hover:text-foreground"
			>
				<Copy className="size-3.5" />
			</button>
		</div>
	);
}

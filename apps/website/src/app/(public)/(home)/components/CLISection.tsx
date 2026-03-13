import { Badge } from '@/components/ui/badge';
import { Terminal } from 'lucide-react';
import type React from 'react';

const TermLine = ({
	children,
	prompt,
	dim,
	success,
}: {
	children?: React.ReactNode;
	prompt?: boolean;
	dim?: boolean;
	success?: boolean;
}) => {
	if (!children) return <div className="h-3" />;
	return (
		<div
			className={
				success
					? 'text-[#28C840]'
					: dim
						? 'text-muted/50 dark:text-white/60'
						: 'text-muted dark:text-white'
			}
		>
			{prompt && <span className="mr-2 text-primary">$</span>}
			{children}
		</div>
	);
};

const CLISection = () => {
	return (
		<section id="cli" className="relative py-16 md:py-20">
			<div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-primary/20 to-transparent" />

			<div className="mx-auto max-w-7xl px-6">
				<div className="grid items-center gap-12 lg:grid-cols-[1fr_1.1fr]">
					<div>
						<Badge
							variant="outline"
							className="mb-4 border-primary/20 bg-primary/5 text-xs text-primary"
						>
							CLI Tool
						</Badge>
						<h2 className="text-3xl font-bold tracking-tight md:text-4xl">
							Scaffold, don&apos;t type
						</h2>
						<p className="mt-4 leading-relaxed text-muted-foreground">
							The Zapix CLI generates everything &mdash; projects,
							modules, controllers, middleware &mdash; so you
							focus on logic, not boilerplate.
						</p>

						<div className="mt-8 space-y-5">
							{[
								{
									cmd: 'zapix create',
									desc: 'Scaffold a new project with TypeScript and your preferred deployment target',
								},
								{
									cmd: 'zapix generate module',
									desc: 'Create organized modules with routes, handlers, and types',
								},
								{
									cmd: 'zapix generate controller',
									desc: 'Add typed controllers with middleware wiring',
								},
							].map((item) => (
								<div key={item.cmd} className="flex gap-3">
									<div className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-md bg-primary/10">
										<Terminal className="size-3 text-primary" />
									</div>
									<div>
										<code className="text-sm font-medium">
											{item.cmd}
										</code>
										<p className="mt-0.5 text-[13px] text-muted-foreground">
											{item.desc}
										</p>
									</div>
								</div>
							))}
						</div>
					</div>

					{/* Terminal */}
					<div className="overflow-hidden rounded-xl border border-border/60 bg-code-editor shadow-xl shadow-primary/5">
						<div className="flex items-center justify-between border-b border-border/40 bg-code-editor px-4 py-2.5">
							<div className="flex items-center gap-3">
								<div className="flex gap-1.5">
									<div className="size-2.5 rounded-full bg-[#FF5F57]/70" />
									<div className="size-2.5 rounded-full bg-[#FEBC2E]/70" />
									<div className="size-2.5 rounded-full bg-[#28C840]/70" />
								</div>
								<span className="font-mono text-[11px] text-muted/70 dark:text-white">
									~/ terminal
								</span>
							</div>
						</div>
						<div className="p-5 font-mono text-[13px] leading-[1.8]">
							<TermLine prompt>npx zapix create my-api</TermLine>
							<TermLine dim>
								Creating a new Zapix project in ./my-api
							</TermLine>
							<TermLine />
							<TermLine success>
								Project created successfully!
							</TermLine>
							<TermLine />
							<TermLine prompt>cd my-api</TermLine>
							<TermLine prompt>
								npx zapix generate module users
							</TermLine>
							<TermLine dim>Generating users module...</TermLine>
							<TermLine />
							<TermLine dim>
								{'  '}created src/modules/users/controller.ts
							</TermLine>
							<TermLine dim>
								{'  '}created src/modules/users/routes.ts
							</TermLine>
							<TermLine dim>
								{'  '}created src/modules/users/types.ts
							</TermLine>
							<TermLine />
							<TermLine success>
								Module &quot;users&quot; generated successfully!
							</TermLine>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default CLISection;

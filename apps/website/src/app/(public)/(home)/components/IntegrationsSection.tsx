import { Badge } from '@/components/ui/badge';
import { Box, Layers, Route, Zap } from 'lucide-react';

const integrations = [
	{
		icon: Layers,
		title: 'Serverless Framework',
		description:
			'Deploy Zapix handlers with your serverless.yml and standard AWS Lambda runtimes.',
		logo: 'SL',
		tag: 'serverless.yml',
		accent: 'from-[#FD5750]/20 via-[#FD5750]/5 to-transparent',
	},
	{
		icon: Box,
		title: 'SST',
		description:
			'Drop Zapix into SST functions and keep the same handler export in local dev and prod.',
		logo: 'SST',
		tag: 'sst.config.ts',
		accent: 'from-[#F5A623]/20 via-[#F5A623]/5 to-transparent',
	},
	{
		icon: Route,
		title: 'AWS SAM',
		description:
			'Wire Zapix handlers to SAM template functions with minimal glue.',
		logo: 'SAM',
		tag: 'template.yaml',
		accent: 'from-[#00A3FF]/20 via-[#00A3FF]/5 to-transparent',
	},
	{
		icon: Zap,
		title: 'Raw AWS Lambda',
		description:
			'Use the zapix/aws handler directly in a plain Lambda without any framework.',
		logo: 'λ',
		tag: 'index.ts',
		accent: 'from-[#F97316]/20 via-[#F97316]/5 to-transparent',
	},
];

const IntegrationsSection = () => {
	return (
		<section id="integrations" className="relative py-16 md:py-20">
			<div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-primary/20 to-transparent" />
			<div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(216,102,19,0.06)_0%,transparent_45%)]" />

			<div className="mx-auto max-w-7xl px-6">
				<div className="mb-12 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
					<div className="max-w-2xl">
						<Badge
							variant="outline"
							className="mb-4 border-primary/20 bg-primary/5 text-xs text-primary"
						>
							Integrations
						</Badge>
						<h2 className="text-3xl font-bold tracking-tight md:text-4xl">
							Deploy the way you want
						</h2>
						<p className="mt-4 text-muted-foreground">
							Zapix drops into the most common AWS serverless
							workflows with the same handler export.
						</p>
					</div>
					<div className="flex items-center gap-3 text-xs text-muted-foreground/80">
						<span className="rounded-full border border-border/40 bg-muted/40 px-3 py-1">
							Single handler
						</span>
						<span className="rounded-full border border-border/40 bg-muted/40 px-3 py-1">
							Zero config
						</span>
					</div>
				</div>

				<div className="grid gap-0 sm:grid-cols-2">
					{integrations.map((item) => (
						<div
							key={item.title}
							className="group relative overflow-hidden border border-border/40 bg-card/40 p-6 transition-all duration-300 hover:border-border/80 hover:bg-card/80"
						>
							<div
								className={`pointer-events-none absolute inset-0 bg-linear-to-br ${item.accent} opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
							/>
							<div className="relative">
								<div className="mb-4 flex items-center justify-between">
									<div className="flex items-center gap-3">
										<div className="flex size-11 items-center justify-center rounded-full border border-border/50  text-xs font-semibold tracking-wide text-foreground/90 shadow-[0_0_0_1px_rgba(255,255,255,0.02)]">
											{item.logo}
										</div>
										<div className="flex flex-col">
											<span className="text-sm font-semibold">
												{item.title}
											</span>
											<span className="text-[11px] text-muted-foreground/70">
												Integration target
											</span>
										</div>
									</div>
									<span className="rounded-full border border-border/40 bg-muted/40 px-2.5 py-1 text-[10px] text-muted-foreground">
										{item.tag}
									</span>
								</div>
								<p className="text-[13px] leading-relaxed text-muted-foreground">
									{item.description}
								</p>
								<div className="mt-4 flex items-center gap-2 text-[11px] text-muted-foreground/70">
									<item.icon className="size-3 text-primary/70" />
									<span className="font-mono">
										handler(app)
									</span>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default IntegrationsSection;

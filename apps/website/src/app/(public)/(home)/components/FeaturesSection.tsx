import { Badge } from '@/components/ui/badge';
import { Code2, Layers, Package, Route, Shield, Zap } from 'lucide-react';

const features = [
	{
		icon: Route,
		title: 'Express-Style Routing',
		description:
			'Familiar .get(), .post(), .put(), .delete() API. If you know Express, you already know Zapix.',
		color: 'from-[#D86613]/20 to-[#D86613]/5',
	},
	{
		icon: Layers,
		title: 'Chainable Middleware',
		description:
			'Compose auth, validation, logging in clean chains. Apply globally or per-route.',
		color: 'from-amber-500/20 to-amber-500/5',
	},
	{
		icon: Code2,
		title: 'TypeScript First',
		description:
			'Full type safety with typed handlers, request/response generics, and IDE auto-completion.',
		color: 'from-blue-500/20 to-blue-500/5',
	},
	{
		icon: Zap,
		title: 'Blazing Fast',
		description:
			'Minimal overhead on Lambda cold starts. No heavy framework, just a lightweight router.',
		color: 'from-yellow-500/20 to-yellow-500/5',
	},
	{
		icon: Package,
		title: 'Zero Dependencies',
		description:
			'Ship less code. Zapix is self-contained with no external runtime dependencies.',
		color: 'from-emerald-500/20 to-emerald-500/5',
	},
	{
		icon: Shield,
		title: 'Error Handling',
		description:
			'Global error handlers with customizable responses. Catch, log, and respond gracefully.',
		color: 'from-red-500/20 to-red-500/5',
	},
];

const FeaturesSection = () => {
	return (
		<section id="features" className="relative py-16 md:py-20">
			<div className="mx-auto max-w-7xl px-6">
				<div className="mb-16 max-w-2xl">
					<Badge
						variant="outline"
						className="mb-4 border-primary/20 bg-primary/5 text-xs text-primary"
					>
						Features
					</Badge>
					<h2 className="text-3xl font-bold tracking-tight md:text-4xl">
						Everything you need.
						<br />
						<span className="text-muted-foreground">
							Nothing you don&apos;t.
						</span>
					</h2>
					<p className="mt-4 text-muted-foreground">
						A focused toolkit for building production serverless
						APIs &mdash; no bloat, no magic, just clean primitives.
					</p>
				</div>

				<div className="grid gap-0 sm:grid-cols-2 lg:grid-cols-3">
					{features.map((feature) => (
						<div
							key={feature.title}
							className="group relative overflow-hidden border border-border/40 bg-card/40 p-6 transition-all duration-300 hover:border-border/80 hover:bg-card/80"
						>
							<div
								className={`pointer-events-none absolute inset-0 bg-linear-to-br ${feature.color} opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
							/>
							<div className="relative">
								<div className="mb-4 flex size-9 items-center justify-center rounded-lg border border-border/40 bg-muted/50">
									<feature.icon className="size-4 text-primary" />
								</div>
								<h3 className="mb-1.5 text-sm font-semibold">
									{feature.title}
								</h3>
								<p className="text-[13px] leading-relaxed text-muted-foreground">
									{feature.description}
								</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default FeaturesSection;

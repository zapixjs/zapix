import { Box, Code2, Feather, Timer } from 'lucide-react';

const stats = [
	{ value: '< 5KB', label: 'Bundle size', icon: Feather },
	{ value: '0', label: 'Config needed', icon: Box },
	{ value: '100%', label: 'TypeScript', icon: Code2 },
	{ value: '< 3ms', label: 'Routing overhead', icon: Timer },
];

const StatsSection = () => {
	return (
		<section className="relative border-y border-border/30 bg-muted/20 py-12">
			<div className="mx-auto max-w-7xl px-6">
				<div className="grid grid-cols-2 gap-8 md:grid-cols-4">
					{stats.map((stat) => (
						<div
							key={stat.label}
							className="flex flex-col items-center gap-2 text-center"
						>
							<stat.icon className="mb-1 size-4 text-primary/60" />
							<span className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
								{stat.value}
							</span>
							<span className="text-xs text-muted-foreground">
								{stat.label}
							</span>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default StatsSection;

import {
	CodeBlock,
	Fn,
	Kw,
	Line,
	Op,
	Str,
	Ty,
	Vr,
} from '@/app/(public)/components/CodeBlock';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, Github, Zap } from 'lucide-react';
import Link from 'next/link';

const HeroSection = () => {
	return (
		<section className="relative overflow-hidden pb-20 pt-16 md:pb-32 md:pt-24">
			{/* Dot grid pattern */}
			<div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle,oklch(0.35_0.01_60)_0.75px,transparent_0.75px)] bg-size-[28px_28px] opacity-[0.12] dark:opacity-[0.18] mask-[radial-gradient(ellipse_80%_60%_at_50%_30%,#000_40%,transparent_100%)]" />

			{/* Animated Z letter background */}
			<HeroZBackground />

			{/* Floating gradient orbs */}
			<div className="pointer-events-none absolute left-[15%] top-[10%] h-87.5 w-87.5 rounded-full bg-[radial-gradient(circle,rgba(216,102,19,0.08)_0%,transparent_70%)] animate-orb-drift-1 dark:bg-[radial-gradient(circle,rgba(216,102,19,0.12)_0%,transparent_70%)]" />
			<div className="pointer-events-none absolute right-[10%] top-[20%] h-70 w-70 rounded-full bg-[radial-gradient(circle,rgba(245,166,35,0.06)_0%,transparent_70%)] animate-orb-drift-2 dark:bg-[radial-gradient(circle,rgba(245,166,35,0.1)_0%,transparent_70%)]" />
			<div className="pointer-events-none absolute left-[40%] bottom-[5%] h-100 w-100 rounded-full bg-[radial-gradient(circle,rgba(232,137,42,0.05)_0%,transparent_70%)] animate-orb-drift-1 [animation-delay:4s] dark:bg-[radial-gradient(circle,rgba(232,137,42,0.08)_0%,transparent_70%)]" />

			{/* Top edge ambient glow */}
			<div className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 h-125 w-250 bg-[radial-gradient(ellipse_at_center,rgba(216,102,19,0.06)_0%,transparent_65%)] dark:bg-[radial-gradient(ellipse_at_center,rgba(216,102,19,0.1)_0%,transparent_65%)]" />

			<div className="relative mx-auto max-w-7xl px-6">
				<div className="flex flex-col items-center text-center">
					{/* Version badge */}
					<div className="animate-fade-up">
						<Badge
							variant="outline"
							className="mb-8 cursor-default gap-2 border-primary/30 bg-primary/10 px-4 py-1.5 text-[13px] font-normal text-primary transition-all hover:border-primary/40 hover:bg-primary/15"
						>
							<Zap className="size-3 text-primary/50" />
							v1.0.0-beta.1 — Now Available
						</Badge>
					</div>

					{/* Headline */}
					<h1 className="animate-fade-up-delay-1 max-w-4xl text-4xl font-bold leading-[1.2] tracking-tight md:text-[3.5rem] lg:text-7xl">
						Express-style routing
						<br />
						<span className="bg-linear-to-r from-[#D86613] via-[#E8892A] to-[#F5A623] bg-clip-text text-transparent animate-gradient-x">
							for AWS Lambda
						</span>
					</h1>

					{/* Subtitle */}
					<p className="animate-fade-up-delay-2 mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
						Build serverless APls with the DX you already love.
						Familiar routing, chainable middleware, and full
						TypeScript support - all optimized for Lambda cold
						starts.
					</p>

					{/* CTA group */}
					<div className="animate-fade-up-delay-3 mt-10 flex flex-col items-center gap-3 sm:flex-row">
						<Button
							size="lg"
							className="h-11 gap-2 bg-linear-to-r from-[#D86613] to-[#E8892A] px-7 text-sm text-white shadow-[0_0_20px_rgba(216,102,19,0.3)] hover:shadow-[0_0_30px_rgba(216,102,19,0.45)] hover:brightness-110"
							asChild
						>
							<Link href="#get-started">
								Get Started
								<ArrowRight className="size-4" />
							</Link>
						</Button>
						<Button
							size="lg"
							variant="outline"
							className="h-11 gap-2 border-border/50 px-7 text-sm hover:border-primary/30 hover:bg-primary/5"
							asChild
						>
							<Link
								href="https://github.com/zapixjs/zapix"
								target="_blank"
								rel="noopener noreferrer"
							>
								<Github className="size-4" />
								Star on GitHub
							</Link>
						</Button>
					</div>

					{/* Hero code — glowing border wrapper */}
					<div className="animate-fade-up-delay-4 mt-16 w-full max-w-2xl animate-float">
						<div className="relative rounded-xl p-px bg-linear-to-br from-[#D86613]/30 via-transparent to-[#F5A623]/20 animate-shimmer-border">
							<CodeBlock
								filename="handler.ts"
								className="border-0! shadow-[0_20px_80px_-12px_rgba(216,102,19,0.15)]"
							>
								<Line num={1}>
									<Kw>import</Kw> {'{'} <Ty>Zapix</Ty> {'}'}{' '}
									<Kw>from</Kw> <Str>&apos;zapix&apos;</Str>
								</Line>
								<Line num={2}>
									<Kw>import</Kw> {'{'} <Vr>handler</Vr> {'}'}{' '}
									<Kw>from</Kw>{' '}
									<Str>&apos;zapix/aws&apos;</Str>
								</Line>
								<Line num={3} />
								<Line num={4}>
									<Kw>const</Kw> <Vr>app</Vr> <Op>=</Op>{' '}
									<Fn>Zapix</Fn>()
								</Line>
								<Line num={5} />
								<Line num={6}>
									<Vr>app</Vr>.<Fn>get</Fn>(
									<Str>&apos;/users&apos;</Str>,{' '}
									<Kw>async</Kw> (<Vr>req</Vr>, <Vr>res</Vr>){' '}
									<Op>=&gt;</Op> {'{'}
								</Line>
								<Line num={7}>
									{'  '}
									<Kw>const</Kw> <Vr>users</Vr> <Op>=</Op>{' '}
									<Kw>await</Kw> <Fn>getUsers</Fn>()
								</Line>
								<Line num={8}>
									{'  '}
									<Vr>res</Vr>.<Fn>json</Fn>(<Vr>users</Vr>)
								</Line>
								<Line num={9}>{'})'}</Line>
								<Line num={10} />
								<Line num={11}>
									<Kw>export const</Kw> <Vr>main</Vr>{' '}
									<Op>=</Op> <Fn>handler</Fn>(<Vr>app</Vr>)
								</Line>
							</CodeBlock>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default HeroSection;

const Z_PATH =
	'M100.266 44V53.2275C100.266 56.6472 100.998 57.7064 101.273 57.9785C102.467 58.4868 104.842 58.9346 108.887 58.9346H215.619L211.293 65.2061L129.339 184.011H210.516V223H53.3906L57.7051 216.732L139.483 97.9238H96.6367C87.7989 97.9238 80.0437 95.1148 73.5859 89.4668L73.5498 89.4355L73.5137 89.4023C66.7955 83.2326 63.6817 74.5752 63.6816 64.0547V44H100.266Z';

const HeroZBackground = () => {
	return (
		<div className="pointer-events-none absolute inset-0 overflow-hidden">
			{/* Main Z — gradient filled */}
			<div className="absolute left-1/2 top-1/2 -translate-y-[30%] animate-z-breathe">
				<svg
					width="720"
					height="720"
					viewBox="0 0 268 268"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					aria-hidden="true"
				>
					<title>Z</title>
					<defs>
						<linearGradient id="z-fill" x1="0" y1="0" x2="1" y2="1">
							<stop
								offset="0%"
								stopColor="#D86613"
								stopOpacity="0.06"
							/>
							<stop
								offset="50%"
								stopColor="#E8892A"
								stopOpacity="0.03"
							/>
							<stop
								offset="100%"
								stopColor="#F5A623"
								stopOpacity="0.05"
							/>
						</linearGradient>
						<linearGradient
							id="z-fill-dark"
							x1="0"
							y1="0"
							x2="1"
							y2="1"
						>
							<stop
								offset="0%"
								stopColor="#D86613"
								stopOpacity="0.1"
							/>
							<stop
								offset="50%"
								stopColor="#E8892A"
								stopOpacity="0.05"
							/>
							<stop
								offset="100%"
								stopColor="#F5A623"
								stopOpacity="0.08"
							/>
						</linearGradient>
						<linearGradient
							id="z-stroke"
							x1="0"
							y1="0"
							x2="1"
							y2="1"
						>
							<stop
								offset="0%"
								stopColor="#D86613"
								stopOpacity="0.15"
							/>
							<stop
								offset="100%"
								stopColor="#F5A623"
								stopOpacity="0.08"
							/>
						</linearGradient>
						<linearGradient
							id="z-stroke-dark"
							x1="0"
							y1="0"
							x2="1"
							y2="1"
						>
							<stop
								offset="0%"
								stopColor="#D86613"
								stopOpacity="0.25"
							/>
							<stop
								offset="100%"
								stopColor="#F5A623"
								stopOpacity="0.12"
							/>
						</linearGradient>
					</defs>
					<path
						d={Z_PATH}
						className="fill-[url(#z-fill)] stroke-[url(#z-stroke)] dark:fill-[url(#z-fill-dark)] dark:stroke-[url(#z-stroke-dark)]"
						strokeWidth="1.5"
					/>
				</svg>
			</div>

			{/* Blurred glow Z underneath for depth */}
			<div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[55%] blur-[60px] animate-z-breathe">
				<svg
					width="720"
					height="720"
					viewBox="0 0 268 268"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					aria-hidden="true"
				>
					<title>Z glow</title>
					<path
						d={Z_PATH}
						className="fill-[#D86613]/4 dark:fill-[#D86613]/8"
						strokeWidth="0"
					/>
				</svg>
			</div>
		</div>
	);
};

import {
	Cm,
	CodeBlock,
	Fn,
	Kw,
	Line,
	Num,
	Op,
	Str,
	Ty,
	Vr,
} from '@/app/(public)/components/CodeBlock';
import { Badge } from '@/components/ui/badge';
import { Check } from 'lucide-react';

const WhySection = () => {
	return (
		<section className="relative py-16 md:py-20">
			<div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-primary/20 to-transparent" />

			<div className="mx-auto max-w-7xl px-6">
				<div className="mb-16 text-center">
					<Badge
						variant="outline"
						className="mb-4 border-primary/20 bg-primary/5 text-xs text-primary"
					>
						Why Zapix?
					</Badge>
					<h2 className="text-3xl font-bold tracking-tight md:text-4xl">
						Stop writing routing boilerplate
					</h2>
					<p className="mx-auto mt-4 max-w-lg text-muted-foreground">
						See the difference when you replace raw Lambda handlers
						with Zapix.
					</p>
				</div>

				<div className="flex flex-col lg:grid gap-5 lg:grid-cols-2">
					{/* Before */}
					<div>
						<div className="mb-3 flex items-center gap-2">
							<div className="flex size-5 items-center justify-center rounded-full bg-red-500/10 text-red-400">
								<span className="text-xs font-bold">
									&times;
								</span>
							</div>
							<span className="text-sm font-medium text-muted-foreground">
								Raw Lambda Handler
							</span>
						</div>
						<CodeBlock filename="handler.ts">
							<Line num={1}>
								<Kw>export const</Kw> <Vr>main</Vr> <Op>=</Op>{' '}
								<Kw>async</Kw> (<Vr>event</Vr>) <Op>=&gt;</Op>{' '}
								{'{'}
							</Line>
							<Line num={2}>
								{'  '}
								<Kw>const</Kw> <Vr>method</Vr> <Op>=</Op>{' '}
								<Vr>event</Vr>
								.requestContext.http.method
							</Line>
							<Line num={3}>
								{'  '}
								<Kw>const</Kw> <Vr>path</Vr> <Op>=</Op>{' '}
								<Vr>event</Vr>.rawPath
							</Line>
							<Line num={4} />
							<Line num={5}>
								{'  '}
								<Kw>if</Kw> (<Vr>method</Vr> <Op>===</Op>{' '}
								<Str>&apos;GET&apos;</Str> <Op>&amp;&amp;</Op>{' '}
								<Vr>path</Vr> <Op>===</Op>{' '}
								<Str>&apos;/users&apos;</Str>) {'{'}
							</Line>
							<Line num={6}>
								{'    '}
								<Kw>const</Kw> <Vr>users</Vr> <Op>=</Op>{' '}
								<Kw>await</Kw> <Fn>getUsers</Fn>()
							</Line>
							<Line num={7}>
								{'    '}
								<Kw>return</Kw> {'{'} statusCode: <Num>200</Num>
								,
							</Line>
							<Line num={8}>
								{'      '}body: <Ty>JSON</Ty>.<Fn>stringify</Fn>
								(<Vr>users</Vr>) {'}'}
							</Line>
							<Line num={9}>
								{'  '}
								{'}'} <Kw>else if</Kw> (<Vr>method</Vr>{' '}
								<Op>===</Op> <Str>&apos;POST&apos;</Str>) {'{'}
							</Line>
							<Line num={10}>
								{'    '}
								<Cm>{'// ...more nesting'}</Cm>
							</Line>
							<Line num={11}>{'  }'}</Line>
							<Line num={12}>{'}'}</Line>
						</CodeBlock>
					</div>

					{/* After */}
					<div>
						<div className="mb-3 flex items-center gap-2">
							<div className="flex size-5 items-center justify-center rounded-full bg-primary/10 text-primary">
								<Check className="size-3" />
							</div>
							<span className="text-sm font-medium text-primary">
								With Zapix
							</span>
						</div>
						<CodeBlock filename="handler.ts">
							<Line num={1}>
								<Kw>import</Kw> {'{'} <Ty>Zapix</Ty> {'}'}{' '}
								<Kw>from</Kw> <Str>&apos;zapix&apos;</Str>
							</Line>
							<Line num={2}>
								<Kw>import</Kw> {'{'} <Vr>handler</Vr> {'}'}{' '}
								<Kw>from</Kw> <Str>&apos;zapix/aws&apos;</Str>
							</Line>
							<Line num={3} />
							<Line num={4}>
								<Kw>const</Kw> <Vr>app</Vr> <Op>=</Op>{' '}
								<Fn>Zapix</Fn>()
							</Line>
							<Line num={5} />
							<Line num={6}>
								<Vr>app</Vr>.<Fn>get</Fn>(
								<Str>&apos;/users&apos;</Str>, <Kw>async</Kw> (
								<Vr>req</Vr>, <Vr>res</Vr>) <Op>=&gt;</Op> {'{'}
							</Line>
							<Line num={7}>
								{'  '}
								<Vr>res</Vr>.<Fn>json</Fn>(<Kw>await</Kw>{' '}
								<Fn>getUsers</Fn>())
							</Line>
							<Line num={8}>{'})'}</Line>
							<Line num={9} />
							<Line num={10}>
								<Vr>app</Vr>.<Fn>post</Fn>(
								<Str>&apos;/users&apos;</Str>, <Vr>auth</Vr>,{' '}
								<Vr>createUser</Vr>)
							</Line>
							<Line num={11} />
							<Line num={12}>
								<Kw>export const</Kw> <Vr>main</Vr> <Op>=</Op>{' '}
								<Fn>handler</Fn>(<Vr>app</Vr>)
							</Line>
						</CodeBlock>
					</div>
				</div>
			</div>
		</section>
	);
};

export default WhySection;

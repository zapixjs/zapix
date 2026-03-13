import {
	Cm,
	CodeBlock,
	Fn,
	Kw,
	Line,
	Num,
	Op,
	Str,
	Vr,
} from '@/app/(public)/components/CodeBlock';
import { Badge } from '@/components/ui/badge';

const CodeSection = () => {
	return (
		<section id="code" className="relative py-16 md:py-20">
			{/* Subtle section separator glow */}
			<div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-primary/20 to-transparent" />

			<div className="mx-auto max-w-7xl px-6">
				<div className="mb-16 text-center">
					<Badge
						variant="outline"
						className="mb-4 border-primary/20 bg-primary/5 text-xs text-primary"
					>
						Developer Experience
					</Badge>
					<h2 className="text-3xl font-bold tracking-tight md:text-4xl">
						Write APIs like it&apos;s Express
					</h2>
					<p className="mx-auto mt-4 max-w-lg text-muted-foreground">
						Same patterns you already know &mdash; middleware
						chains, route params, error handlers &mdash; but running
						on Lambda.
					</p>
				</div>

				<div className="grid gap-5 lg:grid-cols-2">
					{/* Middleware example */}
					<CodeBlock filename="middleware.ts">
						<Line num={1}>
							<Cm>
								{
									'// Auth middleware — runs before your handler'
								}
							</Cm>
						</Line>
						<Line num={2}>
							<Kw>const</Kw> <Vr>auth</Vr> <Op>=</Op>{' '}
							<Kw>async</Kw> (<Vr>req</Vr>, <Vr>res</Vr>,{' '}
							<Vr>next</Vr>) <Op>=&gt;</Op> {'{'}
						</Line>
						<Line num={3}>
							{'  '}
							<Kw>const</Kw> <Vr>token</Vr> <Op>=</Op>{' '}
							<Vr>req</Vr>
							.headers.authorization
						</Line>
						<Line num={4}>
							{'  '}
							<Kw>if</Kw> (!<Vr>token</Vr>) {'{'}
						</Line>
						<Line num={5}>
							{'    '}
							<Kw>return</Kw> <Vr>res</Vr>.<Fn>status</Fn>(
							<Num>401</Num>
							).<Fn>json</Fn>({'{'}
						</Line>
						<Line num={6}>
							{'      '}error: <Str>&apos;Unauthorized&apos;</Str>
						</Line>
						<Line num={7}>
							{'    '}
							{'}'}){'}'}
						</Line>
						<Line num={8}>
							{'  '}
							<Vr>req</Vr>.user <Op>=</Op> <Fn>verify</Fn>(
							<Vr>token</Vr>)
						</Line>
						<Line num={9}>
							{'  '}
							<Fn>next</Fn>()
						</Line>
						<Line num={10}>{'}'}</Line>
						<Line num={11} />
						<Line num={12}>
							<Cm>{'// Chain it on any route'}</Cm>
						</Line>
						<Line num={13}>
							<Vr>app</Vr>.<Fn>post</Fn>(
							<Str>&apos;/users&apos;</Str>, <Vr>auth</Vr>,{' '}
							<Kw>async</Kw> (<Vr>req</Vr>, <Vr>res</Vr>){' '}
							<Op>=&gt;</Op> {'{'}
						</Line>
						<Line num={14}>
							{'  '}
							<Kw>const</Kw> <Vr>user</Vr> <Op>=</Op>{' '}
							<Kw>await</Kw> <Fn>createUser</Fn>(<Vr>req</Vr>
							.body)
						</Line>
						<Line num={15}>
							{'  '}
							<Vr>res</Vr>.<Fn>status</Fn>(<Num>201</Num>).
							<Fn>json</Fn>(<Vr>user</Vr>)
						</Line>
						<Line num={16}>{'}'}</Line>
					</CodeBlock>

					{/* Full CRUD */}
					<CodeBlock filename="routes.ts">
						<Line num={1}>
							<Cm>{'// Full CRUD in one Lambda function'}</Cm>
						</Line>
						<Line num={2}>
							<Kw>const</Kw> <Vr>app</Vr> <Op>=</Op>{' '}
							<Fn>Zapix</Fn>()
						</Line>
						<Line num={3} />
						<Line num={4}>
							<Cm>{'// Global middleware'}</Cm>
						</Line>
						<Line num={5}>
							<Vr>app</Vr>.<Fn>use</Fn>(<Vr>cors</Vr>)
						</Line>
						<Line num={6}>
							<Vr>app</Vr>.<Fn>use</Fn>(<Vr>logger</Vr>)
						</Line>
						<Line num={7} />
						<Line num={8}>
							<Cm>{'// Define your routes'}</Cm>
						</Line>
						<Line num={9}>
							<Vr>app</Vr>.<Fn>get</Fn>(
							<Str>&apos;/users&apos;</Str>, <Vr>listUsers</Vr>)
						</Line>
						<Line num={10}>
							<Vr>app</Vr>.<Fn>get</Fn>(
							<Str>&apos;/users/:id&apos;</Str>, <Vr>getUser</Vr>)
						</Line>
						<Line num={11}>
							<Vr>app</Vr>.<Fn>post</Fn>(
							<Str>&apos;/users&apos;</Str>, <Vr>auth</Vr>,{' '}
							<Vr>createUser</Vr>)
						</Line>
						<Line num={12}>
							<Vr>app</Vr>.<Fn>put</Fn>(
							<Str>&apos;/users/:id&apos;</Str>, <Vr>auth</Vr>,{' '}
							<Vr>updateUser</Vr>)
						</Line>
						<Line num={13}>
							<Vr>app</Vr>.<Fn>delete</Fn>(
							<Str>&apos;/users/:id&apos;</Str>, <Vr>auth</Vr>,{' '}
							<Vr>deleteUser</Vr>)
						</Line>
						<Line num={14} />
						<Line num={15}>
							<Cm>{'// Catch-all error handler'}</Cm>
						</Line>
						<Line num={16}>
							<Vr>app</Vr>.<Fn>onError</Fn>((<Vr>err</Vr>,{' '}
							<Vr>req</Vr>, <Vr>res</Vr>) <Op>=&gt;</Op> {'{'}
						</Line>
						<Line num={17}>
							{'  '}
							<Vr>res</Vr>.<Fn>status</Fn>(<Num>500</Num>).
							<Fn>json</Fn>({'{'} error: <Vr>err</Vr>.message{' '}
							{'}'})
						</Line>
						<Line num={18}>{'}'}</Line>
						<Line num={19} />
						<Line num={20}>
							<Kw>export const</Kw> <Vr>userHandler</Vr>{' '}
							<Op>=</Op> <Fn>handler</Fn>(<Vr>app</Vr>)
						</Line>
					</CodeBlock>
				</div>
			</div>
		</section>
	);
};

export default CodeSection;

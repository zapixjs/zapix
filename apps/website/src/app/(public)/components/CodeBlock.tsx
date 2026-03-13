import { Copy } from 'lucide-react';
import type { FC } from 'react';

interface IProps {
	filename: string;
	className?: string;
	children: React.ReactNode;
}

export const CodeBlock: FC<IProps> = ({ children, className, filename }) => {
	return (
		<div
			className={`overflow-hidden rounded-xl border border-border/60 bg-code-editor shadow-xl ${className ?? ''}`}
		>
			<div className="flex items-center justify-between border-b border-border/40 px-4 py-2.5">
				<div className="flex items-center gap-3">
					<div className="flex gap-1.5">
						<div className="size-2.5 rounded-full bg-[#FF5F57]/70" />
						<div className="size-2.5 rounded-full bg-[#FEBC2E]/70" />
						<div className="size-2.5 rounded-full bg-[#28C840]/70" />
					</div>
					<span className="font-mono text-[11px] text-muted-foreground">
						{filename}
					</span>
				</div>
				<button
					type="button"
					className="rounded-md p-1 transition-colors text-muted-foreground"
				>
					<Copy className="size-3" />
				</button>
			</div>
			<pre className="overflow-x-auto px-5 py-5 font-mono text-[13px] leading-[1.7] text-left!">
				<code className="block text-left!">{children}</code>
			</pre>
		</div>
	);
};

/* ─── Syntax Highlighting Primitives ─── */

export const Line = ({
	children,
	num,
}: {
	children?: React.ReactNode;
	num?: number;
}) => (
	<div className=" text-white text-left!">
		{num !== undefined && (
			<span className="mr-6 inline-block w-4 select-none text-right text-muted-foreground">
				{num}
			</span>
		)}
		{children}
		{!children && '\u00A0'}
	</div>
);

export const Kw = ({ children }: { children: React.ReactNode }) => (
	<span className="text-[#C586C0]">{children}</span>
);
export const Fn = ({ children }: { children: React.ReactNode }) => (
	<span className="text-[#DCDCAA]">{children}</span>
);
export const Str = ({ children }: { children: React.ReactNode }) => (
	<span className="text-[#CE9178]">{children}</span>
);
export const Vr = ({ children }: { children: React.ReactNode }) => (
	<span className="text-[#9CDCFE]">{children}</span>
);
export const Cm = ({ children }: { children: React.ReactNode }) => (
	<span className="text-[#6A9955]">{children}</span>
);
export const Num = ({ children }: { children: React.ReactNode }) => (
	<span className="text-[#B5CEA8]">{children}</span>
);
export const Ty = ({ children }: { children: React.ReactNode }) => (
	<span className="text-[#4EC9B0]">{children}</span>
);
export const Op = ({ children }: { children: React.ReactNode }) => (
	<span className="text-white">{children}</span>
);

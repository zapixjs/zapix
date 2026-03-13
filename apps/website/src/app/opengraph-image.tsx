import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Zapix – Express-style routing for AWS Lambda';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OgImage() {
	return new ImageResponse(
		<div
			style={{
				width: '1200px',
				height: '630px',
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
				background: '#0a0a0a',
				fontFamily: 'sans-serif',
				position: 'relative',
				overflow: 'hidden',
			}}
		>
			{/* Ambient gradient */}
			<div
				style={{
					position: 'absolute',
					top: '-100px',
					left: '50%',
					transform: 'translateX(-50%)',
					width: '800px',
					height: '500px',
					background:
						'radial-gradient(ellipse at center, rgba(216,102,19,0.18) 0%, transparent 65%)',
					borderRadius: '50%',
				}}
			/>

			{/* Bottom glow */}
			<div
				style={{
					position: 'absolute',
					bottom: '-80px',
					left: '50%',
					transform: 'translateX(-50%)',
					width: '600px',
					height: '300px',
					background:
						'radial-gradient(ellipse at center, rgba(245,166,35,0.08) 0%, transparent 70%)',
					borderRadius: '50%',
				}}
			/>

			{/* Logo + name */}
			<div
				style={{
					display: 'flex',
					alignItems: 'center',
					gap: '14px',
					marginBottom: '36px',
				}}
			>
				<div
					style={{
						width: '52px',
						height: '52px',
						background:
							'linear-gradient(135deg, #D86613 0%, #E8892A 100%)',
						borderRadius: '12px',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						boxShadow: '0 0 32px rgba(216,102,19,0.5)',
					}}
				>
					<span
						style={{
							color: '#fff',
							fontSize: '26px',
							fontWeight: 700,
						}}
					>
						Z
					</span>
				</div>
				<span
					style={{
						color: '#fff',
						fontSize: '32px',
						fontWeight: 600,
						letterSpacing: '-0.5px',
					}}
				>
					zapix
				</span>
			</div>

			{/* Headline */}
			<div
				style={{
					fontSize: '62px',
					fontWeight: 800,
					color: '#fff',
					textAlign: 'center',
					lineHeight: 1.15,
					letterSpacing: '-1.5px',
					maxWidth: '900px',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}}
			>
				<span>Express-style routing</span>
				<span
					style={{
						background:
							'linear-gradient(90deg, #D86613, #E8892A, #F5A623)',
						backgroundClip: 'text',
						color: 'transparent',
					}}
				>
					for AWS Lambda
				</span>
			</div>

			{/* Subtitle */}
			<p
				style={{
					marginTop: '24px',
					fontSize: '22px',
					color: 'rgba(255,255,255,0.45)',
					textAlign: 'center',
					maxWidth: '680px',
					lineHeight: 1.5,
				}}
			>
				Lightweight · TypeScript-first · Zero config · &lt; 5KB
			</p>

			{/* Bottom badge */}
			<div
				style={{
					marginTop: '44px',
					display: 'flex',
					alignItems: 'center',
					gap: '8px',
					border: '1px solid rgba(216,102,19,0.3)',
					background: 'rgba(216,102,19,0.08)',
					borderRadius: '999px',
					padding: '8px 20px',
				}}
			>
				<span style={{ color: '#D86613', fontSize: '14px' }}>⚡</span>
				<span
					style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px' }}
				>
					v1.0.0-beta.1 — Now Available on npm
				</span>
			</div>
		</div>,
		{ ...size },
	);
}

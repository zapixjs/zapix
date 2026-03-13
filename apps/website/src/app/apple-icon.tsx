import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function AppleIcon() {
	return new ImageResponse(
		<div
			style={{
				width: 180,
				height: 180,
				background: 'linear-gradient(145deg, #D86613 0%, #E8892A 100%)',
				borderRadius: 38,
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
			}}
		>
			<span
				style={{
					color: '#fff',
					fontSize: 120,
					fontWeight: 800,
					lineHeight: 1,
					marginTop: 4,
				}}
			>
				Z
			</span>
		</div>,
		{ ...size },
	);
}

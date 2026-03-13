import type React from 'react';
import { FooterSection, HeaderSection } from './components';

const layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div>
			<HeaderSection />
			{children}
			<FooterSection />
		</div>
	);
};

export default layout;

import {
	CLISection,
	CodeSection,
	FeaturesSection,
	GetStartedSection,
	HeroSection,
	IntegrationsSection,
	StatsSection,
	WhySection,
} from './components';

const page = () => {
	return (
		<div>
			<HeroSection />
			<StatsSection />
			<FeaturesSection />
			<IntegrationsSection />
			<CodeSection />
			<WhySection />
			<CLISection />
			<GetStartedSection />
		</div>
	);
};

export default page;

import { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AboutHero from './AboutHero';
import CompanyHistory from './CompanyHistory';
import ValuesSection from './ValuesSection';
import TeamSection from './TeamSection';

export const metadata: Metadata = {
	title: 'About Us',
	description: 'About our platform and its features.',
};

export default function AboutPage() {
	return (
		<main>
			<Header />
			<AboutHero />
			<CompanyHistory />
			<ValuesSection />
			<TeamSection />
			<Footer />
		</main>
	);
}

import FAQSection from './FAQSection';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FAQHero from './FAQHero';

export default function FAQPage() {
	return (
		<main>
			<Header />
			<FAQHero />
			<FAQSection />
			<Footer />
		</main>
	);
}

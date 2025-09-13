import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ContactHero from './ContactHero';
import ContactForm from './ContactForm';
import ContactInfo from './ContactInfo';
import LocationSection from './LocationSection';

export default function ContactPage() {
	return (
		<div className="min-h-screen bg-gray-900">
			<Header />
			<ContactHero />
			<div className="relative">
				<div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-orange-900/20"></div>
				<div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-orange-400/10 to-pink-500/10 rounded-full blur-3xl animate-pulse"></div>
				<div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse"></div>

				<div className="relative z-10">
					<ContactForm />
					<ContactInfo />
					<LocationSection />
				</div>
			</div>
			<Footer />
		</div>
	);
}

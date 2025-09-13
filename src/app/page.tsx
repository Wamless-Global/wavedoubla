'use client';

import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import HowItWorksSection from '@/components/HowItWorksSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import Footer from '@/components/Footer';

export default function Home() {
	return (
		<main>
			<Header />
			<HeroSection />
			<HowItWorksSection />
			<TestimonialsSection />
			<Footer />
		</main>
	);
}

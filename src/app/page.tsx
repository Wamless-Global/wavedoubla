'use client';

import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import HowItWorksSection from '@/components/HowItWorksSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import Footer from '@/components/Footer';

export default function Home() {
	return (
		<div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-purple-900">
			<Header />
			<HeroSection />
			<HowItWorksSection />
			<TestimonialsSection />
			<Footer />
		</div>
	);
}

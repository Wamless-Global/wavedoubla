'use client';

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import nProgress from 'nprogress';

export default function HeroSection() {
	const router = useRouter();

	return (
		<section
			className="relative min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
			style={{
				backgroundImage: `url('/images/hero.jpg')`,
			}}
		>
			<div className="absolute inset-0 bg-black/60"></div>

			<div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
				<div className="max-w-4xl mx-auto">
					<h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight px-2">Give Generously, Earn Continuously—Start Building Wealth Through Giving</h1>

					<p className="text-lg sm:text-xl md:text-2xl text-white/90 mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed px-2">
						Join a global donation community where your generosity doesn't just help others—it elevates you too! Get matched to give and receive help from internal sources and grow a stream of income through our transparent trust-level reward system.
					</p>

					<div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4">
						<Button
							variant="outline"
							size="lg"
							className="text-white border-white hover:bg-white hover:text-black px-6 sm:px-8 py-3 w-full sm:w-auto"
							onClick={() => {
								nProgress.start();
								router.push(`/auth/login`);
							}}
						>
							Login
						</Button>
						<Button
							size="lg"
							className="bg-blue-600 hover:bg-blue-700 text-white px-6 sm:px-8 py-3 w-full sm:w-auto"
							onClick={() => {
								nProgress.start();
								router.push(`/auth/signup`);
							}}
						>
							Get Started
						</Button>
					</div>
				</div>
			</div>
		</section>
	);
}

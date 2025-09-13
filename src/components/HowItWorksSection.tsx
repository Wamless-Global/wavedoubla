'use client';

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import nProgress from 'nprogress';

export default function HowItWorksSection() {
	const router = useRouter();

	const steps = [
		{
			number: '01',
			icon: 'ri-user-add-fill',
			title: 'Create Account',
			description: 'Sign up in minutes and join our trusted community of donors and recipients.',
		},
		{
			number: '02',
			icon: 'ri-search-fill',
			title: 'Explore Causes',
			description: 'Choose an amount and get matched to invest to another participant.',
		},
		{
			number: '03',
			icon: 'ri-hand-heart-fill',
			title: 'Make Impact',
			description: 'Get matched to receive help from others in the system.',
		},
		{
			number: '04',
			icon: 'ri-trophy-fill',
			title: 'Track Progress',
			description: 'Earn direct and indirect multilevel bonuses.',
		},
	];

	return (
		<section className="py-24 px-6 bg-gray-800/50">
			<div className="container mx-auto max-w-7xl">
				<div className="text-center mb-16">
					<h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
						How It <span className="bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent">Works</span>
					</h2>
					<p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">Getting started is simple. Follow these four easy steps to begin making a difference in our community-driven donation platform.</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
					{steps.map((step, index) => (
						<div key={index} className="relative group">
							<div className="bg-gray-900/60 backdrop-blur-lg rounded-3xl p-8 border border-gray-700/50 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 h-full">
								{/* Step Number */}
								<div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-r from-orange-400 to-pink-500 rounded-2xl flex items-center justify-center font-bold text-white text-lg shadow-lg">{step.number}</div>

								{/* Icon */}
								<div className="w-16 h-16 bg-gradient-to-r from-orange-400/20 to-pink-500/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
									<i className={`${step.icon} text-orange-400 text-2xl`}></i>
								</div>

								{/* Content */}
								<h3 className="text-2xl font-bold text-white mb-4">{step.title}</h3>
								<p className="text-gray-300 leading-relaxed">{step.description}</p>

								{/* Decorative element */}
								<div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-orange-400 to-pink-500 rounded-b-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}

'use client';

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import nProgress from 'nprogress';

export default function HowItWorksSection() {
	const router = useRouter();

	const steps = [
		{
			icon: 'ri-user-add-line',
			title: 'Create an Account',
			description: 'Join our fast-growing community of donors and servers',
		},
		{
			icon: 'ri-money-dollar-circle-line',
			title: 'Make a Donation',
			description: 'Choose an amount and get matched to invest to another participant',
		},
		{
			icon: 'ri-hand-heart-line',
			title: 'Get Matched to Get Paid',
			description: 'Get matched to receive help from others in the system',
		},
		{
			icon: 'ri-coins-line',
			title: 'Earn Through Referrals',
			description: 'Earn direct and indirect multilevel bonuses',
		},
	];

	return (
		<section className="py-12 sm:py-16 lg:py-20 bg-blue-600">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="text-center mb-12 sm:mb-16">
					<h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 px-2">How It Works</h2>
					<p className="text-lg sm:text-xl text-white/90 max-w-3xl mx-auto px-2">Understand the simple steps to start helping, earning, and growing within our trusted peer-to-peer community.</p>
				</div>

				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-8 sm:mb-12">
					{steps.map((step, index) => (
						<div key={index} className="bg-white rounded-lg p-6 text-center shadow-lg">
							<div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
								<i className={`${step.icon} text-blue-600 text-2xl`}></i>
							</div>
							<h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3">{step.title}</h3>
							<p className="text-sm sm:text-base text-gray-600 leading-relaxed">{step.description}</p>
						</div>
					))}
				</div>

				<div className="text-center px-4">
					<Button
						onClick={() => {
							nProgress.start();
							router.push(`/auth/signup`);
						}}
						size="lg"
						className="bg-white text-blue-600 hover:bg-gray-100 px-6 sm:px-8 py-3 w-full sm:w-auto"
					>
						Get started now
					</Button>
				</div>
			</div>
		</section>
	);
}

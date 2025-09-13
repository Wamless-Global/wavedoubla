'use client';

import { useRouter } from 'next/navigation';
import nProgress from 'nprogress';

export default function HeroSection() {
	const router = useRouter();

	return (
		<section className="relative py-24 px-6 overflow-hidden">
			{/* Animated Background Orbs */}
			<div className="absolute inset-0">
				<div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-orange-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse"></div>
				<div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full blur-3xl animate-bounce"></div>
				<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-pink-500/10 to-orange-500/10 rounded-full blur-2xl"></div>
			</div>

			<div className="container mx-auto max-w-7xl relative z-10">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
					{/* Left Content */}
					<div className="w-full">
						<h1 className="text-5xl lg:text-7xl font-bold text-white mb-8 leading-tight">
							Join Our
							<span className="block bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent">Community</span>
							Platform
						</h1>
						<p className="text-xl text-gray-300 mb-10 leading-relaxed">Experience the power of collective giving. Connect with like-minded individuals and make a meaningful impact together in our trusted donation community.</p>
						<div className="flex flex-col sm:flex-row gap-4 mb-12">
							<button
								className="bg-gradient-to-r from-orange-400 to-pink-500 text-white px-10 py-4 rounded-full font-semibold text-lg hover:from-orange-500 hover:to-pink-600 transition-all cursor-pointer whitespace-nowrap shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
								onClick={() => {
									nProgress.start();
									router.push(`/auth/login`);
								}}
							>
								Login
							</button>
							<button
								className="border-2 border-orange-400 text-orange-400 px-10 py-4 rounded-full font-semibold text-lg hover:bg-orange-400 hover:text-white transition-all cursor-pointer whitespace-nowrap"
								onClick={() => {
									nProgress.start();
									router.push(`/auth/signup`);
								}}
							>
								Get Started
							</button>
						</div>

						{/* Stats */}
						<div className="grid grid-cols-3 gap-8">
							<div className="text-center">
								<div className="text-3xl font-bold text-white mb-2">50K+</div>
								<div className="text-gray-400 text-sm">Active Members</div>
							</div>
							<div className="text-center">
								<div className="text-3xl font-bold text-white mb-2">$2M+</div>
								<div className="text-gray-400 text-sm">Total Donated</div>
							</div>
							<div className="text-center">
								<div className="text-3xl font-bold text-white mb-2">200+</div>
								<div className="text-gray-400 text-sm">Projects Funded</div>
							</div>
						</div>
					</div>

					{/* Right Content - Statistics Cards */}
					<div className="w-full">
						<div className="grid grid-cols-2 gap-6">
							<div className="bg-gray-800/60 backdrop-blur-lg rounded-3xl p-6 border border-gray-700/50 shadow-xl">
								<div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-pink-500 rounded-2xl flex items-center justify-center mb-4">
									<i className="ri-group-fill text-white text-xl"></i>
								</div>
								<h3 className="text-2xl font-bold text-white mb-2">Community</h3>
								<p className="text-gray-300 text-sm">Join thousands of generous hearts making a difference</p>
							</div>

							<div className="bg-gray-800/60 backdrop-blur-lg rounded-3xl p-6 border border-gray-700/50 shadow-xl">
								<div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-blue-500 rounded-2xl flex items-center justify-center mb-4">
									<i className="ri-shield-check-fill text-white text-xl"></i>
								</div>
								<h3 className="text-2xl font-bold text-white mb-2">Secure</h3>
								<p className="text-gray-300 text-sm">Your donations are protected with bank-level security</p>
							</div>

							<div className="bg-gray-800/60 backdrop-blur-lg rounded-3xl p-6 border border-gray-700/50 shadow-xl">
								<div className="w-12 h-12 bg-gradient-to-r from-green-400 to-teal-500 rounded-2xl flex items-center justify-center mb-4">
									<i className="ri-line-chart-fill text-white text-xl"></i>
								</div>
								<h3 className="text-2xl font-bold text-white mb-2">Impact</h3>
								<p className="text-gray-300 text-sm">Track the real-world impact of your contributions</p>
							</div>

							<div className="bg-gray-800/60 backdrop-blur-lg rounded-3xl p-6 border border-gray-700/50 shadow-xl">
								<div className="w-12 h-12 bg-gradient-to-r from-pink-400 to-red-500 rounded-2xl flex items-center justify-center mb-4">
									<i className="ri-heart-fill text-white text-xl"></i>
								</div>
								<h3 className="text-2xl font-bold text-white mb-2">Purpose</h3>
								<p className="text-gray-300 text-sm">Every donation creates meaningful change</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

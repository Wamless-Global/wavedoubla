'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import NProgress from 'nprogress';
import { fetchWithAuth } from '@/lib/fetchWithAuth';
import { logger } from '@/lib/logger';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function MaintenanceMode() {
	const [timeLeft, setTimeLeft] = useState('');
	const [message, setMessage] = useState('');
	const [detailedTime, setDetailedTime] = useState({ hours: 1, minutes: 59, seconds: 0 });
	const router = useRouter();
	const searchParams = useSearchParams();

	useEffect(() => {
		const targetDate = new Date();
		targetDate.setHours(targetDate.getHours() + 2);

		const timer = setInterval(() => {
			const now = new Date().getTime();
			const distance = targetDate.getTime() - now;

			if (distance < 0) {
				setTimeLeft('Soon');
				setDetailedTime({ hours: 0, minutes: 0, seconds: 0 });
				return;
			}

			const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
			const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
			const seconds = Math.floor((distance % (1000 * 60)) / 1000);

			setTimeLeft(`${hours}h ${minutes}m`);
			setDetailedTime({ hours, minutes, seconds });
		}, 1000);

		// Fetch maintenance message
		fetchWithAuth('/api/admin/maintenance-mode/message')
			.then((res) => (res.ok ? res.json() : Promise.reject('No message')))
			.then((data) => {
				logger.log('Maintenance message fetched:', data);
				if (typeof data.message === 'string') setMessage(data.message);
			})
			.catch(() => setMessage("We're currently performing scheduled maintenance to improve your experience. We'll be back shortly."));

		return () => clearInterval(timer);
	}, []);

	const handleCheckAgain = () => {
		const redirectTo = searchParams.get('redirect_to');
		if (redirectTo && redirectTo.startsWith('/')) {
			NProgress.start();
			router.push(redirectTo);
			// Optionally, stop NProgress after navigation
			setTimeout(() => NProgress.done(), 1000);
		} else {
			window.location.reload();
		}
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-purple-900">
			<Header />

			{/* Animated Background Elements */}
			<div className="fixed inset-0 overflow-hidden pointer-events-none">
				<div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-orange-400/20 to-pink-500/20 rounded-full blur-3xl animate-pulse"></div>
				<div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
				<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-pink-500/10 to-orange-400/10 rounded-full blur-2xl animate-pulse delay-500"></div>
			</div>

			<main className="relative z-10 flex flex-col items-center justify-center min-h-[80vh] px-6 text-center py-20">
				{/* Maintenance Icon */}
				<div className="mb-8">
					<div className="w-32 h-32 bg-gradient-to-r from-orange-400 to-pink-500 rounded-full flex items-center justify-center mb-6 mx-auto animate-pulse">
						<i className="ri-tools-line text-white text-5xl"></i>
					</div>
					<div className="w-32 h-1 bg-gradient-to-r from-orange-400 to-pink-500 mx-auto rounded-full"></div>
				</div>

				{/* Maintenance Message */}
				<div className="mb-12 max-w-2xl">
					<h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600 bg-clip-text text-transparent mb-6">Under Maintenance</h1>
					<p className="text-xl text-gray-300 leading-relaxed mb-8">{message || "We're currently performing scheduled maintenance to improve your experience. We'll be back shortly with enhanced features and better performance."}</p>
				</div>

				{/* Countdown Timer */}
				<div className="mb-12">
					<p className="text-lg text-gray-400 mb-6">Expected back online</p>
					<div className="flex items-center justify-center space-x-4 mb-8">
						<div className="bg-white/10 backdrop-blur-md border border-purple-400/30 rounded-2xl p-4 min-w-[80px]">
							<div className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent">{detailedTime.hours.toString().padStart(2, '0')}</div>
							<div className="text-sm text-gray-400">Hours</div>
						</div>
						<div className="text-2xl text-gray-500">:</div>
						<div className="bg-white/10 backdrop-blur-md border border-purple-400/30 rounded-2xl p-4 min-w-[80px]">
							<div className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent">{detailedTime.minutes.toString().padStart(2, '0')}</div>
							<div className="text-sm text-gray-400">Minutes</div>
						</div>
						<div className="text-2xl text-gray-500">:</div>
						<div className="bg-white/10 backdrop-blur-md border border-purple-400/30 rounded-2xl p-4 min-w-[80px]">
							<div className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent">{detailedTime.seconds.toString().padStart(2, '0')}</div>
							<div className="text-sm text-gray-400">Seconds</div>
						</div>
					</div>
				</div>

				{/* Action Button */}
				<div className="mb-12">
					<button
						onClick={handleCheckAgain}
						className="bg-gradient-to-r from-orange-400 to-pink-500 text-white px-8 py-4 rounded-full font-semibold hover:from-orange-500 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 whitespace-nowrap flex items-center space-x-2 cursor-pointer"
					>
						<i className="ri-refresh-line text-lg"></i>
						<span>Check Again</span>
					</button>
				</div>

				{/* Status Updates */}
				<div className="bg-white/5 backdrop-blur-md border border-purple-400/30 rounded-3xl p-8 max-w-lg mb-8">
					<h3 className="text-xl font-semibold text-white mb-4 flex items-center justify-center space-x-2">
						<i className="ri-notification-3-line text-orange-400"></i>
						<span>Stay Updated</span>
					</h3>
					<p className="text-gray-300 mb-6">Follow us for updates or contact support if you need immediate assistance.</p>

					{/* Social Links */}
					<div className="flex justify-center space-x-4 mb-6">
						<a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer">
							<i className="ri-twitter-line text-gray-300 hover:text-white"></i>
						</a>
						<a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer">
							<i className="ri-facebook-line text-gray-300 hover:text-white"></i>
						</a>
						<a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer">
							<i className="ri-mail-line text-gray-300 hover:text-white"></i>
						</a>
					</div>

					<a href="/contact" className="cursor-pointer">
						<button className="bg-gradient-to-r from-purple-500 to-blue-600 text-white px-6 py-3 rounded-full font-medium hover:from-purple-600 hover:to-blue-700 transition-all duration-300 cursor-pointer whitespace-nowrap flex items-center space-x-2 mx-auto">
							<i className="ri-customer-service-line"></i>
							<span>Contact Support</span>
						</button>
					</a>
				</div>

				{/* What We're Working On */}
				<div className="w-full max-w-4xl">
					<h3 className="text-2xl font-semibold text-white mb-8 text-center">What We're Working On</h3>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
						<div className="bg-white/5 backdrop-blur-md border border-purple-400/30 rounded-2xl p-6">
							<div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-pink-500 rounded-xl flex items-center justify-center mb-4">
								<i className="ri-speed-up-line text-white text-xl"></i>
							</div>
							<h4 className="text-lg font-semibold text-white mb-2">Performance</h4>
							<p className="text-gray-300 text-sm">Optimizing server performance for faster load times</p>
						</div>

						<div className="bg-white/5 backdrop-blur-md border border-purple-400/30 rounded-2xl p-6">
							<div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-600 rounded-xl flex items-center justify-center mb-4">
								<i className="ri-shield-check-line text-white text-xl"></i>
							</div>
							<h4 className="text-lg font-semibold text-white mb-2">Security</h4>
							<p className="text-gray-300 text-sm">Implementing enhanced security measures</p>
						</div>

						<div className="bg-white/5 backdrop-blur-md border border-purple-400/30 rounded-2xl p-6">
							<div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-orange-400 rounded-xl flex items-center justify-center mb-4">
								<i className="ri-add-circle-line text-white text-xl"></i>
							</div>
							<h4 className="text-lg font-semibold text-white mb-2">Features</h4>
							<p className="text-gray-300 text-sm">Adding exciting new features for better experience</p>
						</div>
					</div>
				</div>
			</main>

			<Footer />
		</div>
	);
}

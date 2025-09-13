'use client';

import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import NProgress from 'nprogress';
import { fetchWithAuth } from '@/lib/fetchWithAuth';
import { logger } from '@/lib/logger';

export default function MaintenanceMode() {
	const [timeLeft, setTimeLeft] = useState('');
	const [message, setMessage] = useState('');
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
				return;
			}

			const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
			const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

			setTimeLeft(`${hours}h ${minutes}m`);
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
		<div className="min-h-screen  flex items-center justify-center px-4">
			<div className="max-w-md w-full text-center">
				<div className="mb-8">
					<div className="w-24 h-24 bg-yellow-100 dark:bg-yellow-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
						<i className="ri-tools-line w-12 h-12 flex items-center justify-center text-yellow-600 dark:text-yellow-500"></i>
					</div>
					<h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Under Maintenance</h1>
					<p className="text-gray-600 dark:text-gray-400 mb-8">{message}</p>
				</div>

				<div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 mb-8">
					<div className="flex items-center justify-center gap-2 mb-4">
						<i className="ri-time-line w-5 h-5 flex items-center justify-center text-gray-500 dark:text-gray-400"></i>
						<span className="text-sm font-medium text-gray-700 dark:text-gray-300">Expected back online</span>
					</div>
					<div className="text-2xl font-bold text-blue-600 dark:text-blue-500">{timeLeft}</div>
				</div>

				<div className="space-y-4">
					<Button onClick={handleCheckAgain} className="w-full bg-blue-600 hover:bg-blue-700 text-white">
						<i className="ri-refresh-line w-4 h-4 flex items-center justify-center mr-2"></i>
						Check Again
					</Button>

					<div className="flex items-center justify-center gap-4">
						<a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-500">
							<i className="ri-twitter-fill w-5 h-5 flex items-center justify-center"></i>
						</a>
						<a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-500">
							<i className="ri-facebook-fill w-5 h-5 flex items-center justify-center"></i>
						</a>
						<a href="mailto:support@Monidoubla.com" className="text-gray-400 hover:text-blue-500">
							<i className="ri-mail-fill w-5 h-5 flex items-center justify-center"></i>
						</a>
					</div>
				</div>

				<div className="mt-8 text-sm text-gray-500 dark:text-gray-400">
					<p>
						Follow us for updates or contact{' '}
						<a href="mailto:support@Monidoubla.com" className="text-blue-600 dark:text-blue-500 hover:underline">
							support
						</a>
					</p>
				</div>
			</div>
		</div>
	);
}

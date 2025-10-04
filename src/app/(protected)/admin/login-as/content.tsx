'use client';

import { logout } from '@/lib/auth';
import { fetchWithAuth } from '@/lib/fetchWithAuth';
import { adminLoginRequest, getLoggedInAsUser, getSetCookie } from '@/lib/helpers';
import { logger } from '@/lib/logger';
import { LocalUser, removeCurrentUser, setCurrentUser } from '@/lib/userUtils';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export default function LoggingInPage() {
	const [loggingIn, setLoggingIn] = useState(false);
	const router = useRouter();

	const signIn = () => {
		const { access_token, refresh_token, expires_at, expires_in } = getLoggedInAsUser();
		if (!access_token) {
			toast.error('No access token found. Please try logging in again.');
			return;
		}
		const toastId = toast.info('Completing login...');
		setLoggingIn(true);
		fetch('/api/auth/set-session', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ access_token, refresh_token, expires_at, expires_in }),
		})
			.then(async (res) => {
				const data = await res.json().catch(() => ({}));
				if (!res.ok) {
					throw new Error(data.message || 'Failed to set session.');
				}

				const checkUserSession = async () => {
					try {
						const response = await fetchWithAuth('/api/auth/verify-me');
						if (!response.ok) {
							throw new Error(`Failed to verify user session: ${response.statusText}`);
						}

						const sessionData = await response.json();

						if (sessionData.status === 'success' && sessionData.data?.user) {
							setCurrentUser(sessionData.data.user as LocalUser);
							router.replace('/user');
						} else {
							throw new Error(`Failed to verify user session: ${response.statusText}`);
						}
					} catch {
						logger.error(`An error occurred when logging you in`);
						removeCurrentUser();
						await logout();
					}
				};

				checkUserSession();

				toast.success('Login as user completed!', { id: toastId });

				localStorage.setItem('sb-auth-cookie-set', JSON.stringify(true));
			})
			.catch((err) => {
				setLoggingIn(true);
				toast.error(err.message || 'Failed to set session.', { id: toastId });
			});
	};

	useEffect(() => {
		if (!getSetCookie() && adminLoginRequest()) {
			logger.log('No set-cookie and admin login request found');
			if (!loggingIn) {
				const timer = setTimeout(() => {
					signIn();
				}, 2000);
				return () => clearTimeout(timer);
			}
		} else {
			logger.log('Set-cookie found or not an admin login request');
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return (
		<div className="flex flex-col items-center justify-center min-h-screen">
			<div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-solid mb-4"></div>
			<span className="text-lg font-medium text-gray-700 dark:text-gray-200">Logging you into the user's account...</span>
		</div>
	);
}

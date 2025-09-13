'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { VerifyResetTokenResult } from '@/types';
import { fetchWithAuth } from '@/lib/fetchWithAuth';
import { Loader2 } from 'lucide-react';

export default function UpdatePasswordPageContent() {
	const router = useRouter();

	const [loading, setLoading] = useState(false);
	const [token, setToken] = useState<string | null>(null);
	const [pageStatus, setPageStatus] = useState<'loading' | 'success' | 'error' | 'expired'>('loading');
	const [statusMessage, setStatusMessage] = useState('Checking password reset link...');
	const [title, setTitle] = useState('Update Password');
	const [newPassword, setNewPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');

	useEffect(() => {
		const hash = window.location.hash;
		const params = new URLSearchParams(hash.substring(1));
		const error = params.get('error');
		const errorCode = params.get('error_code');
		const errorDesc = params.get('error_description');
		const tokenFromUrl = params.get('access_token');

		async function verifyToken(token: string) {
			try {
				const res = await fetchWithAuth(
					`/api/auth/verify-reset-token`,
					{
						method: 'POST',
						body: JSON.stringify({ accessToken: token }),
					},
					token
				);

				const result: VerifyResetTokenResult = await res.json();
				if (result.valid) {
					setToken(token);
					setPageStatus('success');
					setStatusMessage('Please enter your new password.');
					setTitle('Update Password');
					toast.success('Your password reset link is valid. Please enter your new password.');
				} else {
					const message = result.error?.message || 'Password reset link is invalid or expired.';
					setStatusMessage(message);
					toast.error(message);
					setPageStatus(result.error?.name === 'TokenExpiredError' ? 'expired' : 'error');
					setTitle(result.error?.name === 'TokenExpiredError' ? 'Link Expired' : 'Invalid Link');
				}
			} catch {
				setStatusMessage('Failed to verify reset link.');
				setPageStatus('error');
				setTitle('Error');
			}
		}

		if (error) {
			const detailedMessage = errorDesc || 'An unknown error occurred.';
			setStatusMessage(detailedMessage);
			toast.error(detailedMessage);
			if (errorCode === 'otp_expired' || error === 'access_denied') {
				setPageStatus('expired');
				setTitle('Link Expired');
			} else {
				setPageStatus('error');
				setTitle('Error');
			}
		} else if (tokenFromUrl) {
			verifyToken(tokenFromUrl);
		} else {
			const message = 'Password reset link is invalid or missing.';
			setStatusMessage(message);
			toast.error(message);
			setPageStatus('error');
			setTitle('Invalid Link');
		}
	}, []);

	function validateForm() {
		if (!newPassword || !confirmPassword) {
			setError('Both password fields are required.');
			return false;
		}
		if (newPassword.length < 6) {
			setError('Password must be at least 6 characters.');
			return false;
		}
		if (newPassword !== confirmPassword) {
			setError('Passwords do not match.');
			return false;
		}
		setError('');
		return true;
	}

	async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		setError('');
		setSuccess('');
		if (!validateForm()) return;
		if (!token) {
			setError('Password reset token is missing.');
			return;
		}
		setLoading(true);
		try {
			const response = await fetchWithAuth(
				'/api/auth/update-password',
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						accessToken: token,
						newPassword,
						confirmPassword,
					}),
				},
				token
			);
			const data = await response.json();

			if (response.ok) {
				setSuccess(data.message || 'Your password has been updated successfully. Please login.');
				setTimeout(() => {
					router.push('/auth/login');
				}, 5000);
				setNewPassword('');
				setConfirmPassword('');
			} else {
				setError(data.message || 'Failed to update password.');
			}
		} catch (err) {
			setError('An error occurred. Please try again.');
		} finally {
			setLoading(false);
		}
	}

	if (pageStatus === 'loading') {
		return (
			<div className="min-h-screen bg-gray-900 py-20 px-6 relative overflow-hidden">
				<div className="absolute inset-0 overflow-hidden">
					<div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-orange-400/20 to-pink-500/20 rounded-full blur-3xl animate-pulse"></div>
					<div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-purple-500/20 to-orange-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
					<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-pink-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
				</div>

				<div className="w-full max-w-md relative z-10 mx-auto">
					<div className="bg-white/10 backdrop-blur-md border border-purple-800/30 rounded-3xl p-10 shadow-2xl text-center">
						<h1 className="text-2xl font-bold text-white mb-8">Update Password</h1>
						<div className="flex items-center justify-center gap-2">
							<Loader2 className="h-5 w-5 animate-spin text-white" />
							<h2 className="text-lg text-white">Loading...</h2>
						</div>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gray-900 flex items-center justify-center px-6 py-12 relative overflow-hidden">
			<div className="absolute inset-0 overflow-hidden">
				<div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-orange-400/20 to-pink-500/20 rounded-full blur-3xl animate-pulse"></div>
				<div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-purple-500/20 to-orange-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
				<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-pink-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
			</div>

			<div className="w-full max-w-md relative z-10">
				<div className="bg-white/10 backdrop-blur-md border border-purple-800/30 rounded-3xl p-8">
					<div className="text-center mb-8">
						<div className="flex justify-center mb-4">
							<div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg transform rotate-12">
								<i className="ri-lock-line text-white text-2xl"></i>
							</div>
						</div>
						<h1 className="text-3xl font-bold text-white mb-2">Update Password</h1>
						<p className="text-gray-300">Enter your new password below.</p>
					</div>

					<form onSubmit={onSubmit} className="space-y-6">
						<div>
							<label htmlFor="newPassword" className="block text-sm font-medium text-gray-300 mb-2">
								New Password
							</label>
							<input
								type="password"
								id="newPassword"
								name="newPassword"
								value={newPassword}
								onChange={(e) => setNewPassword(e.target.value)}
								className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20 transition-all"
								placeholder="Enter new password"
								required
							/>
						</div>
						<div>
							<label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-2">
								Confirm Password
							</label>
							<input
								type="password"
								id="confirmPassword"
								name="confirmPassword"
								value={confirmPassword}
								onChange={(e) => setConfirmPassword(e.target.value)}
								className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20 transition-all"
								placeholder="Confirm new password"
								required
							/>
						</div>
						{error && <p className="mt-1 text-sm text-red-500">{error}</p>}
						{success && <p className="mt-1 text-sm text-green-600">{success}</p>}
						<button type="submit" className="w-full bg-gradient-to-r from-orange-400 to-pink-500 text-white py-3 px-4 rounded-xl font-semibold hover:from-orange-500 hover:to-pink-600 transition-all shadow-lg" disabled={loading}>
							{loading ? 'Updating...' : 'Update Password'}
						</button>
					</form>

					<div className="mt-6 text-center">
						<p className="text-sm text-gray-300">
							Back to{' '}
							<a href="/auth/login" className="text-orange-400 hover:text-orange-300 font-medium">
								Sign in
							</a>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}

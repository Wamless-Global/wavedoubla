'use client';

import React, { useState } from 'react';
import { fetchWithAuth } from '@/lib/fetchWithAuth';

export default function ForgotPasswordPageContent() {
	const [loading, setLoading] = useState(false);
	const [email, setEmail] = useState('');
	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');

	function validateEmail(email: string) {
		return /\S+@\S+\.\S+/.test(email);
	}

	async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		setError('');
		setSuccess('');
		if (!email) {
			setError('Email is required.');
			return;
		}
		if (!validateEmail(email)) {
			setError('Please enter a valid email address.');
			return;
		}
		setLoading(true);
		try {
			const response = await fetchWithAuth('/api/auth/request-password-reset', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ email }),
			});
			const data = await response.json();
			if (response.ok) {
				setSuccess(data.message || 'Password reset link sent to your email.');
			} else {
				setError(data.message || 'Failed to send password reset link.');
			}
		} catch (err) {
			setError('An error occurred. Please try again.');
		} finally {
			setLoading(false);
		}
	}

	return (
		<div className="min-h-screen bg-gray-900 py-20 px-6 relative overflow-hidden">
			{/* Animated Background Elements */}
			<div className="absolute inset-0 overflow-hidden">
				<div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse"></div>
				<div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-orange-500/20 to-yellow-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
				<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
			</div>

			<div className="container mx-auto max-w-md relative z-10">
				<div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-purple-500/30 shadow-2xl p-8">
					<div className="text-center mb-8">
						<div className="flex justify-center mb-4">
							<div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-pink-500 rounded-3xl flex items-center justify-center shadow-lg transform rotate-12">
								<i className="ri-mail-line text-white text-2xl"></i>
							</div>
						</div>
						<h1 className="text-3xl font-bold text-white mb-2">Forgot Password</h1>
						<p className="text-gray-300">Enter your email to receive a password reset link.</p>
					</div>

					<form onSubmit={onSubmit} className="space-y-6">
						<div>
							<label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
								Email Address
							</label>
							<input
								type="email"
								id="email"
								name="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								className="w-full px-3 py-2 bg-white/5 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-all"
								placeholder="Enter your email"
								required
							/>
							{error && <p className="mt-1 text-sm text-red-500">{error}</p>}
							{success && <p className="mt-1 text-sm text-green-600">{success}</p>}
						</div>
						<button type="submit" className="w-full bg-gradient-to-r from-orange-400 to-pink-500 text-white py-3 px-4 rounded-xl font-semibold hover:from-orange-500 hover:to-pink-600 transition-all shadow-lg" disabled={loading}>
							{loading ? 'Sending...' : 'Send Reset Link'}
						</button>
					</form>

					<div className="mt-6 text-center">
						<p className="text-sm text-gray-300">
							Remember your password?{' '}
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

'use client';

import { useState, ChangeEvent, FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { fetchWithAuth } from '@/lib/fetchWithAuth';
import { clearLoggedInAsUser, handleFetchMessage } from '@/lib/helpers';
import nProgress from 'nprogress';
import { toast } from 'sonner';
import { useRouter, useSearchParams } from 'next/navigation';
import { AuthenticatedUser } from '@/types';
import { logger } from '@/lib/logger';
import { CustomLink } from '@/components/CustomLink';
import { setCurrentUser } from '@/lib/userUtils';

type FormData = {
	email: string;
	password: string;
	rememberMe: boolean;
};

type Errors = {
	email?: string;
	password?: string;
};

export default function LoginPageContent() {
	const [formData, setFormData] = useState<FormData>({
		email: '',
		password: '',
		rememberMe: false,
	});
	const [showPassword, setShowPassword] = useState(false);
	const [errors, setErrors] = useState<Errors>({});
	const router = useRouter();
	const searchParams = useSearchParams();

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value, type, checked } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: type === 'checkbox' ? checked : value,
		}));
	};

	const validateForm = () => {
		const newErrors: Errors = {};

		if (!formData.email.trim()) {
			newErrors.email = 'Email is required';
		} else if (!/\S+@\S+\.\S+/.test(formData.email)) {
			newErrors.email = 'Email is invalid';
		}

		if (!formData.password) {
			newErrors.password = 'Password is required';
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (validateForm()) {
			const toastId = toast.info('Logging you in...');
			try {
				const response = await fetchWithAuth(`/api/auth/login`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({ email: formData.email, password: formData.password }),
				});

				const responseData = await response.json();

				if (!response.ok) {
					const errorMessage = responseData.message || `Login API failed: ${response.statusText || 'Unknown error'}`;
					logger.error('AuthContext Login Error:', errorMessage, responseData);
					throw new Error(errorMessage);
				}

				if (responseData.status === 'success' && responseData.data?.user) {
					const authenticatedUser = responseData.data.user as AuthenticatedUser;

					if (typeof window !== 'undefined' && responseData.data.currency) {
						localStorage.setItem('currency', JSON.stringify(responseData.data.currency));
					}

					setCurrentUser(responseData.data.user);

					if (typeof window !== 'undefined' && responseData.data.settings) {
						localStorage.setItem('settings', JSON.stringify(responseData.data.settings));
					}

					clearLoggedInAsUser();

					const redirectTo = searchParams.get('redirect_to');
					let destination = '/user';

					if (redirectTo && redirectTo.startsWith('/')) {
						destination = redirectTo;
						toast.success(`Redirecting you shortly...`, { id: toastId });
					} else {
						if (authenticatedUser.roles && authenticatedUser.roles.includes('admin')) {
							destination = '/admin';
						} else if (authenticatedUser.roles && authenticatedUser.roles.includes('user')) {
							destination = '/user';
						}
						toast.success(`Redirecting to your dashboard...`, { id: toastId });
					}
					router.replace(destination);
				} else {
					logger.error('AuthContext Login Error: Unexpected success response format', responseData);
					throw new Error('Login failed: Unexpected response from server.');
				}
			} catch (err) {
				const errorMessage = handleFetchMessage(err);

				if (errorMessage.includes('Please verify your email address before logging in')) {
					nProgress.start();
					router.push('/auth/verify-email?email=' + formData.email);
				}

				toast.error(errorMessage, { id: toastId });
			}
		}
	};

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
					{/* Header */}
					<div className="text-center mb-8">
						<div className="flex justify-center mb-4">
							<div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-pink-500 rounded-3xl flex items-center justify-center shadow-lg transform rotate-12">
								<i className="ri-user-3-fill text-white text-2xl"></i>
							</div>
						</div>
						<h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
						<p className="text-gray-300">Sign in to your Wavedoubla account</p>
					</div>

					{/* Login Form */}
					<form onSubmit={handleSubmit} className="space-y-6">
						{/* Email Field */}
						<div>
							<label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
								Email Address
							</label>
							<div className="relative">
								<div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
									<i className="ri-mail-line text-gray-400"></i>
								</div>
								<input
									type="email"
									id="email"
									name="email"
									value={formData.email}
									onChange={handleInputChange}
									required
									className="w-full pl-12 pr-4 py-3 bg-white/5 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-all"
									placeholder="Enter your email address"
								/>
							</div>
						</div>

						{/* Password Field */}
						<div>
							<label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
								Password
							</label>
							<div className="relative">
								<div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
									<i className="ri-lock-line text-gray-400"></i>
								</div>
								<input
									type={showPassword ? 'text' : 'password'}
									id="password"
									name="password"
									value={formData.password}
									onChange={handleInputChange}
									required
									className="w-full pl-12 pr-12 py-3 bg-white/5 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-all"
									placeholder="Enter your password"
								/>
								<button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-white transition-colors cursor-pointer">
									<i className={showPassword ? 'ri-eye-off-line' : 'ri-eye-line'}></i>
								</button>
							</div>
						</div>

						{/* Remember Me & Forgot Password */}
						<div className="flex items-center justify-between">
							<label className="flex items-center cursor-pointer">
								<input type="checkbox" name="rememberMe" checked={formData.rememberMe} onChange={handleInputChange} className="w-4 h-4 text-orange-400 bg-transparent border-gray-600 rounded focus:ring-orange-400 focus:ring-2" />
								<span className="ml-2 text-sm text-gray-300">Remember me</span>
							</label>
							<CustomLink href="/auth/forgot-password" className="text-sm text-orange-400 hover:text-orange-300 transition-colors cursor-pointer">
								Forgot password?
							</CustomLink>
						</div>

						{/* Sign In Button */}
						<button type="submit" className="w-full bg-gradient-to-r from-orange-400 to-pink-500 text-white py-3 px-6 rounded-xl font-semibold hover:from-orange-500 hover:to-pink-600 transition-all transform hover:scale-[1.02] cursor-pointer whitespace-nowrap shadow-lg hover:shadow-xl">
							Sign In
						</button>

						{/* Sign Up CustomLink */}
						<div className="text-center">
							<p className="text-gray-300">
								Don't have an account?{' '}
								<CustomLink href="/auth/signup" className="text-orange-400 hover:text-orange-300 font-medium transition-colors cursor-pointer">
									Sign up
								</CustomLink>
							</p>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}

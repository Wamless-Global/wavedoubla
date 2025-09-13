'use client';

import { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { isValidPhoneNumber, CountryCode } from 'libphonenumber-js';
import { Button } from '@/components/ui/button';
import { fetchWithAuth } from '@/lib/fetchWithAuth';
import { handleFetchMessage } from '@/lib/helpers';
import { logger } from '@/lib/logger';
import nProgress from 'nprogress';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { Country, SignupPageContentProps } from '@/types';
import { CustomLink } from '@/components/CustomLink';

type FormData = {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	confirmPassword: string;
	phone: string;
	agreeTerms: boolean;
	momo_number: string;
	momo_name: string;
	momo_provider: string;
};

type Errors = {
	firstName?: string;
	lastName?: string;
	email?: string;
	password?: string;
	confirmPassword?: string;
	phone?: string;
	agreeTerms?: string;
	country?: string;
	momo_number?: string;
	momo_name?: string;
	momo_provider?: string;
};

export default function SignupPageContent({ referralData, countries }: SignupPageContentProps & { countries: { status: string; countries: Country[] } }) {
	const [formData, setFormData] = useState<FormData>({
		firstName: '',
		lastName: '',
		email: '',
		password: '',
		confirmPassword: '',
		phone: '',
		agreeTerms: false,
		momo_number: '',
		momo_name: '',
		momo_provider: '',
	});
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [errors, setErrors] = useState<Errors>({});
	const [selectedCountry, setSelectedCountry] = useState<string>('');
	const router = useRouter();

	// Referral logic
	const referralActiveDefault = !!(referralData && referralData.status === 'success' && referralData.data?.name);
	const [referralActive, setReferralActive] = useState(referralActiveDefault);
	const [referralId, setReferralId] = useState<string | null>(referralActiveDefault ? referralData?.data?.referral_id || null : null);
	const [referralName, setReferralName] = useState(referralActiveDefault && referralData?.data?.name ? referralData.data.name : '');

	// Keep referral state in sync with referralData
	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(() => {
		if (referralData && referralData.status === 'success' && referralData.data?.name) {
			setReferralActive(true);
			setReferralId(referralData.data.referral_id || null);
			setReferralName(referralData.data.name);
		} else {
			setReferralActive(false);
			setReferralId(null);
			setReferralName('');
		}
	}, [referralData]);

	const handleRemoveReferral = () => {
		setReferralActive(false);
		setReferralId(null);
		setReferralName('');
	};

	const handleRestoreReferral = () => {
		if (referralData && referralData.status === 'success' && referralData.data?.name) {
			setReferralActive(true);
			setReferralId(referralData.data.referral_id || null);
			setReferralName(referralData.data.name);
		}
	};

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value, type, checked } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: type === 'checkbox' ? checked : value,
		}));
	};

	const handleCountryChange = (e: ChangeEvent<HTMLSelectElement>) => {
		setSelectedCountry(e.target.value);
	};

	const validateForm = () => {
		const newErrors: Errors = {};

		if (!formData.firstName.trim()) {
			newErrors.firstName = 'First name is required';
		}

		if (!formData.lastName.trim()) {
			newErrors.lastName = 'Last name is required';
		}

		if (!formData.email.trim()) {
			newErrors.email = 'Email is required';
		} else if (!/\S+@\S+\.\S+/.test(formData.email)) {
			newErrors.email = 'Email is invalid';
		}

		if (!formData.phone.trim()) {
			newErrors.phone = 'Phone number is required';
		} else {
			try {
				let countryCode: CountryCode = 'LR'; // Default to Liberia
				if (selectedCountry === 'decaa447-5a78-42e1-9d4a-af500cf59689') countryCode = 'LR';
				let phone = formData.phone.trim();
				// If phone does not start with +, try to convert to international format
				if (!phone.startsWith('+')) {
					// Remove leading zero if present
					if (phone.startsWith('0')) {
						phone = phone.substring(1);
					}
					// Prepend country calling code for Liberia (+231)
					if (countryCode === 'LR') {
						phone = '+231' + phone;
					}
					// Add more country mappings here if needed
				}
				if (!isValidPhoneNumber(phone)) {
					newErrors.phone = 'Phone number is invalid';
				}
			} catch {
				newErrors.phone = 'Phone number is invalid';
			}
		}

		if (!formData.password) {
			newErrors.password = 'Password is required';
		} else if (formData.password.length < 8) {
			newErrors.password = 'Password must be at least 8 characters';
		}

		if (formData.password !== formData.confirmPassword) {
			newErrors.confirmPassword = 'Passwords do not match';
		}

		if (!formData.agreeTerms) {
			newErrors.agreeTerms = 'You must agree to the terms';
		}

		if (!selectedCountry) {
			newErrors.country = 'Country is required';
		}

		if (!formData.momo_number.trim()) {
			newErrors.momo_number = 'Mobile Money number is required';
		}
		if (!formData.momo_name.trim()) {
			newErrors.momo_name = 'Mobile Money name is required';
		}
		if (!formData.momo_provider.trim()) {
			newErrors.momo_provider = 'Mobile Money provider is required';
		}

		setErrors(newErrors);
		logger.log(Object.keys(newErrors).length);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (validateForm()) {
			const toastId = toast.info('Creating your account...');

			try {
				logger.log({
					name: `${formData.firstName} ${formData.lastName}`,
					email: formData.email,
					phone: formData.phone,
					password: formData.password,
					confirmPassword: formData.confirmPassword,
					roles: ['user'],
					country: selectedCountry,
					referralId: referralActive && referralId ? referralId : undefined,
					momo_number: formData.momo_number,
					momo_name: formData.momo_name,
					momo_provider: formData.momo_provider,
				});
				const payload: any = {
					name: `${formData.firstName} ${formData.lastName}`,
					email: formData.email,
					phone: formData.phone,
					password: formData.password,
					confirmPassword: formData.confirmPassword,
					roles: ['user'],
					country: selectedCountry,
					momo_number: formData.momo_number,
					momo_name: formData.momo_name,
					momo_provider: formData.momo_provider,
				};
				if (referralActive && referralId) {
					payload.referralId = referralId;
				}
				const response = await fetchWithAuth(`/api/auth/register`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(payload),
				});

				const responseData = await response.json();

				if (!response.ok) {
					const errorMessage = handleFetchMessage(responseData || `Signup API failed: ${response.statusText || 'Unknown error'}`);
					logger.error('AuthContext Signup Error:', errorMessage, responseData);
					throw new Error(errorMessage);
				}

				nProgress.start();
				toast.success('Signup was successfull! Please login.', { id: toastId });
				router.push(`/auth/login`);
			} catch (err) {
				const errorMessage = handleFetchMessage(err);
				toast.error(errorMessage, { id: toastId });
				throw err;
			}
		}
	};

	return (
		<div className="min-h-screen bg-gray-900 flex items-center justify-center px-6 py-12 relative overflow-hidden">
			<div className="absolute inset-0 overflow-hidden">
				<div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-orange-400/20 to-pink-500/20 rounded-full blur-3xl animate-pulse"></div>
				<div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-purple-500/20 to-orange-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
				<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-pink-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
			</div>

			<div className="w-full max-w-md relative z-10">
				<div className="bg-white/10 backdrop-blur-md border border-purple-800/30 rounded-3xl p-4 md:p-8 shadow-2xl">
					<div className="text-center mb-8">
						<div className="flex justify-center mb-4">
							<div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg transform rotate-12">
								<i className="ri-heart-3-fill text-white text-2xl"></i>
							</div>
						</div>
						<h1 className="text-3xl font-bold text-white mb-2">Join Wavedoubla</h1>
						<p className="text-gray-300">Create your account and start your financial journey</p>
					</div>

					{/* Referral display */}
					{referralData && referralData.status === 'success' && (
						<div className="space-y-2 mb-4">
							<label htmlFor="referral-name" className="block text-sm font-medium text-gray-700">
								Referred by
							</label>
							<div className="relative flex items-center">
								<i className="ri-user-line absolute left-3 h-5 w-5 text-gray-700" />
								<input id="referral-name" type="text" value={referralName} disabled readOnly className="w-full px-3 py-2 border rounded-md pl-10 cursor-not-allowed text-gray-500 bg-gray-100" />
							</div>
						</div>
					)}

					<form onSubmit={handleSubmit} className="space-y-6">
						<div className="grid grid-cols-2 gap-4">
							<div>
								<label className="block text-gray-300 text-sm font-medium mb-2">First Name</label>
								<input
									type="text"
									name="firstName"
									value={formData.firstName}
									onChange={handleInputChange}
									className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20 transition-all"
									placeholder="Enter first name"
									required
								/>
								{errors.firstName && <p className="mt-1 text-sm text-red-500">{errors.firstName}</p>}
							</div>
							<div>
								<label className="block text-gray-300 text-sm font-medium mb-2">Last Name</label>
								<input
									type="text"
									name="lastName"
									value={formData.lastName}
									onChange={handleInputChange}
									className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20 transition-all"
									placeholder="Enter last name"
									required
								/>
								{errors.lastName && <p className="mt-1 text-sm text-red-500">{errors.lastName}</p>}
							</div>
						</div>

						<div>
							<label className="block text-gray-300 text-sm font-medium mb-2">Email Address</label>
							<input
								type="email"
								name="email"
								value={formData.email}
								onChange={handleInputChange}
								className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20 transition-all"
								placeholder="Enter your email"
								required
							/>
							{errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
						</div>

						<div>
							<label className="block text-gray-300 text-sm font-medium mb-2">Country</label>
							<select
								id="country"
								name="country"
								value={selectedCountry}
								onChange={handleCountryChange}
								className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20 transition-all"
							>
								<option value="">Select country</option>
								<option value="decaa447-5a78-42e1-9d4a-af500cf59689">Liberia</option>
							</select>
							{errors.country && <p className="mt-1 text-sm text-red-500">{errors.country}</p>}
						</div>

						<div>
							<label className="block text-gray-300 text-sm font-medium mb-2">Phone Number</label>
							<input
								type="tel"
								name="phone"
								value={formData.phone}
								onChange={handleInputChange}
								className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20 transition-all"
								placeholder="Enter your phone number"
								required
							/>
							{errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone}</p>}
						</div>

						<div>
							<label className="block text-gray-300 text-sm font-medium mb-2">Mobile Money Number</label>
							<input
								type="text"
								name="momo_number"
								value={formData.momo_number}
								onChange={handleInputChange}
								className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20 transition-all"
								placeholder="Enter your mobile money number"
							/>
							{errors.momo_number && <p className="mt-1 text-sm text-red-500">{errors.momo_number}</p>}
						</div>

						<div>
							<label className="block text-gray-300 text-sm font-medium mb-2">Mobile Money Name</label>
							<input
								type="text"
								name="momo_name"
								value={formData.momo_name}
								onChange={handleInputChange}
								className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20 transition-all"
								placeholder="Enter your mobile money name"
							/>
							{errors.momo_name && <p className="mt-1 text-sm text-red-500">{errors.momo_name}</p>}
						</div>

						<div>
							<label className="block text-gray-300 text-sm font-medium mb-2">Mobile Money Provider</label>
							<input
								type="text"
								name="momo_provider"
								value={formData.momo_provider}
								onChange={handleInputChange}
								className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20 transition-all"
								placeholder="Enter your mobile money provider"
							/>
							{errors.momo_provider && <p className="mt-1 text-sm text-red-500">{errors.momo_provider}</p>}
						</div>

						<div>
							<label className="block text-gray-300 text-sm font-medium mb-2">Password</label>
							<div className="relative">
								<input
									type={showPassword ? 'text' : 'password'}
									name="password"
									value={formData.password}
									onChange={handleInputChange}
									className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20 transition-all pr-12"
									placeholder="Create a strong password"
									required
								/>
								<button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-orange-400 transition-colors cursor-pointer">
									<i className={`${showPassword ? 'ri-eye-off-line' : 'ri-eye-line'} text-lg`}></i>
								</button>
							</div>
						</div>

						<div>
							<label className="block text-gray-300 text-sm font-medium mb-2">Confirm Password</label>
							<div className="relative">
								<input
									type={showConfirmPassword ? 'text' : 'password'}
									name="confirmPassword"
									value={formData.confirmPassword}
									onChange={handleInputChange}
									className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20 transition-all pr-12"
									placeholder="Confirm your password"
									required
								/>
								<button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-orange-400 transition-colors cursor-pointer">
									<i className={`${showConfirmPassword ? 'ri-eye-off-line' : 'ri-eye-line'} text-lg`}></i>
								</button>
							</div>
						</div>

						<div className="flex items-start space-x-3">
							<input type="checkbox" id="terms" name="agreeTerms" checked={formData.agreeTerms} onChange={handleInputChange} className="mt-1 w-5 h-5 text-orange-400 bg-gray-800 border-gray-600 rounded focus:ring-orange-400 focus:ring-2" required />
							<label htmlFor="terms" className="text-sm text-gray-300">
								I agree to the{' '}
								<CustomLink href="/terms" className="text-orange-400 hover:text-orange-300 cursor-pointer">
									Terms of Service
								</CustomLink>{' '}
								and{' '}
								<CustomLink href="/privacy" className="text-orange-400 hover:text-orange-300 cursor-pointer">
									Privacy Policy
								</CustomLink>
							</label>
						</div>

						<button type="submit" className="w-full bg-gradient-to-r from-orange-400 to-pink-500 text-white py-3 rounded-xl font-semibold hover:from-orange-500 hover:to-pink-600 transition-all cursor-pointer whitespace-nowrap shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
							Create Account
						</button>
					</form>

					<div className="mt-8 text-center">
						<p className="text-gray-300">
							Already have an account?{' '}
							<CustomLink href="/login" className="text-orange-400 hover:text-orange-300 font-medium transition-colors cursor-pointer">
								Sign In
							</CustomLink>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}

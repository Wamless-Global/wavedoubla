'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { getPlatformName, handleFetchMessage } from '@/lib/helpers';
import { CustomLink } from '@/components/CustomLink';
import { Skeleton } from '@/components/Skeleton';
import Logo from '@/components/Logo';
import { resendVerificationEmail } from '@/lib/auth';

function parseFragmentParams() {
	if (typeof window === 'undefined') return {};
	const hash = window.location.hash.substring(1);
	return Object.fromEntries(new URLSearchParams(hash));
}

function ProjectSkeletonLoader() {
	return (
		<div className="auth-page flex flex-col items-center justify-center py-20 space-y-4">
			<Logo alt={`${getPlatformName()} Logo`} size="lg" variant="dark" />
			<div className="w-full max-w-md text-center space-y-2 mt-5">
				<Skeleton className="mb-2 h-8 w-full md:w-96 mx-auto" />
				<Skeleton className="mb-2 h-8 w-full md:w-98 mx-auto" />
				<Skeleton className="mb-8 h-4 w-64 mx-auto" />
			</div>
		</div>
	);
}

export default function VerifyEmailStatusPageContent() {
	const router = useRouter();
	const searchParams = useSearchParams();

	const [pageStatus, setPageStatus] = useState<'loading' | 'success' | 'expired' | 'error'>('loading');
	const [statusMessage, setStatusMessage] = useState('');
	const [emailForResend, setEmailForResend] = useState('');
	const [isResending, setIsResending] = useState(false);
	const [showContent, setShowContent] = useState(false);

	useEffect(() => {
		const params = Object.fromEntries(searchParams.entries());
		let error = params.error;
		let errorDesc = params.error_description;
		let errorCode = params.error_code;

		if (!error && typeof window !== 'undefined' && window.location.hash) {
			const fragParams = parseFragmentParams();
			error = fragParams.error;
			errorDesc = fragParams.error_description;
			errorCode = fragParams.error_code;
			if (error || errorDesc || errorCode) {
				const query = new URLSearchParams(fragParams).toString();
				router.replace(`${window.location.pathname}?${query}`);
			}
		}

		if (error) {
			const desc = errorDesc || 'An unknown error occurred during verification.';
			if (desc.toLowerCase().includes('expired') || error === 'access_denied' || errorCode === 'otp_expired' || desc.toLowerCase().includes('invalid')) {
				setPageStatus('expired');
				setStatusMessage(desc);
				toast.error(desc);
			} else {
				setPageStatus('error');
				setStatusMessage(desc);
				toast.error(desc);
			}
		} else {
			setPageStatus('success');
			setStatusMessage('Your email address has been successfully verified. You can now log in.');
			toast.success('Email verified successfully!');
			setTimeout(() => router.replace('/auth/login'), 4000);
		}
		// Prevent content flash
		setTimeout(() => setShowContent(true), 400);
		// eslint-disable-next-line
	}, [searchParams, router]);

	const title = pageStatus === 'success' ? 'Email Verified Successfully!' : pageStatus === 'expired' ? 'Verification Link Expired' : pageStatus === 'error' ? 'Email Verification Failed' : 'Email Verification Status';

	const handleResendSubmit = async (event: React.FormEvent) => {
		event.preventDefault();
		if (!emailForResend) {
			toast.error('Please enter your email address.');
			return;
		}
		setIsResending(true);
		setStatusMessage(`Attempting to resend verification email to ${emailForResend}...`);

		try {
			const result = await resendVerificationEmail(emailForResend);
			if (result.success) {
				toast.success(result.message || `Verification email resent to ${emailForResend}.`);
				setStatusMessage(result.message || `Verification email resent to ${emailForResend}. Please check your inbox.`);
			} else {
				toast.error(result.message || 'Failed to resend verification email.');
				setStatusMessage(result.message || 'Failed to resend verification email. Please try again or contact support.');
			}
		} catch (err) {
			const errorMessage = handleFetchMessage(err);
			toast.error(errorMessage);
			setStatusMessage(errorMessage);
		} finally {
			setIsResending(false);
		}
	};

	if (!showContent) {
		return <ProjectSkeletonLoader />;
	}

	if (pageStatus === 'loading') {
		return <ProjectSkeletonLoader />;
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
						<h1 className="text-3xl font-bold text-white mb-2">Email Status</h1>
						<p className="text-gray-300">{statusMessage}</p>
					</div>

					{pageStatus === 'error' && (
						<Button onClick={() => router.push('/auth/login')} className="w-full bg-gradient-to-r from-orange-400 to-pink-500 text-white py-3 px-4 rounded-xl font-semibold hover:from-orange-500 hover:to-pink-600 transition-all">
							Back to Login
						</Button>
					)}
					{pageStatus === 'expired' && (
						<Button onClick={handleResendSubmit} className="w-full bg-gradient-to-r from-orange-400 to-pink-500 text-white py-3 px-4 rounded-xl font-semibold hover:from-orange-500 hover:to-pink-600 transition-all" disabled={isResending}>
							{isResending ? 'Resending...' : 'Resend Verification Email'}
						</Button>
					)}

					<div className="mt-6 text-center">
						<p className="text-sm text-gray-300">
							Back to{' '}
							<CustomLink href="/auth/login" className="text-orange-400 hover:text-orange-300 font-medium">
								Sign in
							</CustomLink>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}

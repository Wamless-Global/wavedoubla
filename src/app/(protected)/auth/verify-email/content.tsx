'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { handleFetchMessage } from '@/lib/helpers';
import nProgress from 'nprogress';
import { CustomLink } from '@/components/CustomLink';
import { resendVerificationEmail } from '@/lib/auth';

export default function VerifyEmailContent({ email, initialStatus }: { email?: string; initialStatus: { status: string; message: string } }) {
	const router = useRouter();
	const [statusMessage, setStatusMessage] = useState(initialStatus.message || '');
	const [isResending, setIsResending] = useState(false);
	const [allowResend, setAllowResend] = useState(initialStatus.status === 'not_verified');

	useEffect(() => {
		if (initialStatus.status === 'verified') {
			nProgress.start();
			toast.success(initialStatus.message || 'Email is verified.');
			setTimeout(() => router.push('/auth/login'), 4000);
		} else if (initialStatus.status === 'not_found' || initialStatus.status === 'error') {
			nProgress.start();
			toast.error(initialStatus.message || 'Email address not found.');
			setTimeout(() => router.push('/auth/login'), 4000);
		}
	}, [initialStatus, router]);

	const handleResendEmail = async () => {
		if (!email) {
			toast.error('Could not determine email for resending verification.');
			return;
		}
		setIsResending(true);
		setStatusMessage(`Resending verification email to ${email}...`);
		try {
			const result = await resendVerificationEmail(email);
			if (result.success) {
				toast.success(result.message || 'Verification email resent successfully!');
				setStatusMessage(result.message || 'Verification email resent. Please check your inbox.');
				setAllowResend(false);
			} else {
				toast.error(result.message || 'Failed to resend verification email.');
				setStatusMessage(result.message || 'Failed to resend. Please try again or contact support.');
			}
		} catch (err) {
			const errorMessage = handleFetchMessage(err);
			toast.error(errorMessage);
			setStatusMessage(errorMessage);
		} finally {
			setIsResending(false);
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
					<div className="text-center mb-8">
						<div className="flex justify-center mb-4">
							<div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-pink-500 rounded-3xl flex items-center justify-center shadow-lg transform rotate-12">
								<i className="ri-mail-line text-white text-2xl"></i>
							</div>
						</div>
						<h1 className="text-3xl font-bold text-white mb-2">Verify Email</h1>
						<p className="text-gray-300">{statusMessage}</p>
					</div>

					{allowResend && (
						<Button onClick={handleResendEmail} className="w-full bg-gradient-to-r from-orange-400 to-pink-500 text-white py-3 px-4 rounded-xl font-semibold hover:from-orange-500 hover:to-pink-600 transition-all shadow-lg" disabled={isResending}>
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

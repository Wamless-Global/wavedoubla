'use client';

import { CustomLink } from '@/components/CustomLink';
import Footer from '@/components/Footer';
import Header from '@/components/Header';

export default function UnauthorizedPage() {
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
				{/* Lock Icon */}
				<div className="mb-8">
					<div className="w-32 h-32 bg-gradient-to-r from-orange-400 to-pink-500 rounded-full flex items-center justify-center mb-6 mx-auto">
						<i className="ri-lock-line text-white text-5xl"></i>
					</div>
					<div className="w-32 h-1 bg-gradient-to-r from-orange-400 to-pink-500 mx-auto rounded-full"></div>
				</div>

				{/* Error Message */}
				<div className="mb-12 max-w-2xl">
					<h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600 bg-clip-text text-transparent mb-6">Unauthorized Access</h1>
					<p className="text-xl text-gray-300 leading-relaxed mb-4">You do not have the necessary permissions to access this resource.</p>
					<p className="text-lg text-gray-400">Please contact your administrator or sign in with appropriate credentials.</p>
				</div>

				{/* Action Buttons */}
				<div className="flex flex-col sm:flex-row gap-4 mb-12">
					<CustomLink href="/login" className="group cursor-pointer">
						<button className="bg-gradient-to-r from-orange-400 to-pink-500 text-white px-8 py-4 rounded-full font-semibold hover:from-orange-500 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 whitespace-nowrap flex items-center space-x-2">
							<i className="ri-login-box-line text-lg"></i>
							<span>Sign In</span>
						</button>
					</CustomLink>

					<CustomLink href="/" className="cursor-pointer">
						<button className="bg-white/10 backdrop-blur-md border border-purple-400/30 text-white px-8 py-4 rounded-full font-semibold hover:bg-white/20 transition-all duration-300 cursor-pointer whitespace-nowrap flex items-center space-x-2 group">
							<i className="ri-home-line text-lg"></i>
							<span>Go Home</span>
						</button>
					</CustomLink>
				</div>

				{/* Permission Info */}
				<div className="bg-white/5 backdrop-blur-md border border-purple-400/30 rounded-3xl p-8 max-w-2xl mb-8">
					<h3 className="text-xl font-semibold text-white mb-4 flex items-center justify-center space-x-2">
						<i className="ri-shield-user-line text-orange-400"></i>
						<span>Access Requirements</span>
					</h3>
					<p className="text-gray-300 mb-6">This area requires special permissions. Here's what you can do:</p>

					<div className="space-y-4 text-left">
						<div className="flex items-center space-x-3">
							<i className="ri-check-line text-green-400 text-lg"></i>
							<span className="text-gray-300">Sign in with your authorized account</span>
						</div>
						<div className="flex items-center space-x-3">
							<i className="ri-check-line text-green-400 text-lg"></i>
							<span className="text-gray-300">Request access from your administrator</span>
						</div>
						<div className="flex items-center space-x-3">
							<i className="ri-check-line text-green-400 text-lg"></i>
							<span className="text-gray-300">Contact support if you believe this is an error</span>
						</div>
					</div>
				</div>

				{/* Contact Support */}
				<div className="bg-white/5 backdrop-blur-md border border-purple-400/30 rounded-3xl p-8 max-w-lg">
					<h3 className="text-xl font-semibold text-white mb-4 flex items-center justify-center space-x-2">
						<i className="ri-customer-service-2-line text-orange-400"></i>
						<span>Need Help?</span>
					</h3>
					<p className="text-gray-300 mb-6">If you believe you should have access to this area, please reach out to our support team.</p>
					<CustomLink href="/contact" className="cursor-pointer">
						<button className="bg-gradient-to-r from-purple-500 to-blue-600 text-white px-6 py-3 rounded-full font-medium hover:from-purple-600 hover:to-blue-700 transition-all duration-300 cursor-pointer whitespace-nowrap flex items-center space-x-2 mx-auto">
							<i className="ri-mail-line"></i>
							<span>Contact Support</span>
						</button>
					</CustomLink>
				</div>

				{/* Quick Access */}
				<div className="mt-16 w-full max-w-4xl">
					<h3 className="text-2xl font-semibold text-white mb-8 text-center">Quick Access</h3>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
						<CustomLink href="/login" className="group cursor-pointer">
							<div className="bg-white/5 backdrop-blur-md border border-purple-400/30 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 hover:scale-105">
								<div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-pink-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
									<i className="ri-login-box-line text-white text-xl"></i>
								</div>
								<h4 className="text-lg font-semibold text-white mb-2">Sign In</h4>
								<p className="text-gray-300 text-sm">Access your account with proper credentials</p>
							</div>
						</CustomLink>

						<CustomLink href="/signup" className="group cursor-pointer">
							<div className="bg-white/5 backdrop-blur-md border border-purple-400/30 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 hover:scale-105">
								<div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
									<i className="ri-user-add-line text-white text-xl"></i>
								</div>
								<h4 className="text-lg font-semibold text-white mb-2">Create Account</h4>
								<p className="text-gray-300 text-sm">Sign up for a new account with access</p>
							</div>
						</CustomLink>

						<CustomLink href="/contact" className="group cursor-pointer">
							<div className="bg-white/5 backdrop-blur-md border border-purple-400/30 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 hover:scale-105">
								<div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-orange-400 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
									<i className="ri-customer-service-line text-white text-xl"></i>
								</div>
								<h4 className="text-lg font-semibold text-white mb-2">Get Support</h4>
								<p className="text-gray-300 text-sm">Contact us for assistance with access issues</p>
							</div>
						</CustomLink>
					</div>
				</div>
			</main>

			<Footer />
		</div>
	);
}

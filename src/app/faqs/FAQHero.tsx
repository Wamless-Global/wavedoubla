'use client';

export default function FAQHero() {
	return (
		<section className="relative min-h-[80vh] bg-gray-900 flex items-center justify-center overflow-hidden py-20">
			<div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800/50 to-gray-900"></div>

			<div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
			<div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
			<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>

			<div className="relative z-10 container mx-auto px-6 text-center">
				<div className="max-w-5xl mx-auto">
					<div className="flex items-center justify-center mb-8">
						<div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center shadow-2xl transform rotate-12">
							<i className="ri-question-answer-fill text-white text-3xl"></i>
						</div>
					</div>

					<h1 className="text-6xl md:text-8xl font-bold text-white mb-8 leading-tight">FAQs</h1>

					<p className="text-xl md:text-2xl text-gray-300 mb-16 leading-relaxed max-w-4xl mx-auto">Find answers to commonly asked questions about Wavedoubla, our platform, and how to get started on your financial growth journey.</p>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
						<div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 hover:bg-white/15 transition-all hover:scale-105 transform">
							<div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 mx-auto">
								<i className="ri-user-heart-fill text-white text-2xl"></i>
							</div>
							<h3 className="text-white font-bold text-xl mb-4">Getting Started</h3>
							<p className="text-gray-300">Learn how to join our community and begin your journey</p>
						</div>

						<div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 hover:bg-white/15 transition-all hover:scale-105 transform">
							<div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 mx-auto">
								<i className="ri-shield-check-fill text-white text-2xl"></i>
							</div>
							<h3 className="text-white font-bold text-xl mb-4">Security & Safety</h3>
							<p className="text-gray-300">Your security and privacy are our top priorities</p>
						</div>

						<div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 hover:bg-white/15 transition-all hover:scale-105 transform">
							<div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 mx-auto">
								<i className="ri-customer-service-2-fill text-white text-2xl"></i>
							</div>
							<h3 className="text-white font-bold text-xl mb-4">Support</h3>
							<p className="text-gray-300">Get help and support whenever you need it</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

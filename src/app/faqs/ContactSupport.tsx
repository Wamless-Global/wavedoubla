'use client';

import Link from 'next/link';

export default function ContactSupport() {
	return (
		<section className="py-24 bg-gradient-to-br from-gray-900 via-gray-800/50 to-gray-900 relative">
			<div className="absolute top-20 right-20 w-80 h-80 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
			<div className="absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>

			<div className="relative z-10 container mx-auto px-6">
				<div className="max-w-6xl mx-auto text-center">
					<div className="mb-16">
						<h2 className="text-5xl md:text-6xl font-bold text-white mb-8">Still Need Help?</h2>
						<p className="text-xl md:text-2xl text-gray-300 leading-relaxed max-w-4xl mx-auto">Can't find what you're looking for? Our support team is here to help you with any questions about Wavedoubla and your financial journey.</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
						<div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-10 hover:bg-white/15 transition-all group hover:scale-105 transform">
							<div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center mb-8 mx-auto group-hover:scale-110 transition-transform shadow-2xl">
								<i className="ri-chat-3-fill text-white text-3xl"></i>
							</div>
							<h3 className="text-white font-bold text-2xl mb-6">Live Chat</h3>
							<p className="text-gray-300 mb-8 text-lg leading-relaxed">Get instant help from our support team. Available 24/7 for urgent questions and guidance.</p>
							<button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-10 py-4 rounded-full font-bold hover:from-blue-600 hover:to-purple-700 transition-all cursor-pointer whitespace-nowrap shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 text-lg">
								Start Chat
							</button>
						</div>

						<div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-10 hover:bg-white/15 transition-all group hover:scale-105 transform">
							<div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center mb-8 mx-auto group-hover:scale-110 transition-transform shadow-2xl">
								<i className="ri-mail-fill text-white text-3xl"></i>
							</div>
							<h3 className="text-white font-bold text-2xl mb-6">Email Support</h3>
							<p className="text-gray-300 mb-8 text-lg leading-relaxed">Send us detailed questions and we'll respond within 24 hours with comprehensive answers.</p>
							<a
								href="mailto:support@Wavedoubla.com"
								className="inline-block bg-gradient-to-r from-blue-500 to-purple-600 text-white px-10 py-4 rounded-full font-bold hover:from-blue-600 hover:to-purple-700 transition-all cursor-pointer whitespace-nowrap shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 text-lg"
							>
								Send Email
							</a>
						</div>

						<div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-10 hover:bg-white/15 transition-all group hover:scale-105 transform">
							<div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center mb-8 mx-auto group-hover:scale-110 transition-transform shadow-2xl">
								<i className="ri-phone-fill text-white text-3xl"></i>
							</div>
							<h3 className="text-white font-bold text-2xl mb-6">Phone Support</h3>
							<p className="text-gray-300 mb-8 text-lg leading-relaxed">Speak directly with our experts for complex questions and personalized guidance.</p>
							<a
								href="tel:+2338066060653"
								className="inline-block bg-gradient-to-r from-blue-500 to-purple-600 text-white px-10 py-4 rounded-full font-bold hover:from-blue-600 hover:to-purple-700 transition-all cursor-pointer whitespace-nowrap shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 text-lg"
							>
								Call Now
							</a>
						</div>
					</div>

					<div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-12 hover:bg-white/15 transition-all">
						<div className="flex items-center justify-center mb-8">
							<div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center shadow-2xl">
								<i className="ri-book-open-fill text-white text-3xl"></i>
							</div>
						</div>
						<h3 className="text-white font-bold text-3xl mb-6">Knowledge Base</h3>
						<p className="text-gray-300 mb-10 text-xl leading-relaxed max-w-3xl mx-auto">Explore our comprehensive guides, tutorials, and resources to learn more about investing, community features, and platform functionality.</p>
						<Link href="/resources" className="inline-block bg-white/20 text-white px-12 py-4 rounded-full font-bold border border-white/30 hover:bg-white/30 transition-all cursor-pointer whitespace-nowrap text-lg hover:scale-105 transform">
							Browse Resources
						</Link>
					</div>
				</div>
			</div>
		</section>
	);
}

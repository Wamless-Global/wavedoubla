export default function ContactHero() {
	return (
		<section className="relative bg-gray-900 pt-20 pb-32 overflow-hidden">
			<div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-gray-900 to-orange-900/30"></div>
			<div className="absolute top-10 right-20 w-80 h-80 bg-gradient-to-r from-orange-400/20 to-pink-500/20 rounded-full blur-3xl animate-bounce"></div>
			<div className="absolute bottom-10 left-20 w-96 h-96 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse"></div>

			<div className="container mx-auto px-6 relative z-10">
				<div className="max-w-4xl mx-auto text-center">
					<div className="mb-8">
						<span className="inline-block px-6 py-3 bg-gradient-to-r from-orange-400/20 to-pink-500/20 rounded-full text-orange-400 font-semibold text-sm border border-orange-400/30 backdrop-blur-sm">Get In Touch</span>
					</div>

					<h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
						Contact <span className="bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent">Wavedoubla</span>
					</h1>

					<p className="text-xl text-gray-300 mb-12 leading-relaxed max-w-3xl mx-auto">Have questions about our community platform? Need support with donations or want to partner with us? We're here to help you make a positive impact together.</p>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
						<div className="bg-gray-800/50 backdrop-blur-sm border border-purple-800/30 rounded-2xl p-8 text-center hover:bg-gray-800/70 transition-all">
							<div className="w-16 h-16 bg-gradient-to-r from-orange-400 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
								<i className="ri-time-line text-white text-2xl"></i>
							</div>
							<h3 className="text-white font-bold text-lg mb-2">Quick Response</h3>
							<p className="text-gray-300">We respond to all inquiries within 24 hours</p>
						</div>

						<div className="bg-gray-800/50 backdrop-blur-sm border border-purple-800/30 rounded-2xl p-8 text-center hover:bg-gray-800/70 transition-all">
							<div className="w-16 h-16 bg-gradient-to-r from-orange-400 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
								<i className="ri-shield-check-line text-white text-2xl"></i>
							</div>
							<h3 className="text-white font-bold text-lg mb-2">Secure Platform</h3>
							<p className="text-gray-300">Your information is protected and confidential</p>
						</div>

						<div className="bg-gray-800/50 backdrop-blur-sm border border-purple-800/30 rounded-2xl p-8 text-center hover:bg-gray-800/70 transition-all">
							<div className="w-16 h-16 bg-gradient-to-r from-orange-400 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
								<i className="ri-global-line text-white text-2xl"></i>
							</div>
							<h3 className="text-white font-bold text-lg mb-2">Global Support</h3>
							<p className="text-gray-300">Supporting communities worldwide 24/7</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

export default function ContactInfo() {
	return (
		<section className="py-20">
			<div className="container mx-auto px-6">
				<div className="max-w-6xl mx-auto">
					<div className="text-center mb-16">
						<h2 className="text-4xl font-bold text-white mb-4">Other Ways to Reach Us</h2>
						<p className="text-gray-300 text-lg">Choose the contact method that works best for you</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
						<div className="bg-gray-800/50 backdrop-blur-sm border border-purple-800/30 rounded-2xl p-8 text-center hover:bg-gray-800/70 transition-all group">
							<div className="w-20 h-20 bg-gradient-to-r from-orange-400 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
								<i className="ri-phone-fill text-white text-3xl"></i>
							</div>
							<h3 className="text-white font-bold text-xl mb-4">Phone Support</h3>
							<p className="text-gray-300 mb-4">Speak directly with our support team</p>
							<div className="space-y-2">
								<p className="text-orange-400 font-semibold">+253 806 606 0653</p>
								<p className="text-gray-400 text-sm">Mon-Fri: 9AM-6PM EST</p>
							</div>
						</div>

						<div className="bg-gray-800/50 backdrop-blur-sm border border-purple-800/30 rounded-2xl p-8 text-center hover:bg-gray-800/70 transition-all group">
							<div className="w-20 h-20 bg-gradient-to-r from-orange-400 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
								<i className="ri-mail-fill text-white text-3xl"></i>
							</div>
							<h3 className="text-white font-bold text-xl mb-4">Email Support</h3>
							<p className="text-gray-300 mb-4">Send us a detailed message</p>
							<div className="space-y-2">
								<p className="text-orange-400 font-semibold">support@Wavedoubla.com</p>
								<p className="text-gray-400 text-sm">Response within 24 hours</p>
							</div>
						</div>

						<div className="bg-gray-800/50 backdrop-blur-sm border border-purple-800/30 rounded-2xl p-8 text-center hover:bg-gray-800/70 transition-all group">
							<div className="w-20 h-20 bg-gradient-to-r from-orange-400 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
								<i className="ri-chat-3-fill text-white text-3xl"></i>
							</div>
							<h3 className="text-white font-bold text-xl mb-4">Live Chat</h3>
							<p className="text-gray-300 mb-4">Get instant help online</p>
							<div className="space-y-2">
								<button className="text-orange-400 font-semibold hover:text-pink-400 transition-colors cursor-pointer">Start Chat Session</button>
								<p className="text-gray-400 text-sm">Available 24/7</p>
							</div>
						</div>
					</div>

					<div className="mt-16 bg-gradient-to-r from-orange-400/10 to-pink-500/10 border border-orange-400/20 rounded-2xl p-8">
						<div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
							<div>
								<h3 className="text-2xl font-bold text-white mb-4">Emergency Support</h3>
								<p className="text-gray-300 mb-6">For urgent donation or platform issues that require immediate attention, contact our emergency support line.</p>
								<div className="flex items-center space-x-4">
									<div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
										<i className="ri-alarm-warning-fill text-white text-xl"></i>
									</div>
									<div>
										<p className="text-red-400 font-semibold text-lg">Emergency: +253 806 606 0911</p>
										<p className="text-gray-400 text-sm">Available 24/7 for critical issues</p>
									</div>
								</div>
							</div>

							<div className="text-center">
								<img
									src="https://readdy.ai/api/search-image?query=Professional%20customer%20support%20team%20working%20together%20in%20modern%20office%20environment%20with%20headsets%20and%20computers%2C%20helping%20customers%2C%20warm%20lighting%2C%20professional%20atmosphere%2C%20diverse%20team%20members%2C%20friendly%20service&width=400&height=300&seq=support-team&orientation=landscape"
									alt="Customer Support Team"
									className="w-full h-48 object-cover object-top rounded-xl"
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

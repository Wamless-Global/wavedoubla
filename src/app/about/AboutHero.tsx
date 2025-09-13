'use client';

export default function AboutHero() {
	return (
		<section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900">
			<div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 to-gray-900/70"></div>

			<div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-br from-orange-400/30 to-pink-500/30 rounded-full blur-3xl opacity-40 animate-pulse"></div>
			<div className="absolute bottom-32 right-32 w-96 h-96 bg-gradient-to-br from-purple-500/20 to-pink-400/20 rounded-full blur-3xl opacity-30 animate-pulse delay-1000"></div>

			<div className="container mx-auto px-6 relative z-10">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
					<div className="text-left">
						<div className="inline-flex items-center bg-gray-800/50 backdrop-blur-sm border border-purple-800/30 rounded-full px-6 py-3 mb-8">
							<div className="w-2 h-2 bg-gradient-to-r from-orange-400 to-pink-500 rounded-full mr-3 animate-pulse"></div>
							<span className="text-gray-300 text-sm font-medium">About Wavedoubla</span>
						</div>

						<h1 className="text-5xl lg:text-7xl font-bold text-white mb-8 leading-tight">
							Empowering
							<span className="block bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent">Financial Freedom</span>
						</h1>

						<p className="text-xl text-gray-300 mb-8 leading-relaxed max-w-2xl">Wavedoubla is a revolutionary peer-to-peer financial empowerment platform that transforms how people achieve their financial goals through community collaboration and mutual support.</p>

						<div className="flex flex-col sm:flex-row gap-4">
							<button className="bg-gradient-to-r from-orange-400 to-pink-500 text-white px-8 py-4 rounded-full font-semibold hover:from-orange-500 hover:to-pink-600 transition-all cursor-pointer whitespace-nowrap shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center">
								<i className="ri-heart-3-fill mr-2"></i>
								Join Our Mission
							</button>
							<button className="border-2 border-gray-600 text-gray-300 px-8 py-4 rounded-full font-semibold hover:border-orange-400 hover:text-orange-400 transition-all cursor-pointer whitespace-nowrap flex items-center justify-center">
								<i className="ri-play-circle-line mr-2"></i>
								Watch Our Story
							</button>
						</div>
					</div>

					<div className="relative">
						<div className="relative z-10">
							<img
								src="https://readdy.ai/api/search-image?query=Professional%20diverse%20team%20of%20financial%20experts%20and%20community%20leaders%20working%20together%20in%20modern%20office%20environment%2C%20bright%20lighting%2C%20collaborative%20atmosphere%2C%20modern%20workspace%20with%20glass%20walls%20and%20computers%2C%20people%20of%20different%20ethnicities%20smiling%20and%20discussing%20financial%20strategies%2C%20professional%20business%20attire%2C%20high-tech%20office%20setting%20with%20charts%20and%20graphs%20on%20screens&width=600&height=700&seq=about-hero-team&orientation=portrait"
								alt="Wavedoubla Team"
								className="w-full h-[600px] object-cover object-top rounded-3xl shadow-2xl"
							/>
							<div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent rounded-3xl"></div>
						</div>

						<div className="absolute -bottom-8 -left-8 bg-gray-800/90 backdrop-blur-sm border border-purple-800/30 rounded-2xl p-6 shadow-2xl">
							<div className="flex items-center space-x-4">
								<div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-pink-500 rounded-2xl flex items-center justify-center">
									<i className="ri-team-fill text-white text-2xl"></i>
								</div>
								<div>
									<div className="text-2xl font-bold text-white">50K+</div>
									<div className="text-sm text-gray-400">Active Members</div>
								</div>
							</div>
						</div>

						<div className="absolute -top-8 -right-8 bg-gray-800/90 backdrop-blur-sm border border-purple-800/30 rounded-2xl p-6 shadow-2xl">
							<div className="flex items-center space-x-4">
								<div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-500 rounded-2xl flex items-center justify-center">
									<i className="ri-money-dollar-circle-fill text-white text-2xl"></i>
								</div>
								<div>
									<div className="text-2xl font-bold text-white">$2M+</div>
									<div className="text-sm text-gray-400">Funds Raised</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

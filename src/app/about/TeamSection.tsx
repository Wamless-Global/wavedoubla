'use client';

import { CustomLink } from '@/components/CustomLink';

export default function TeamSection() {
	const team = [
		{
			name: 'Marcus Johnson',
			role: 'Founder & CEO',
			bio: 'Visionary leader with 15+ years in fintech, passionate about democratizing financial opportunities for all.',
			image: 'https://readdy.ai/api/search-image?query=Professional%20African%20American%20businessman%20in%20his%2040s%2C%20confident%20smile%2C%20wearing%20dark%20blue%20business%20suit%2C%20modern%20office%20background%2C%20executive%20headshot%2C%20warm%20lighting%2C%20professional%20photography%20style%2C%20success-oriented%20appearance&width=400&height=500&seq=ceo-marcus&orientation=portrait',
			social: {
				linkedin: '#',
				twitter: '#',
			},
		},
		{
			name: 'Sarah Chen',
			role: 'Chief Technology Officer',
			bio: 'Tech innovator specializing in secure financial platforms and blockchain technology solutions.',
			image: 'https://readdy.ai/api/search-image?query=Professional%20Asian%20businesswoman%20in%20her%2030s%2C%20intelligent%20expression%2C%20wearing%20elegant%20black%20blazer%2C%20modern%20tech%20office%20environment%2C%20executive%20portrait%2C%20soft%20professional%20lighting%2C%20confident%20posture&width=400&height=500&seq=cto-sarah&orientation=portrait',
			social: {
				linkedin: '#',
				github: '#',
			},
		},
		{
			name: 'David Rodriguez',
			role: 'Head of Community',
			bio: 'Community building expert focused on creating meaningful connections and collaborative financial growth.',
			image: 'https://readdy.ai/api/search-image?query=Professional%20Hispanic%20businessman%20in%20his%2030s%2C%20friendly%20approachable%20smile%2C%20wearing%20light%20gray%20suit%2C%20collaborative%20office%20setting%2C%20team%20leadership%20portrait%2C%20natural%20lighting%2C%20community-focused%20appearance&width=400&height=500&seq=head-david&orientation=portrait',
			social: {
				linkedin: '#',
				instagram: '#',
			},
		},
		{
			name: 'Emily Thompson',
			role: 'Financial Strategist',
			bio: 'Financial planning specialist helping members navigate their path to financial independence and success.',
			image: 'https://readdy.ai/api/search-image?query=Professional%20Caucasian%20businesswoman%20in%20her%2030s%2C%20confident%20and%20knowledgeable%20expression%2C%20wearing%20navy%20blue%20business%20attire%2C%20financial%20office%20environment%2C%20strategic%20thinking%20pose%2C%20professional%20headshot%20photography&width=400&height=500&seq=strategist-emily&orientation=portrait',
			social: {
				linkedin: '#',
				twitter: '#',
			},
		},
	];

	return (
		<section className="py-20 bg-gray-900 relative overflow-hidden">
			<div className="absolute top-1/2 left-0 w-72 h-72 bg-gradient-to-br from-orange-400/10 to-pink-500/10 rounded-full blur-3xl"></div>
			<div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-purple-500/10 to-pink-400/10 rounded-full blur-3xl"></div>

			<div className="container mx-auto px-6 relative z-10">
				<div className="text-center mb-16">
					<div className="inline-flex items-center bg-gray-800/50 backdrop-blur-sm border border-purple-800/30 rounded-full px-6 py-3 mb-6">
						<div className="w-2 h-2 bg-gradient-to-r from-orange-400 to-pink-500 rounded-full mr-3 animate-pulse"></div>
						<span className="text-gray-300 text-sm font-medium">Meet Our Team</span>
					</div>
					<h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
						The Minds Behind
						<span className="block bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent">Wavedoubla</span>
					</h2>
					<p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">Our diverse team of experts brings together decades of experience in finance, technology, and community building.</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
					{team.map((member, index) => (
						<div key={index} className="group bg-gray-800/50 backdrop-blur-sm border border-purple-800/30 rounded-2xl overflow-hidden hover:bg-gray-800/70 transition-all duration-300 hover:shadow-2xl hover:shadow-orange-500/10 hover:-translate-y-2">
							<div className="relative overflow-hidden">
								<img src={member.image} alt={member.name} className="w-full h-80 object-cover object-top group-hover:scale-105 transition-transform duration-300" />
								<div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
							</div>

							<div className="p-6">
								<h3 className="text-2xl font-bold text-white mb-2 group-hover:text-orange-400 transition-colors">{member.name}</h3>

								<div className="text-orange-400 font-semibold mb-4">{member.role}</div>

								<p className="text-gray-300 leading-relaxed mb-6 group-hover:text-gray-200 transition-colors">{member.bio}</p>

								<div className="flex space-x-3">
									{Object.entries(member.social).map(([platform, url]) => (
										<a key={platform} href={url} className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gradient-to-r hover:from-orange-400 hover:to-pink-500 transition-all cursor-pointer group-hover:scale-110">
											<i className={`ri-${platform}-fill text-white text-lg`}></i>
										</a>
									))}
								</div>
							</div>
						</div>
					))}
				</div>

				<div className="mt-16 text-center">
					<div className="bg-gray-800/50 backdrop-blur-sm border border-purple-800/30 rounded-3xl p-12 max-w-4xl mx-auto">
						<div className="flex items-center justify-center mb-6">
							<div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-pink-500 rounded-2xl flex items-center justify-center mr-4">
								<i className="ri-mail-send-fill text-white text-2xl"></i>
							</div>
							<div className="text-left">
								<h3 className="text-2xl font-bold text-white">Multi-level Referral</h3>
								<p className="text-gray-400">There is something for everybody</p>
							</div>
						</div>

						<p className="text-xl text-gray-300 mb-8 leading-relaxed">
							Unlock the power of our <span className="font-semibold text-blue-600">5-Generation Referral Bonus</span>! When you invite friends to join Monidoubla, you earn bonuses not just from your direct referrals, but also from the people they invite—up to five generations deep.
						</p>
						<p className="text-xl text-gray-300 mb-8 leading-relaxed">
							Grow your network and multiply your earnings: every new member in your referral tree can contribute to your bonus, whether you invited them directly or they joined through your extended network. The more your community grows, the more you benefit!
						</p>
						<p className="text-xl text-gray-300 mb-8 leading-relaxed">Start building your legacy today. Invite others, help them succeed, and enjoy rewards across five levels of connections.</p>

						<div className="flex flex-col sm:flex-row gap-4 justify-center">
							<CustomLink href={'/auth/login'}>
								<button className="bg-gradient-to-r from-orange-400 to-pink-500 text-white px-8 py-4 rounded-full font-semibold hover:from-orange-500 hover:to-pink-600 transition-all cursor-pointer whitespace-nowrap shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
									<i className="ri-briefcase-fill mr-2"></i>
									Login
								</button>
							</CustomLink>

							<CustomLink href={'/auth/signup'}>
								<button className="border-2 border-gray-600 text-gray-300 px-8 py-4 rounded-full font-semibold hover:border-orange-400 hover:text-orange-400 transition-all cursor-pointer whitespace-nowrap">
									<i className="ri-mail-fill mr-2"></i>
									Get Started
								</button>
							</CustomLink>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

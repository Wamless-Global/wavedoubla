'use client';

export default function CompanyHistory() {
	const milestones = [
		{
			year: '2020',
			title: 'Foundation',
			description: 'Wavedoubla was founded with a vision to democratize financial empowerment through peer-to-peer collaboration.',
			icon: 'ri-rocket-2-fill',
		},
		{
			year: '2021',
			title: 'First 1K Members',
			description: 'Reached our first milestone of 1,000 active community members participating in financial growth programs.',
			icon: 'ri-group-fill',
		},
		{
			year: '2022',
			title: 'Platform Expansion',
			description: 'Launched advanced referral systems and multi-level community building features to enhance member success.',
			icon: 'ri-expand-diagonal-fill',
		},
		{
			year: '2023',
			title: 'Global Reach',
			description: 'Expanded internationally with members from over 50 countries joining our financial empowerment community.',
			icon: 'ri-earth-fill',
		},
		{
			year: '2024',
			title: '50K+ Community',
			description: 'Celebrating over 50,000 active members and $2M+ in community-driven financial achievements.',
			icon: 'ri-trophy-fill',
		},
	];

	return (
		<section className="py-20 bg-gray-900 relative overflow-hidden">
			<div className="absolute top-0 left-1/4 w-64 h-64 bg-gradient-to-br from-orange-400/10 to-pink-500/10 rounded-full blur-3xl"></div>

			<div className="container mx-auto px-6 relative z-10">
				<div className="text-center mb-16">
					<div className="inline-flex items-center bg-gray-800/50 backdrop-blur-sm border border-purple-800/30 rounded-full px-6 py-3 mb-6">
						<div className="w-2 h-2 bg-gradient-to-r from-orange-400 to-pink-500 rounded-full mr-3 animate-pulse"></div>
						<span className="text-gray-300 text-sm font-medium">Our Journey</span>
					</div>
					<h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
						Building the Future of
						<span className="block bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent">Financial Empowerment</span>
					</h2>
					<p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">From a simple idea to a global community, discover how Wavedoubla has evolved to serve thousands of members worldwide.</p>
				</div>

				<div className="relative">
					<div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-orange-400 via-pink-500 to-purple-500 transform -translate-x-1/2 hidden lg:block"></div>

					<div className="space-y-12">
						{milestones.map((milestone, index) => (
							<div key={milestone.year} className={`flex items-center ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} flex-col lg:gap-16`}>
								<div className={`w-full lg:w-1/2 ${index % 2 === 0 ? 'lg:text-right lg:pr-8' : 'lg:text-left lg:pl-8'}`}>
									<div className="bg-gray-800/50 backdrop-blur-sm border border-purple-800/30 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all">
										<div className="flex items-center mb-4">
											<div className={`w-12 h-12 bg-gradient-to-br from-orange-400 to-pink-500 rounded-xl flex items-center justify-center mr-4 ${index % 2 !== 0 ? 'lg:order-2 lg:ml-4 lg:mr-0' : ''}`}>
												<i className={`${milestone.icon} text-white text-xl`}></i>
											</div>
											<div className={index % 2 !== 0 ? 'lg:order-1' : ''}>
												<div className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent">{milestone.year}</div>
											</div>
										</div>
										<h3 className="text-2xl font-bold text-white mb-3">{milestone.title}</h3>
										<p className="text-gray-300 leading-relaxed">{milestone.description}</p>
									</div>
								</div>

								<div className="relative lg:absolute lg:left-1/2 lg:transform lg:-translate-x-1/2 hidden lg:block">
									<div className="w-6 h-6 bg-gradient-to-br from-orange-400 to-pink-500 rounded-full border-4 border-gray-900 shadow-lg"></div>
								</div>

								<div className="w-full lg:w-1/2"></div>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}

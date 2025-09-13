'use client';

export default function TestimonialsSection() {
	const testimonials = [
		{
			name: 'Ivonne Mensah',
			role: 'Apr 12, 2024',
			content: 'Monidoubla helped me pay my school fees when I needed it most. The process was simple, and I received my payout right on time. I’ve already told my friends to join!',
		},
		{
			name: 'Phillip Baateng',
			role: 'Feb 27, 2025',
			content: 'I was amazed by the support from the community. Not only did I double my contribution, but I also made new friends. Monidoubla truly delivers on its promise.',
		},
		{
			name: 'Ama Serwaa',
			role: 'Jul 8, 2025',
			content: 'I joined out of curiosity, but Monidoubla exceeded my expectations. The transparency and quick payments make it stand out. I’m grateful for this platform!',
		},
	];

	return (
		<section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="text-center mb-12 sm:mb-16">
					<h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 px-2">What Our Users Are Saying</h2>
					<p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-2">Real people, real results: hear how Monidoubla is changing lives through trust, giving, and community-powered growth.</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
					{testimonials.map((testimonial, index) => (
						<div key={index} className="bg-white rounded-lg p-6 sm:p-8 shadow-lg">
							<div className="flex items-center mb-4">
								<div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
									<i className="ri-user-3-fill text-blue-600 text-xl"></i>
								</div>
								<div className="ml-4">
									<h4 className="font-semibold text-gray-900 text-sm sm:text-base">{testimonial.name}</h4>
									<p className="text-xs sm:text-sm text-gray-500">{testimonial.role}</p>
								</div>
							</div>
							<p className="text-sm sm:text-base text-gray-600 leading-relaxed italic">"{testimonial.content}"</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}

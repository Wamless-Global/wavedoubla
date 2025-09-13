'use client';

import { useRouter } from 'next/navigation';
import nProgress from 'nprogress';

export default function TestimonialsSection() {
	const router = useRouter();

	const testimonials = [
		{
			name: 'Sarah Mitchell',
			role: 'Community Donor',
			image: 'https://readdy.ai/api/search-image?query=professional%20portrait%20of%20young%20woman%20with%20warm%20smile%2C%20modern%20business%20attire%2C%20clean%20studio%20lighting%2C%20professional%20headshot%20photography%2C%20friendly%20expression%2C%20contemporary%20style&width=400&height=400&seq=testimonial1&orientation=squarish',
			content: 'This platform has completely transformed how I give back to the community. The transparency and impact tracking make every donation meaningful.',
			rating: 5,
			date: 'March 2024',
		},
		{
			name: 'David Rodriguez',
			role: 'Project Organizer',
			image: 'https://readdy.ai/api/search-image?query=professional%20portrait%20of%20middle-aged%20hispanic%20man%20with%20confident%20smile%2C%20business%20casual%20attire%2C%20clean%20studio%20lighting%2C%20professional%20headshot%20photography%2C%20approachable%20expression&width=400&height=400&seq=testimonial2&orientation=squarish',
			content: 'The support system here is incredible. Our project received not just funding, but also mentorship and community engagement that exceeded our expectations.',
			rating: 5,
			date: 'February 2024',
		},
		{
			name: 'Emily Chen',
			role: 'Regular Contributor',
			image: 'https://readdy.ai/api/search-image?query=professional%20portrait%20of%20young%20asian%20woman%20with%20gentle%20smile%2C%20modern%20professional%20attire%2C%20clean%20studio%20lighting%2C%20professional%20headshot%20photography%2C%20kind%20expression&width=400&height=400&seq=testimonial3&orientation=squarish',
			content: 'I love being part of this community. Seeing the direct impact of my contributions and connecting with like-minded people has been incredibly rewarding.',
			rating: 5,
			date: 'January 2024',
		},
	];

	return (
		<section className="py-24 px-6 relative overflow-hidden">
			{/* Background gradient */}
			<div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-purple-900/50 to-gray-900"></div>

			<div className="container mx-auto max-w-7xl relative z-10">
				<div className="text-center mb-16">
					<h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
						What Our <span className="bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent">Community</span> Says
					</h2>
					<p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">Hear from our amazing community members who are making a difference every day through our platform.</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{testimonials.map((testimonial, index) => (
						<div key={index} className="group">
							<div className="bg-gray-800/60 backdrop-blur-lg rounded-3xl p-8 border border-gray-700/50 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 h-full">
								{/* Stars */}
								<div className="flex space-x-1 mb-6">
									{[...Array(testimonial.rating)].map((_, i) => (
										<i key={i} className="ri-star-fill text-yellow-400 text-lg"></i>
									))}
								</div>

								{/* Content */}
								<p className="text-gray-300 mb-8 leading-relaxed text-lg italic">"{testimonial.content}"</p>

								{/* Profile */}
								<div className="flex items-center space-x-4">
									<img src={testimonial.image} alt={testimonial.name} className="w-16 h-16 rounded-2xl object-cover object-top shadow-lg" />
									<div>
										<h4 className="text-white font-bold text-lg">{testimonial.name}</h4>
										<p className="text-orange-400 font-medium">{testimonial.role}</p>
										<p className="text-gray-400 text-sm">{testimonial.date}</p>
									</div>
								</div>

								{/* Decorative gradient border */}
								<div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-orange-400/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity -z-10"></div>
							</div>
						</div>
					))}
				</div>

				{/* Call to action */}
				<div className="text-center mt-16">
					<button
						onClick={() => {
							nProgress.start();
							router.push(`/auth/signup`);
						}}
						className="bg-gradient-to-r from-orange-400 to-pink-500 text-white px-10 py-4 rounded-full font-semibold text-lg hover:from-orange-500 hover:to-pink-600 transition-all cursor-pointer whitespace-nowrap shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
					>
						Join Our Community
					</button>
				</div>
			</div>
		</section>
	);
}

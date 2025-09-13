'use client';

import { useState } from 'react';

interface FAQItem {
	id: string;
	category: string;
	question: string;
	answer: string;
}

const faqData: FAQItem[] = [
	{
		id: '1',
		category: 'Getting Started',
		question: 'What is Wavedoubla?',
		answer: 'Wavedoubla is a peer-to-peer financial empowerment platform that helps individuals grow their money through a structured tier-based system. Our mission is to provide financial freedom through team-based value creation and collaborative donation opportunities.',
	},
	{
		id: '2',
		category: 'Getting Started',
		question: 'What is the minimum donation required?',
		answer: 'The minimum donation to join Wavedoubla is ₦10,000. This makes our platform accessible to everyone who wants to start their journey toward financial empowerment.',
	},
	{
		id: '3',
		category: 'Getting Started',
		question: 'How does the tier system work?',
		answer: 'Our tier system allows you to start with a minimum donation of ₦10,000 and grow through different levels. Each tier offers different benefits and earning potentials. As you progress through tiers, you unlock higher earning opportunities and referral bonuses.',
	},
	{
		id: '4',
		category: 'Getting Started',
		question: 'How do referrals work?',
		answer: 'When you refer someone to Wavedoubla, you earn commissions based on their donation and activity. The referral system is designed to reward active participants who help grow our community. Higher tiers unlock better referral commission rates.',
	},
	{
		id: '5',
		category: 'Security & Safety',
		question: 'Is Wavedoubla safe and secure?',
		answer: 'Yes, Wavedoubla prioritizes the safety and security of all our members. We use advanced security measures, encrypted transactions, and maintain transparency in all our operations to ensure your financial safety.',
	},
	{
		id: '6',
		category: 'Security & Safety',
		question: 'How can I withdraw my earnings?',
		answer: 'Withdrawals can be processed through various secure methods including mobile money, bank transfers, and other approved payment systems. Processing times and minimum withdrawal amounts may vary by tier level.',
	},
	{
		id: '7',
		category: 'Support',
		question: 'What support is available for new users?',
		answer: 'We provide comprehensive support including tutorials, community forums, direct customer service, and mentorship programs to help new users understand and maximize their experience on our platform.',
	},
	{
		id: '8',
		category: 'Support',
		question: 'Can I upgrade my tier anytime?',
		answer: 'Yes, you can upgrade your tier at any time by making additional donations. Upgrading unlocks new benefits, higher earning potentials, and better referral commission rates.',
	},
];

const categories = ['All', 'Getting Started', 'Security & Safety', 'Support'];

export default function FAQSection() {
	const [selectedCategory, setSelectedCategory] = useState('All');
	const [openItems, setOpenItems] = useState<string[]>([]);
	const [searchQuery, setSearchQuery] = useState('');

	const filteredFAQs = faqData.filter((item) => {
		const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
		const matchesSearch = item.question.toLowerCase().includes(searchQuery.toLowerCase()) || item.answer.toLowerCase().includes(searchQuery.toLowerCase());
		return matchesCategory && matchesSearch;
	});

	const toggleItem = (id: string) => {
		setOpenItems((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
	};

	return (
		<section className="py-24 bg-gray-900 relative min-h-screen">
			<div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-800/30 to-gray-900"></div>

			<div className="relative z-10 container mx-auto px-6">
				<div className="max-w-5xl mx-auto">
					<div className="mb-16">
						<div className="relative mb-12">
							<input
								type="text"
								placeholder="Search frequently asked questions..."
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
								className="w-full bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl px-8 py-6 pl-16 text-white placeholder-gray-300 focus:outline-none focus:border-blue-400/50 transition-all text-lg"
							/>
							<div className="absolute left-6 top-1/2 transform -translate-y-1/2">
								<i className="ri-search-line text-gray-300 text-2xl"></i>
							</div>
						</div>

						<div className="flex flex-wrap gap-4 justify-center">
							{categories.map((category) => (
								<button
									key={category}
									onClick={() => setSelectedCategory(category)}
									className={`px-8 py-4 rounded-full font-semibold transition-all cursor-pointer whitespace-nowrap text-lg ${
										selectedCategory === category ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-2xl scale-105' : 'bg-white/10 text-gray-300 hover:bg-white/20 border border-white/20 hover:scale-105'
									}`}
								>
									{category}
								</button>
							))}
						</div>
					</div>

					<div className="space-y-6">
						{filteredFAQs.map((item) => (
							<div key={item.id} className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl overflow-hidden hover:bg-white/15 transition-all hover:scale-[1.02] transform">
								<button onClick={() => toggleItem(item.id)} className="w-full p-8 text-left flex items-center justify-between cursor-pointer group">
									<div className="flex-1">
										<div className="flex items-center mb-3">
											<span className="text-sm bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full font-semibold">{item.category}</span>
										</div>
										<h3 className="text-white font-bold text-xl group-hover:text-blue-400 transition-colors">{item.question}</h3>
									</div>
									<div className={`ml-6 transform transition-transform ${openItems.includes(item.id) ? 'rotate-180' : ''}`}>
										<i className="ri-arrow-down-s-line text-gray-300 text-3xl"></i>
									</div>
								</button>

								{openItems.includes(item.id) && (
									<div className="px-8 pb-8">
										<div className="border-t border-white/20 pt-6">
											<p className="text-gray-300 leading-relaxed text-lg">{item.answer}</p>
										</div>
									</div>
								)}
							</div>
						))}
					</div>

					{filteredFAQs.length === 0 && (
						<div className="text-center py-20">
							<div className="w-32 h-32 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-8">
								<i className="ri-search-line text-gray-400 text-4xl"></i>
							</div>
							<h3 className="text-white font-bold text-2xl mb-6">No results found</h3>
							<p className="text-gray-400 text-lg">Try adjusting your search terms or browse different categories.</p>
						</div>
					)}
				</div>
			</div>
		</section>
	);
}

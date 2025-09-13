'use client';

import Logo from './Logo';
import { CustomLink } from './CustomLink';

export default function Footer() {
	return (
		<footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
			<div className="container mx-auto px-6 py-16">
				<div className="grid grid-cols-1 md:grid-cols-4 gap-12">
					<div className="col-span-1 md:col-span-2">
						<div className="flex items-center space-x-3 mb-6">
							<Logo size="xl" variant="default" alt="" />
						</div>
						<p className="text-gray-300 mb-6 leading-relaxed text-base">Mission statement is team-based value of financial freedom only can truly be in one goal.</p>
					</div>

					<div>
						<h3 className="text-white font-bold mb-6 text-lg">Quick Links</h3>
						<div className="space-y-3">
							<CustomLink href="/" className="block text-gray-300 hover:text-orange-400 transition-colors cursor-pointer">
								Home
							</CustomLink>
							<CustomLink href="/about" className="block text-gray-300 hover:text-orange-400 transition-colors cursor-pointer">
								About Us
							</CustomLink>
							<CustomLink href="/contact" className="block text-gray-300 hover:text-orange-400 transition-colors cursor-pointer">
								Contact Us
							</CustomLink>
							<CustomLink href="/faq" className="block text-gray-300 hover:text-orange-400 transition-colors cursor-pointer">
								FAQ
							</CustomLink>
						</div>
					</div>

					<div>
						<h3 className="text-white font-bold mb-6 text-lg">Get In Touch</h3>
						<div className="space-y-4">
							<div className="flex items-center space-x-3 text-gray-300">
								<div className="w-8 h-8 bg-gradient-to-r from-orange-400 to-pink-500 rounded-lg flex items-center justify-center">
									<i className="ri-phone-fill text-sm text-white"></i>
								</div>
								<span>+253 806 606 0653</span>
							</div>
							<div className="flex items-center space-x-3 text-gray-300">
								<div className="w-8 h-8 bg-gradient-to-r from-orange-400 to-pink-500 rounded-lg flex items-center justify-center">
									<i className="ri-mail-fill text-sm text-white"></i>
								</div>
								<span>support@wavedoubla.com</span>
							</div>
							<div className="flex items-center space-x-3 text-gray-300">
								<div className="w-8 h-8 bg-gradient-to-r from-orange-400 to-pink-500 rounded-lg flex items-center justify-center">
									<i className="ri-map-pin-fill text-sm text-white"></i>
								</div>
								<span>Global Community Platform</span>
							</div>
						</div>
					</div>
				</div>

				<div className="border-t border-gray-700 mt-12 pt-8">
					<div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
						<div className="text-gray-400">Copyright 2025 Wavedoubla. All Rights Reserved.</div>
						<div className="flex items-center space-x-6">
							<CustomLink href="/privacy" className="text-gray-400 hover:text-orange-400 transition-colors cursor-pointer">
								Privacy Policy
							</CustomLink>
							<CustomLink href="/terms" className="text-gray-400 hover:text-orange-400 transition-colors cursor-pointer">
								Terms & Conditions
							</CustomLink>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
}

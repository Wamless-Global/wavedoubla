'use client';

import Logo from './Logo';
import { Button } from '@/components/ui/button';
import { CustomLink } from './CustomLink';

export default function Footer() {
	return (
		<footer className="bg-slate-900 text-white">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
					<div className="sm:col-span-2 lg:col-span-1">
						<div className="flex items-center space-x-2 mb-4">
							<Logo size="xxl" variant="default" alt="" />
						</div>
						<p className="text-gray-400 mb-6 leading-relaxed text-sm sm:text-base">Mission statement is team-based value of financial freedom only can truly be in one goal.</p>
						{/* <div className="flex space-x-4">
							<CustomLink href="#" className="w-10 h-10 bg-blue-600 rounded flex items-center justify-center hover:bg-blue-700 transition-colors">
								<i className="ri-facebook-fill text-white"></i>
							</CustomLink>
							<CustomLink href="#" className="w-10 h-10 bg-blue-600 rounded flex items-center justify-center hover:bg-blue-700 transition-colors">
								<i className="ri-twitter-fill text-white"></i>
							</CustomLink>
							<CustomLink href="#" className="w-10 h-10 bg-blue-600 rounded flex items-center justify-center hover:bg-blue-700 transition-colors">
								<i className="ri-linkedin-fill text-white"></i>
							</CustomLink>
							<CustomLink href="#" className="w-10 h-10 bg-blue-600 rounded flex items-center justify-center hover:bg-blue-700 transition-colors">
								<i className="ri-whatsapp-fill text-white"></i>
							</CustomLink>
						</div> */}
					</div>

					<div>
						<h3 className="font-semibold text-lg mb-4">Quick Links</h3>
						<ul className="space-y-2">
							<li>
								<CustomLink href="/" className="text-gray-400 hover:text-white transition-colors text-sm sm:text-base">
									Home
								</CustomLink>
							</li>
							<li>
								<CustomLink href="/about" className="text-gray-400 hover:text-white transition-colors text-sm sm:text-base">
									About Us
								</CustomLink>
							</li>
							<li>
								<CustomLink href="/contact" className="text-gray-400 hover:text-white transition-colors text-sm sm:text-base">
									Contact Us
								</CustomLink>
							</li>
							<li>
								<CustomLink href="/faqs" className="text-gray-400 hover:text-white transition-colors text-sm sm:text-base">
									FAQs
								</CustomLink>
							</li>
						</ul>
					</div>

					<div>
						<h3 className="font-semibold text-lg mb-4">Contact</h3>
						<ul className="space-y-2">
							<li className="flex items-start text-gray-400 text-sm sm:text-base">
								<i className="ri-map-pin-line mr-2 mt-1 flex-shrink-0"></i>
								<span>Office Address</span>
							</li>
							<li className="flex items-center text-gray-400 text-sm sm:text-base">
								<i className="ri-phone-line mr-2 flex-shrink-0"></i>
								<span>+233 806 696 0533</span>
							</li>
							<li className="flex items-start text-gray-400 text-sm sm:text-base">
								<i className="ri-mail-line mr-2 mt-1 flex-shrink-0"></i>
								<span>support@monidoubla.com</span>
							</li>
						</ul>
					</div>

					<div className="sm:col-span-2 lg:col-span-1">
						<CustomLink href="/auth/signup">
							<Button className="bg-blue-600 hover:bg-blue-700 text-white w-full whitespace-nowrap">Get Started</Button>
						</CustomLink>
					</div>
				</div>

				<div className="border-t border-gray-800 mt-8 sm:mt-12 pt-6 sm:pt-8 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
					<p className="text-gray-400 text-xs sm:text-sm text-center sm:text-left">Copyright {new Date().getFullYear()} Monidoubla, All Rights Reserved</p>
					<div className="flex space-x-4 sm:space-x-6 text-xs sm:text-sm">
						<CustomLink href="#" className="text-gray-400 hover:text-white transition-colors">
							Privacy Policy
						</CustomLink>
						<CustomLink href="#" className="text-gray-400 hover:text-white transition-colors">
							Terms & Conditions
						</CustomLink>
					</div>
				</div>
			</div>
		</footer>
	);
}

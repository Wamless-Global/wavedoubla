'use client';

import { useEffect, useState } from 'react';
import Logo from './Logo';
import { Button } from '@/components/ui/button';
import { CustomLink } from './CustomLink';

export default function Header() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	useEffect(() => {
		// Define the callback before loading script
		window.googleTranslateElementInit = function () {
			if (window.google?.translate?.TranslateElement) {
				new window.google.translate.TranslateElement({ pageLanguage: 'en' }, 'google_translate_element');
			}
		};

		// Prevent duplicate script appending
		if (!document.getElementById('google-translate-script')) {
			const script = document.createElement('script');
			script.id = 'google-translate-script';
			script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
			script.async = true;
			document.body.appendChild(script);
		}

		return () => {
			delete window.googleTranslateElementInit;
		};
	}, []);

	return (
		<header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm py-2">
			<nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
				<div className="flex items-center space-x-4">
					<Logo size="md" variant="default" alt="" />

					{/* Google Translate container */}
					<div id="google_translate_element" className="ml-4"></div>
				</div>

				{/* Desktop navigation */}
				<div className="hidden md:flex items-center space-x-8">
					<CustomLink href="/" className="text-white hover:text-gray-300">
						Home
					</CustomLink>
					<CustomLink href="/about" className="text-white hover:text-gray-300">
						About Us
					</CustomLink>
					<CustomLink href="/contact" className="text-white hover:text-gray-300">
						Contact Us
					</CustomLink>
					<CustomLink href="/faqs" className="text-white hover:text-gray-300">
						FAQs
					</CustomLink>
				</div>

				{/* Desktop buttons */}
				<div className="hidden md:flex items-center space-x-4">
					<CustomLink href="/auth/login">
						<Button variant="outline" size="sm" className="text-white border-white hover:bg-white hover:text-black">
							Login
						</Button>
					</CustomLink>
					<CustomLink href="/auth/signup">
						<Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
							Get Started
						</Button>
					</CustomLink>
				</div>

				{/* Mobile menu toggle */}
				<button className="md:hidden text-white p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
					<i className={`${isMenuOpen ? 'ri-close-line' : 'ri-menu-line'} text-xl`}></i>
				</button>
			</nav>

			{/* Mobile menu overlay */}
			{isMenuOpen && (
				<div className="md:hidden fixed inset-0 bg-blue-900 min-h-screen z-40">
					<div>
						<div className="flex flex-col h-full">
							{/* Header with logo and close button */}
							<div className="flex items-center justify-between px-4 py-4 border-b border-blue-800">
								<div className="flex items-center space-x-2">
									<Logo size="xl" variant="default" alt="" />
								</div>
								<button className="text-white p-2" onClick={() => setIsMenuOpen(false)}>
									<i className="ri-close-line text-xl"></i>
								</button>
							</div>

							{/* Navigation cusCustomLinks */}
							<div className="flex-1 flex flex-col justify-center px-6 space-y-1">
								<CustomLink href="/" className="text-white text-center text-md py-4 hover:text-blue-200 transition-colors" onClick={() => setIsMenuOpen(false)}>
									Home
								</CustomLink>
								<CustomLink href="/about" className="text-white text-center text-md py-4 hover:text-blue-200 transition-colors" onClick={() => setIsMenuOpen(false)}>
									About Us
								</CustomLink>
								<CustomLink href="/contact" className="text-white text-center text-md py-4 hover:text-blue-200 transition-colors" onClick={() => setIsMenuOpen(false)}>
									Contact Us
								</CustomLink>
								<CustomLink href="/faqs" className="text-white text-center text-md py-4 hover:text-blue-200 transition-colors" onClick={() => setIsMenuOpen(false)}>
									FAQs
								</CustomLink>
							</div>

							{/* Bottom buttons */}
							<div className="px-6 pb-8 flex-1 flex flex-col space-y-4">
								<CustomLink href="/auth/login">
									<Button variant="outline" className="w-full text-yellow-400 border-yellow-400 hover:bg-yellow-400 hover:text-blue-900 bg-transparent whitespace-nowrap" onClick={() => setIsMenuOpen(false)}>
										Login
									</Button>
								</CustomLink>

								<CustomLink href="/auth/signup">
									<Button className="w-full bg-white text-blue-900 hover:bg-gray-100 whitespace-nowrap" onClick={() => setIsMenuOpen(false)}>
										Get Started
									</Button>
								</CustomLink>
							</div>
						</div>
					</div>
				</div>
			)}
		</header>
	);
}

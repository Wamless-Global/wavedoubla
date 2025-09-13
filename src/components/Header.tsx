'use client';

import { useEffect, useState } from 'react';
import Logo from './Logo';
import { CustomLink } from './CustomLink';
import { useRouter } from 'next/navigation';
import nProgress from 'nprogress';

export default function Header() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const router = useRouter();

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
		<header className="bg-gray-900/90 backdrop-blur-md border-b border-purple-800/30 shadow-lg sticky top-0 z-50">
			<div className="container mx-auto px-6 py-4">
				<div className="flex items-center justify-between">
					<Logo size="md" variant="default" alt="" />

					{/* Google Translate container */}
					{/* <div id="google_translate_element" className="ml-4"></div> */}

					<nav className="hidden md:flex items-center space-x-8">
						<CustomLink href="/" className="text-gray-300 hover:text-orange-400 font-medium transition-colors cursor-pointer relative group">
							Home
							<span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-400 transition-all group-hover:w-full"></span>
						</CustomLink>
						<CustomLink href="/about" className="text-gray-300 hover:text-orange-400 font-medium transition-colors cursor-pointer relative group">
							About Us
							<span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-400 transition-all group-hover:w-full"></span>
						</CustomLink>
						<CustomLink href="/contact" className="text-gray-300 hover:text-orange-400 font-medium transition-colors cursor-pointer relative group">
							Contact Us
							<span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-400 transition-all group-hover:w-full"></span>
						</CustomLink>
						<CustomLink href="/faqs" className="text-gray-300 hover:text-orange-400 font-medium transition-colors cursor-pointer relative group">
							FAQs
							<span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-400 transition-all group-hover:w-full"></span>
						</CustomLink>
					</nav>

					<div className="hidden md:flex items-center space-x-4">
						<button
							className="text-gray-300 hover:text-orange-400 px-6 py-2 rounded-full font-medium transition-all cursor-pointer whitespace-nowrap"
							onClick={() => {
								nProgress.start();
								router.push(`/auth/login`);
							}}
						>
							Login
						</button>
						<button
							className="bg-gradient-to-r from-orange-400 to-pink-500 text-white px-8 py-3 rounded-full font-semibold hover:from-orange-500 hover:to-pink-600 transition-all cursor-pointer whitespace-nowrap shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
							onClick={() => {
								nProgress.start();
								router.push(`/auth/signup`);
							}}
						>
							Get Started
						</button>
					</div>

					<button className="md:hidden text-gray-300 hover:text-orange-400 cursor-pointer p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
						<i className={`${isMenuOpen ? 'ri-close-line' : 'ri-menu-line'} text-2xl`}></i>
					</button>
				</div>

				{isMenuOpen && (
					<div className="md:hidden mt-6 pb-6 border-t border-purple-800/30 pt-6">
						<div className="flex flex-col space-y-4">
							<CustomLink href="/" className="text-gray-300 hover:text-orange-400 font-medium transition-colors cursor-pointer">
								Home
							</CustomLink>
							<CustomLink href="/about" className="text-gray-300 hover:text-orange-400 font-medium transition-colors cursor-pointer">
								About Us
							</CustomLink>
							<CustomLink href="/contact" className="text-gray-300 hover:text-orange-400 font-medium transition-colors cursor-pointer">
								Contact Us
							</CustomLink>
							<CustomLink href="/faq" className="text-gray-300 hover:text-orange-400 font-medium transition-colors cursor-pointer">
								FAQ
							</CustomLink>
							<div className="flex flex-col space-y-3 pt-4">
								<button
									className="text-gray-300 hover:text-orange-400 px-6 py-2 rounded-full font-medium transition-colors cursor-pointer whitespace-nowrap text-left"
									onClick={() => {
										nProgress.start();
										router.push(`/auth/login`);
									}}
								>
									Login
								</button>

								<button
									className="bg-gradient-to-r from-orange-400 to-pink-500 text-white px-8 py-3 rounded-full font-semibold hover:from-orange-500 hover:to-pink-600 transition-all cursor-pointer whitespace-nowrap shadow-lg"
									onClick={() => {
										nProgress.start();
										router.push(`/auth/signup`);
									}}
								>
									Get Started
								</button>
							</div>
						</div>
					</div>
				)}
			</div>
		</header>
	);
}

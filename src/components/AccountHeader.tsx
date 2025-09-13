'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import Logo from './Logo';
import { motion } from 'framer-motion';

interface AccountHeaderProps {
	onMenuClick: () => void;
	onNotificationClick: () => void;
	unreadNotifications: number;
}

const pageTitle = {
	'/user': 'Dashboard',
	'/user/dashboard': 'Dashboard',
	'/user/marketplace': 'Marketplace',
	'/user/my-listings': 'My Listings',
	'/user/add-product': 'Add New Product',
	'/user/profile': 'Profile',
	'/user/network': 'My Network',
	'/user/ph-history': 'PH History',
	'/user/gh-history': 'GH History',
	'/user/change-password': 'Change Password',
	'/user/add-momo-details': 'Add Momo Details',
};

export function AccountHeader({ onMenuClick, onNotificationClick, unreadNotifications }: AccountHeaderProps) {
	const pathname = usePathname();
	const { theme, setTheme } = useTheme();
	const [mounted, setMounted] = useState(false);
	const title = pageTitle[pathname as keyof typeof pageTitle] || 'Account';
	const userName = 'Shuku Shaker'; // TODO: Get from user context

	useEffect(() => {
		setMounted(true);
	}, []);

	const toggleTheme = () => {
		setTheme(theme === 'light' ? 'dark' : 'light');
	};

	useEffect(() => {
		window.googleTranslateElementInit = function () {
			if (window.google?.translate?.TranslateElement) {
				new window.google.translate.TranslateElement({ pageLanguage: 'en' }, 'google_translate_element');
			}
		};
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

	const headerContent = (
		<header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
			<div className="container flex h-16 items-center justify-between px-4">
				{/* Left side - Logo and Title */}
				<div className="flex items-center gap-6">
					{/* Menu Button - Only visible on mobile */}
					<motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={onMenuClick} className="lg:hidden p-2 text-gray-600 hover:text-gray-900 rounded-full hover:bg-gray-100 transition-colors">
						<i className="ri-menu-line text-xl" />
					</motion.button>

					{/* Logo - Only visible on mobile */}
					<div className="lg:hidden">
						<Logo size="sm" variant="default" alt="" />
					</div>

					{/* Page Title - Hidden on mobile, shown on desktop */}
					<div className="hidden lg:block">
						<h1 className="text-xl font-heading font-semibold text-gray-900">{title}</h1>
					</div>

					{/* Google Translate */}
					<div id="google_translate_element" className="hidden lg:block" />
				</div>

				{/* Right side - Navigation and Profile */}
				<div className="flex items-center gap-4">
					{/* Notification button */}
					<motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={onNotificationClick} className="relative p-2 rounded-full hover:bg-gray-100 text-gray-600 hover:text-gray-900 transition-colors">
						<i className="ri-notification-3-line text-xl" />
						{unreadNotifications > 0 && <span className="absolute -top-0.5 -right-0.5 min-w-[20px] h-5 bg-primary text-white text-xs font-medium rounded-full px-1.5 flex items-center justify-center">{unreadNotifications}</span>}
					</motion.button>

					{/* User Profile */}
					<div className="flex items-center gap-3 pl-2">
						<div className="hidden md:flex flex-col items-end">
							<span className="font-medium text-sm text-gray-900">Welcome back,</span>
							<span className="text-sm text-gray-600">{userName}</span>
						</div>
						<motion.div whileHover={{ scale: 1.05 }} className="h-9 w-9 rounded-full bg-gray-100 flex items-center justify-center cursor-pointer">
							<span className="text-sm font-medium text-gray-900">{userName[0]}</span>
						</motion.div>
					</div>
				</div>
			</div>

			{/* Mobile view - Page title shown below header */}
			<div className="lg:hidden px-4 pb-3 -mt-1 bg-white border-b">
				<h1 className="text-lg font-heading font-medium text-gray-900">{title}</h1>
				<div className="mt-1">
					<div id="google_translate_element_mobile" />
				</div>
			</div>
		</header>
	);

	if (!mounted) {
		return headerContent;
	}

	return headerContent;
}

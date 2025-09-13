'use client';

import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import nProgress from 'nprogress';
import { logout } from '@/lib/auth';
import { motion } from 'framer-motion';
import Logo from './Logo';

const navigationItems = [
	{
		category: 'Core',
		items: [
			{ name: 'Dashboard', href: '/user', icon: 'ri-dashboard-3-line' },
			{ name: 'My Network', href: '/user/network', icon: 'ri-team-line' },
			{ name: 'Provide Help', href: '/user/provide-help', icon: 'ri-hand-heart-fill' },
			{ name: 'Get Help', href: '/user/get-help', icon: 'ri-heart-fill' },
		],
	},
	{
		category: 'Community',
		items: [
			{ name: 'Testimonials', href: '/user/testimonials', icon: 'ri-chat-smile-3-line' },
			{ name: 'Marketplace', href: '/user/marketplace', icon: 'ri-store-2-line' },
			{ name: 'My Listings', href: '/user/my-listings', icon: 'ri-list-check-3' },
		],
	},
	{
		category: 'Settings',
		items: [
			{ name: 'Profile', href: '/user/profile', icon: 'ri-user-smile-line' },
			{ name: 'Payment Methods', href: '/user/add-momo-details', icon: 'ri-bank-card-line' },
			{ name: 'Security', href: '/user/change-password', icon: 'ri-shield-keyhole-line' },
		],
	},
];

interface AccountSidebarProps {
	onClose?: () => void;
}

export function AccountSidebar({ onClose }: AccountSidebarProps) {
	const pathname = usePathname();
	const router = useRouter();

	const handleNavigation = async (href: string) => {
		if (href === '#') {
			nProgress.start();
			await logout();
			router.push('/auth/login');
			return;
		}

		if (onClose) onClose();
		nProgress.start();
		router.push(href);
	};

	return (
		<div className="w-64 bg-white border-r min-h-screen p-6 flex flex-col relative">
			<div className="mb-8 flex-shrink-0">
				<div className="flex items-center justify-between">
					<div className="flex items-center">
						<Logo size="sm" variant="default" alt="" />
					</div>
					{onClose && (
						<motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={onClose} className="lg:hidden p-2 text-gray-600 hover:text-gray-900 rounded-full hover:bg-gray-100 transition-colors">
							<i className="ri-close-line text-xl" />
						</motion.button>
					)}
				</div>
			</div>

			<nav className="space-y-8 flex-1 overflow-y-auto">
				{navigationItems.map((section) => (
					<div key={section.category}>
						<ul className="space-y-1">
							{section.items.map((item) => (
								<li key={item.name}>
									<div
										onClick={() => handleNavigation(item.href)}
										className={cn('w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 text-sm cursor-pointer text-left', pathname === item.href ? 'bg-gray-100 text-primary font-medium' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900')}
									>
										<i className={cn(item.icon, 'text-xl', pathname === item.href ? 'text-primary' : 'text-gray-400')} />
										<span className="text-sm">{item.name}</span>
									</div>
								</li>
							))}
						</ul>
					</div>
				))}
			</nav>

			<div className="mt-6 pt-6 border-t">
				<div onClick={() => handleNavigation('#')} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-destructive hover:bg-red-50 transition-colors text-sm cursor-pointer text-left">
					<i className="ri-logout-circle-r-line text-xl" />
					<span className="text-sm font-medium">Log Out</span>
				</div>
			</div>
		</div>
	);
}

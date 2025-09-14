'use client';

import { useState } from 'react';
import { AccountSidebar } from '@/components/AccountSidebar';
import { AccountHeader } from '@/components/AccountHeader';
import { NotificationPanel } from '@/components/NotificationPanel';
import { getCurrentUser } from '@/lib/userUtils';
import LoggedInAs from '@/components/ui/logged-in-as-user';
import { getLoggedInAsUser } from '@/lib/helpers';

export default function AccountLayout({ children }: { children: React.ReactNode }) {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const [isNotificationOpen, setIsNotificationOpen] = useState(false);
	const [unreadNotifications, setUnreadNotifications] = useState(0);

	const handleOverlayClick = () => {
		setIsSidebarOpen(false);
	};

	return (
		<>
			<LoggedInAs />
			<div className={`flex h-screen bg-background ${getLoggedInAsUser() ? 'mt-14 relative' : ''}`}>
				{/* Desktop Sidebar */}
				<div className="hidden lg:block">
					<AccountSidebar />
				</div>

				{/* Mobile Sidebar */}
				{isSidebarOpen && (
					<div className="lg:hidden fixed inset-0 z-50">
						<div className="absolute inset-0 bg-black/80" onClick={handleOverlayClick} />
						<AccountSidebar onClose={() => setIsSidebarOpen(false)} />
					</div>
				)}

				{/* Main Content Area */}
				<div className="flex-1 flex flex-col min-w-0">
					<AccountHeader onMenuClick={() => setIsSidebarOpen(true)} onNotificationClick={() => setIsNotificationOpen(true)} unreadNotifications={unreadNotifications} />

					<main className="flex-1 overflow-auto pb-8 md:pb-12">{children}</main>
				</div>

				{/* Notification Panel */}
				<NotificationPanel isOpen={isNotificationOpen} onClose={() => setIsNotificationOpen(false)} userId={getCurrentUser()?.id || ''} handleUnread={setUnreadNotifications} />
			</div>
		</>
	);
}

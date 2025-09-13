'use client';

import { useTheme } from 'next-themes';
import { Toaster as Sonner, ToasterProps, toast as sonnerToast } from 'sonner';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import React from 'react';

const Toaster = ({ ...props }: ToasterProps) => {
	const { theme = 'system' } = useTheme();
	const isMobile = useMediaQuery('(max-width: 768px)');
	const position = isMobile ? 'top-right' : 'bottom-left';

	return (
		<Sonner
			{...props}
			position={position}
			theme={theme as ToasterProps['theme']}
			className="toaster group"
			style={
				{
					'--normal-bg': 'var(--popover)',
					'--normal-text': 'var(--popover-foreground)',
					'--normal-border': 'var(--border)',
				} as React.CSSProperties
			}
			toastOptions={{
				classNames: {
					toast: 'group toast',
					loading: 'bg-[var(--normal-bg)] text-[var(--normal-text)] border-[var(--normal-border)]',
					success: 'bg-[var(--normal-bg)] text-[var(--normal-text)] border-[var(--normal-border)]',
					error: 'bg-[var(--normal-bg)] text-[var(--normal-text)] border-[var(--normal-border)]',
				},
			}}
		/>
	);
};

// Export patched toast
const toast = sonnerToast;

export { Toaster, toast };

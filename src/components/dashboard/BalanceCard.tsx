'use client';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface BalanceCardProps {
	title: string;
	amount: number;
	variant?: 'success' | 'primary' | 'secondary';
	className?: string;
	description?: string;
	icon?: React.ReactNode;
	onClick?: () => void;
}

export function BalanceCard({ title, amount, variant = 'success', className, description, icon, onClick }: BalanceCardProps) {
	const variantStyles = {
		success: 'bg-success text-success-foreground hover:bg-success/90',
		primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
		secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/90',
	};

	return (
		<motion.div whileHover={{ scale: 1.02 }} transition={{ type: 'spring', stiffness: 300, damping: 30 }}>
			<Card className={cn('relative overflow-hidden cursor-pointer', variantStyles[variant], className)} onClick={onClick}>
				<CardHeader className="flex flex-row items-center justify-between pb-2">
					<h3 className="font-heading text-lg font-medium">{title}</h3>
					{icon && <div className="text-2xl opacity-90">{icon}</div>}
				</CardHeader>
				<CardContent>
					<div className="flex flex-col gap-1">
						<div className="flex items-baseline gap-1">
							<span className="text-3xl font-bold">${amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
						</div>
						{description && <p className="text-sm opacity-90">{description}</p>}
					</div>
				</CardContent>
			</Card>
		</motion.div>
	);
}

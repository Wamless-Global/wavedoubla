'use client';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface RequestCardProps {
	id: string;
	amount: number;
	status: 'completed' | 'pending' | 'in-progress';
	participants: Array<{
		id: string;
		name: string;
		avatar?: string;
		username: string;
		paymentAmount: number;
		paymentDate?: string;
		paymentConfirmed?: boolean;
	}>;
	className?: string;
	onClick?: () => void;
}

export function RequestCard({ id, amount, status, participants, className, onClick }: RequestCardProps) {
	const statusStyles = {
		completed: 'bg-success/10 text-success',
		pending: 'bg-orange-100 text-orange-700',
		'in-progress': 'bg-blue-100 text-blue-700',
	};

	return (
		<motion.div whileHover={{ scale: 1.01 }} transition={{ type: 'spring', stiffness: 300, damping: 30 }}>
			<Card className={cn('relative overflow-hidden hover:shadow-md transition-all duration-200', className)} onClick={onClick}>
				<CardHeader className="flex flex-row items-center justify-between pb-2">
					<div className="flex flex-col gap-1">
						<h3 className="font-heading text-lg font-medium">Request #{id}</h3>
						<span className={cn('inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium', statusStyles[status])}>{status.charAt(0).toUpperCase() + status.slice(1)}</span>
					</div>
					<div className="text-2xl font-bold">${amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}</div>
				</CardHeader>
				<CardContent>
					<div className="space-y-4">
						{participants.map((participant) => (
							<div key={participant.id} className="flex items-center justify-between">
								<div className="flex items-center gap-3">
									{participant.avatar ? <Image src={participant.avatar} alt={participant.name} width={32} height={32} className="rounded-full" /> : <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">{participant.name[0]}</div>}
									<div className="flex flex-col">
										<span className="font-medium">{participant.name}</span>
										<span className="text-sm text-gray-500">@{participant.username}</span>
									</div>
								</div>
								<div className="flex flex-col items-end">
									<span className="font-medium">${participant.paymentAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
									{participant.paymentDate && <span className="text-sm text-gray-500">{new Date(participant.paymentDate).toLocaleDateString()}</span>}
									{participant.paymentConfirmed && <span className="text-success text-sm">Payment Confirmed</span>}
								</div>
							</div>
						))}
					</div>
				</CardContent>
			</Card>
		</motion.div>
	);
}

'use client';

import { BalanceCard } from './BalanceCard';

interface BalanceSectionProps {
	availableAmount: number;
	totalProvideHelp: number;
	totalGetHelp: number;
	onWithdraw?: () => void;
	onProvideHelp?: () => void;
	onGetHelp?: () => void;
}

export function BalanceSection({ availableAmount, totalProvideHelp, totalGetHelp, onWithdraw, onProvideHelp, onGetHelp }: BalanceSectionProps) {
	return (
		<section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
			<BalanceCard title="Available Amount" amount={availableAmount} variant="success" icon={<i className="ri-wallet-3-line" />} description="This is the total amount of money you have available" onClick={onWithdraw} />

			<BalanceCard title="Total Provide Help" amount={totalProvideHelp} variant="primary" icon={<i className="ri-hand-heart-line" />} description="This is the total amount of money you have donated to get help" onClick={onProvideHelp} />

			<BalanceCard title="Total Get Help" amount={totalGetHelp} variant="secondary" icon={<i className="ri-heart-line" />} description="This is the total amount of money you have received from getting help" onClick={onGetHelp} />
		</section>
	);
}

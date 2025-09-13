'use client';

import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface TestimonialCardProps {
	author: {
		name: string;
		avatar?: string;
		role?: string;
	};
	rating: number;
	content: string;
	date: string;
	className?: string;
}

export function TestimonialCard({ author, rating, content, date, className }: TestimonialCardProps) {
	return (
		<motion.div whileHover={{ scale: 1.02 }} transition={{ type: 'spring', stiffness: 300, damping: 30 }}>
			<Card className={cn('relative overflow-hidden hover:shadow-md transition-all duration-200', className)}>
				<CardContent className="pt-6">
					<div className="flex flex-col gap-4">
						<div className="flex items-center gap-4">
							{author.avatar ? <Image src={author.avatar} alt={author.name} width={40} height={40} className="rounded-full" /> : <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">{author.name[0]}</div>}
							<div className="flex flex-col">
								<span className="font-medium">{author.name}</span>
								{author.role && <span className="text-sm text-gray-500">{author.role}</span>}
							</div>
						</div>

						<div className="flex items-center gap-1">
							{Array.from({ length: 5 }).map((_, i) => (
								<svg key={i} className={cn('w-4 h-4', i < rating ? 'text-yellow-400' : 'text-gray-300')} fill="currentColor" viewBox="0 0 20 20">
									<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
								</svg>
							))}
						</div>

						<p className="text-gray-600 text-sm">{content}</p>

						<div className="text-xs text-gray-500">{new Date(date).toLocaleDateString()}</div>
					</div>
				</CardContent>
			</Card>
		</motion.div>
	);
}

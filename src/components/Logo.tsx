import Image from 'next/image';
import { useTheme } from 'next-themes';
import { CustomLink } from './CustomLink';

const sizeMap = {
	xs: 20,
	sm: 50,
	md: 80,
	lg: 110,
	xl: 140,
	xxl: 190,
};

const logoVariants = {
	dark: '/images/wavedoubla-logo.png?new=2',
	default: '/images/wavedoubla-logo.png?new=2',
	darkIcon: '/images/wavedoubla-logo.png?new=2',
	lightIcon: '/images/wavedoubla-logo.png?new=2',
	light: '/images/wavedoubla-logo.png?new=2',
};

export default function Logo({
	size = 'lg',
	variant = 'light',
	alt = 'Wavedoubla Logo',
	style,
	className,
	...props
}: {
	size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
	variant?: keyof typeof logoVariants;
	alt?: string;
	style?: React.CSSProperties;
	className?: string;
} & Omit<React.ComponentProps<typeof Image>, 'src'>) {
	const { theme } = useTheme();
	const dimension = sizeMap[size] || sizeMap.lg;
	const logoImg = variant == 'default' ? logoVariants.default : logoVariants[theme === 'dark' ? 'dark' : 'light'];

	return (
		<CustomLink href={'/'}>
			<Image src={logoImg} width={dimension} height={dimension / 2} alt={alt} style={{ objectFit: 'contain', ...style }} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className={className} priority {...props} />
		</CustomLink>
	);
}

import type { Config } from 'tailwindcss';
import fontFamily from 'tailwindcss/defaultTheme'; // Corrected default import
import plugin from 'tailwindcss/plugin';

module.exports = {
	darkMode: 'class',
	content: ['./src/{app,components,libs,pages,hooks}/**/*.{html,js,ts,jsx,tsx}'],
	theme: {
		extend: {
			fontFamily: {
				sans: ['Clash Display', ...fontFamily.fontFamily.sans],
				heading: ['Clash Display', ...fontFamily.fontFamily.sans],
			},
			borderRadius: {
				'4xl': '2rem',
				'3xl': '1.5rem',
				'2xl': '1rem',
			},
			spacing: {
				18: '4.5rem',
				22: '5.5rem',
			},
			colors: {
				border: '#E5E7EB',
				input: '#E5E7EB',
				ring: '#00BD7E',
				background: '#F3F4F6',
				foreground: '#111827',
				success: {
					DEFAULT: '#00BD7E',
					foreground: '#FFFFFF',
				},
				primary: {
					DEFAULT: '#4285F4',
					foreground: '#FFFFFF',
				},
				secondary: {
					DEFAULT: '#C261FE',
					foreground: '#FFFFFF',
				},
				destructive: {
					DEFAULT: '#EF4444',
					foreground: '#FFFFFF',
				},
				muted: {
					DEFAULT: '#F3F4F6',
					foreground: '#6B7280',
				},
				accent: {
					DEFAULT: '#F3F4F6',
					foreground: '#111827',
				},
				popover: {
					DEFAULT: '#FFFFFF',
					foreground: '#111827',
				},
				card: {
					DEFAULT: 'oklch(var(--card))',
					foreground: 'oklch(var(--card-foreground))',
				},
				// Add sidebar colors if needed for utility classes
				sidebar: {
					DEFAULT: 'oklch(var(--sidebar))',
					foreground: 'oklch(var(--sidebar-foreground))',
					primary: 'oklch(var(--sidebar-primary))',
					'primary-foreground': 'oklch(var(--sidebar-primary-foreground))',
					accent: 'oklch(var(--sidebar-accent))',
					'accent-foreground': 'oklch(var(--sidebar-accent-foreground))',
					border: 'oklch(var(--sidebar-border))',
					ring: 'oklch(var(--sidebar-ring))',
				},
				active: {
					DEFAULT: 'red',
					foreground: 'oklch(var(--active-foreground))',
				},
			},
		},
	},
	plugins: [],
};

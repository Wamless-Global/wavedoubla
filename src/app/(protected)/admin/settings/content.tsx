'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';
import { logger } from '@/lib/logger';
import { fetchWithAuth } from '@/lib/fetchWithAuth';
import { handleFetchMessage, getSettings } from '@/lib/helpers';

interface GeneralSettings {
	platformName: string;
	platformCurrency: string;
	country: string;
	autoMatching: boolean;
	commissionRate: string;
	maintenanceMode: boolean;
	maintenanceMessage: string;
}

interface NotificationSettings {
	smsProvider: string;
	smsApiKey: string;
	smsApiSecret: string;
	smsSenderId: string;
	emailHost: string;
	emailPort: number;
	emailUser: string;
	emailPassword: string;
	emailFromName: string;
}

interface SystemSettings {
	maxTransactionAmount: number;
	minTransactionAmount: number;
	sessionTimeout: number;
	backupFrequency: string;
	enableTwoFA: boolean;
	requireEmailVerification: boolean;
	maxLoginAttempts: number;
	enforcePhoneBeforePHGH: boolean;
	enforceMomoBeforePHGH?: boolean;
	countdownDuration: string;
	allowExtraTimeOnProof: boolean;
	extraTimeAmount: string;
	penaltyApplication: 'both' | 'ph' | 'gh';
	enableCronJob: boolean;
}

interface SecuritySettings {
	allowLogin: boolean;
	allowAccountCreation: boolean;
	allowDuplicatePhoneSignup: boolean;
}

function parseSettings(settingsArr: { setting_key: string; setting_value: string }[], defaults: Record<string, any>) {
	const result: Record<string, any> = { ...defaults };
	for (const { setting_key, setting_value } of settingsArr) {
		if (setting_value === 'true' || setting_value === 'false') {
			result[setting_key] = setting_value === 'true';
		} else if (!isNaN(Number(setting_value)) && setting_value.trim() !== '') {
			result[setting_key] = Number(setting_value);
		} else {
			result[setting_key] = setting_value;
		}
	}
	return result;
}

export default function SettingsPage() {
	const [isLoading, setIsLoading] = useState(true);
	const [saving, setSaving] = useState<string | null>(null);
	const [isMounted, setIsMounted] = useState(false);

	const [generalSettings, setGeneralSettings] = useState<
		GeneralSettings & {
			referralGeneration?: string;
			referralBonusWithdrawableAmount?: number;
			referralBonusReleaseType?: 'completed' | 'matured';
			platform_base_currency?: string;
		}
	>({
		platformName: '',
		platformCurrency: '',
		platform_base_currency: '',
		country: '',
		autoMatching: false,
		commissionRate: '',
		maintenanceMode: false,
		maintenanceMessage: '',
		referralGeneration: '',
		referralBonusWithdrawableAmount: 0,
		referralBonusReleaseType: 'completed',
	});

	const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>({
		smsProvider: 'twilio',
		smsApiKey: '',
		smsApiSecret: '',
		smsSenderId: '',
		emailHost: '',
		emailPort: 0,
		emailUser: '',
		emailPassword: '',
		emailFromName: '',
	});

	const [systemSettings, setSystemSettings] = useState<SystemSettings>({
		maxTransactionAmount: 0,
		minTransactionAmount: 0,
		sessionTimeout: 0,
		backupFrequency: '',
		enableTwoFA: false,
		requireEmailVerification: false,
		maxLoginAttempts: 0,
		enforcePhoneBeforePHGH: false,
		enforceMomoBeforePHGH: false,
		countdownDuration: '',
		allowExtraTimeOnProof: false,
		extraTimeAmount: '',
		penaltyApplication: 'both',
		enableCronJob: false,
	});

	const [securitySettings, setSecuritySettings] = useState<SecuritySettings>({
		allowLogin: false,
		allowAccountCreation: false,
		allowDuplicatePhoneSignup: false,
	});

	const [errors, setErrors] = useState<{ [key: string]: string }>({});

	useEffect(() => {
		setIsMounted(true);
		loadSettings();
	}, []);

	const loadSettings = async () => {
		setIsLoading(true);
		try {
			const res = await fetchWithAuth('/api/admin/settings');

			if (!res.ok) {
				throw new Error(handleFetchMessage(await res.json(), 'Failed to fetch settings'));
			}
			const data = await res.json();

			if (data?.data?.settings) {
				setGeneralSettings((prev) => ({
					...prev,
					...parseSettings(data.data.settings, prev),
				}));
				setNotificationSettings((prev) => ({
					...prev,
					...parseSettings(data.data.settings, prev),
				}));
				setSystemSettings((prev) => ({
					...prev,
					...parseSettings(data.data.settings, prev),
				}));
				setSecuritySettings((prev) => ({
					...prev,
					...parseSettings(data.data.settings, prev),
				}));
			}
		} catch (error) {
			toast.error(handleFetchMessage(error, 'Failed to load settings.'));
		} finally {
			setIsLoading(false);
		}
	};

	const handleLogoFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file && (file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/svg+xml')) {
			setGeneralSettings((prev) => ({ ...prev, logoFile: file, logoUrl: URL.createObjectURL(file) }));
		} else if (file) {
			toast.error('Please select a valid image file (JPEG, PNG, or SVG)');
		}
	};

	const validateGeneralSettings = (): boolean => {
		const newErrors: { [key: string]: string } = {};

		if (!generalSettings.platformName.trim()) {
			newErrors.platformName = 'Platform name is required';
		} else if (generalSettings.platformName.length < 2) {
			newErrors.platformName = 'Platform name must be at least 2 characters';
		}

		if (!generalSettings.platformCurrency.trim()) {
			newErrors.platformCurrency = 'Platform currency is required';
		}

		if (generalSettings.maintenanceMode && !generalSettings.maintenanceMessage.trim()) {
			newErrors.maintenanceMessage = 'Maintenance message is required when maintenance mode is enabled';
		}

		setErrors((prev) => ({ ...prev, ...newErrors }));
		return Object.keys(newErrors).length === 0;
	};

	const validateNotificationSettings = (): boolean => {
		const newErrors: { [key: string]: string } = {};

		if (notificationSettings.smsApiKey && !notificationSettings.smsApiSecret) {
			newErrors.smsApiSecret = 'SMS API key and secret must be filled together';
		}

		if (notificationSettings.emailHost && !notificationSettings.emailUser) {
			newErrors.emailUser = 'Email user is required when email host is configured';
		}

		if (notificationSettings.emailPort < 1 || notificationSettings.emailPort > 65535) {
			newErrors.emailPort = 'Email port must be between 1-65535';
		}

		setErrors((prev) => ({ ...prev, ...newErrors }));
		return Object.keys(newErrors).length === 0;
	};

	const validateSystemSettings = (): boolean => {
		const newErrors: { [key: string]: string } = {};

		if (systemSettings.maxTransactionAmount <= systemSettings.minTransactionAmount) {
			newErrors.maxTransactionAmount = 'Maximum transaction amount must be greater than minimum';
		}

		if (systemSettings.minTransactionAmount < 1) {
			newErrors.minTransactionAmount = 'Minimum transaction amount must be greater than 0';
		}

		if (systemSettings.sessionTimeout < 5 || systemSettings.sessionTimeout > 480) {
			newErrors.sessionTimeout = 'Session timeout must be between 5-480 minutes';
		}

		if (systemSettings.maxLoginAttempts < 1 || systemSettings.maxLoginAttempts > 20) {
			newErrors.maxLoginAttempts = 'Maximum login attempts must be between 1-20';
		}

		// Validate countdown duration format (e.g., "7 days", "30 days", "1 month", "24 hours", "30 minutes")
		const countdownRegex = /^(\d+)\s+(minute|minutes|hour|hours|day|days|week|weeks|month|months|year|years)$/i;
		if (systemSettings.countdownDuration && !countdownRegex.test(systemSettings.countdownDuration.trim())) {
			newErrors.countdownDuration = 'Countdown format should be like "30 minutes", "24 hours", "7 days", "1 month"';
		}
		if (systemSettings.extraTimeAmount && !countdownRegex.test(systemSettings.extraTimeAmount.trim())) {
			newErrors.extraTimeAmount = 'Extra time format should be like "30 minutes", "24 hours", "7 days", "1 month"';
		}

		setErrors((prev) => ({ ...prev, ...newErrors }));
		return Object.keys(newErrors).length === 0;
	};

	const objectToUpdates = (obj: Record<string, any>) =>
		Object.entries(obj)
			.filter(([key, value]) => key !== 'logoFile' && key !== 'smsSenderId' && value !== '' && value !== null && value !== undefined)
			.map(([key, value]) => ({
				key,
				setting_value: typeof value === 'string' ? value : JSON.stringify(value),
			}));

	const handleSaveGeneralSettings = async () => {
		if (!validateGeneralSettings()) return;
		setSaving('general');
		try {
			const updates = objectToUpdates(generalSettings);
			logger.log({ updates });
			const res = await fetchWithAuth('/api/admin/settings', {
				method: 'PATCH',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ updates }),
			});

			if (!res.ok) {
				throw new Error(handleFetchMessage(await res.json(), 'Failed to save settings'));
			}
			toast.success('General settings saved successfully');
			setErrors((prev) => {
				const newErrors = { ...prev };
				delete newErrors.platformName;
				delete newErrors.platformCurrency;
				delete newErrors.commissionRate;
				delete newErrors.maintenanceMessage;
				delete newErrors.logoUrl;
				return newErrors;
			});
		} catch (error) {
			toast.error(handleFetchMessage(error, 'Failed to save settings. Please try again.'));
		} finally {
			setSaving(null);
		}
	};

	const handleSaveNotificationSettings = async () => {
		if (!validateNotificationSettings()) return;
		setSaving('notification');
		try {
			const updates = objectToUpdates(notificationSettings);
			const res = await fetchWithAuth('/api/admin/settings', {
				method: 'PATCH',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ updates }),
			});

			if (!res.ok) {
				throw new Error(handleFetchMessage(await res.json(), 'Failed to save settings'));
			}
			toast.success('Notification settings saved successfully');
			setErrors((prev) => {
				const newErrors = { ...prev };
				delete newErrors.smsApiSecret;
				delete newErrors.emailUser;
				delete newErrors.emailPort;
				return newErrors;
			});
		} catch (error) {
			toast.error(handleFetchMessage(error, 'Failed to save settings. Please try again.'));
		} finally {
			setSaving(null);
		}
	};

	const handleSaveSystemSettings = async () => {
		if (!validateSystemSettings()) return;
		setSaving('system');
		try {
			const updates = objectToUpdates(systemSettings);
			const res = await fetchWithAuth('/api/admin/settings', {
				method: 'PATCH',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ updates }),
			});

			if (!res.ok) {
				throw new Error(handleFetchMessage(await res.json(), 'Failed to save settings'));
			}
			toast.success('System settings saved successfully');
			setErrors((prev) => {
				const newErrors = { ...prev };
				delete newErrors.maxTransactionAmount;
				delete newErrors.minTransactionAmount;
				delete newErrors.sessionTimeout;
				delete newErrors.maxLoginAttempts;
				return newErrors;
			});
		} catch (error) {
			toast.error(handleFetchMessage(error, 'Failed to save settings. Please try again.'));
		} finally {
			setSaving(null);
		}
	};

	const handleSaveSecuritySettings = async () => {
		setSaving('security');
		try {
			const updates = objectToUpdates(securitySettings);
			const res = await fetchWithAuth('/api/admin/settings', {
				method: 'PATCH',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ updates }),
			});

			if (!res.ok) {
				throw new Error(handleFetchMessage(await res.json(), 'Failed to save settings'));
			}
			toast.success('Security settings saved successfully');
		} catch (error) {
			toast.error(handleFetchMessage(error, 'Failed to save settings. Please try again.'));
		} finally {
			setSaving(null);
		}
	};

	if (!isMounted || isLoading) {
		return (
			<div className="p-6 space-y-6  min-h-screen">
				{/* Header */}
				<div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-32 animate-pulse"></div>

				{/* General Settings Card */}
				<div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
					<div className="space-y-6">
						<div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-40 animate-pulse"></div>

						{/* Platform Name */}
						<div className="space-y-2">
							<div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-32 animate-pulse"></div>
							<div className="h-10 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
						</div>

						{/* Country */}
						<div className="space-y-2">
							<div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-32 animate-pulse"></div>
							<div className="h-10 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
						</div>

						<div className="h-10 bg-gray-300 dark:bg-gray-700 rounded w-32 animate-pulse"></div>
					</div>
				</div>

				{/* Notification Settings Card */}
				<div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
					<div className="space-y-6">
						<div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-44 animate-pulse"></div>

						{/* SMS Settings */}
						<div className="space-y-4">
							<div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-28 animate-pulse"></div>
							<div className="space-y-2">
								<div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-24 animate-pulse"></div>
								<div className="h-10 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
							</div>
							<div className="space-y-2">
								<div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-32 animate-pulse"></div>
								<div className="h-10 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
							</div>
						</div>

						{/* Email Settings */}
						<div className="space-y-4">
							<div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-32 animate-pulse"></div>
							<div className="space-y-2">
								<div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-28 animate-pulse"></div>
								<div className="h-10 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
							</div>
							<div className="space-y-2">
								<div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-32 animate-pulse"></div>
								<div className="h-10 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
							</div>
						</div>

						{/* Save Button */}
						<div className="h-10 bg-gray-300 dark:bg-gray-700 rounded w-32 animate-pulse"></div>
					</div>
				</div>

				{/* System Settings Card */}
				<div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
					<div className="space-y-6">
						<div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-36 animate-pulse"></div>

						{/* Max Transaction Amount */}
						<div className="space-y-2">
							<div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-44 animate-pulse"></div>
							<div className="h-10 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
						</div>

						{/* Min Transaction Amount */}
						<div className="space-y-2">
							<div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-44 animate-pulse"></div>
							<div className="h-10 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
						</div>

						{/* Session Timeout */}
						<div className="space-y-2">
							<div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-36 animate-pulse"></div>
							<div className="h-10 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
						</div>

						{/* Backup Frequency */}
						<div className="space-y-2">
							<div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-36 animate-pulse"></div>
							<div className="h-10 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
						</div>

						{/* Save Button */}
						<div className="h-10 bg-gray-300 dark:bg-gray-700 rounded w-32 animate-pulse"></div>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="p-6 space-y-6  min-h-screen" suppressHydrationWarning={true}>
			{/* Header */}
			<h1 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h1>

			{/* General Settings */}

			<Card className="p-6 bg-white dark:bg-gray-800 border-0 shadow-sm">
				<div className="space-y-6">
					<h2 className="text-lg font-semibold text-gray-900 dark:text-white">General Settings</h2>

					{/* Platform Name */}
					<div className="space-y-2">
						<label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Platform Name</label>
						<input
							type="text"
							value={generalSettings.platformName}
							onChange={(e) => setGeneralSettings((prev) => ({ ...prev, platformName: e.target.value }))}
							placeholder="Enter platform name"
							className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 ${
								errors.platformName ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'
							}`}
						/>
						{errors.platformName && <p className="text-sm text-red-600 dark:text-red-400">{errors.platformName}</p>}
					</div>

					{/* Referral Generation */}
					<div className="space-y-2">
						<label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Referral Generation</label>
						<input
							type="text"
							value={generalSettings.referralGeneration ?? 1}
							onChange={(e) => setGeneralSettings((prev) => ({ ...prev, referralGeneration: e.target.value }))}
							placeholder="Enter number of generations for referral bonus"
							className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 ${
								errors.referralGeneration ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'
							}`}
						/>
						{errors.referralGeneration && <p className="text-sm text-red-600 dark:text-red-400">{errors.referralGeneration}</p>}
						<p className="text-sm text-gray-500 dark:text-gray-400">Number of generations a referral bonus applies (e.g. 1, 2, 3, 4 etc.)</p>
					</div>

					{/* Auto Matching */}
					<div className="space-y-2">
						<label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Auto Matching</label>
						<button
							onClick={() => setGeneralSettings((prev) => ({ ...prev, autoMatching: !prev.autoMatching }))}
							className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${generalSettings.autoMatching ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'}`}
						>
							<span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${generalSettings.autoMatching ? 'translate-x-6' : 'translate-x-1'}`} />
						</button>
						<p className="text-sm text-gray-500 dark:text-gray-400">Enable automatic matching of PH and GH requests</p>
					</div>

					{/* Commission Rate */}
					<div className="space-y-2">
						<label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Commission Rate (%)</label>
						<input
							type="text"
							value={generalSettings.commissionRate}
							onChange={(e) => setGeneralSettings((prev) => ({ ...prev, commissionRate: e.target.value }))}
							placeholder="Enter commission rate"
							className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 ${
								errors.commissionRate ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'
							}`}
						/>
						{errors.commissionRate && <p className="text-sm text-red-600 dark:text-red-400">{errors.commissionRate}</p>}
						<p className="text-sm text-gray-500 dark:text-gray-400">Percentage of bonus applied to each generation (e.g. 10, 5, 2.5, 1.25 etc.)</p>
					</div>

					{/* Platform Base Currency */}
					<div className="space-y-2">
						<label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Platform Base Currency</label>
						<input
							type="text"
							value={generalSettings.platform_base_currency ?? ''}
							onChange={(e) => setGeneralSettings((prev) => ({ ...prev, platform_base_currency: e.target.value }))}
							placeholder="Enter base currency (e.g. USD, NGN)"
							className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
						/>
						<p className="text-sm text-gray-500 dark:text-gray-400">The base currency for all platform transactions (e.g. USD, NGN).</p>
					</div>

					{/* Referral Bonus Withdrawable Amount */}
					<div className="space-y-2">
						<label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Referral Bonus Withdrawable Amount</label>
						<input
							type="number"
							min={0}
							value={generalSettings.referralBonusWithdrawableAmount ?? 0}
							onChange={(e) => setGeneralSettings((prev) => ({ ...prev, referralBonusWithdrawableAmount: Number(e.target.value) }))}
							placeholder="Enter minimum bonus amount for withdrawal"
							className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
						/>
						<p className="text-sm text-gray-500 dark:text-gray-400">Minimum referral bonus amount required before a user can withdraw their bonus.</p>
					</div>

					{/* Referral Bonus Release Type */}
					<div className="space-y-2">
						<label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Referral Bonus Release Condition</label>
						<select
							value={generalSettings.referralBonusReleaseType ?? 'completed'}
							onChange={(e) => setGeneralSettings((prev) => ({ ...prev, referralBonusReleaseType: e.target.value as 'completed' | 'matured' }))}
							className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
						>
							<option value="completed">When user's PH is completed</option>
							<option value="matured">When user's PH is matured</option>
						</select>
						<p className="text-sm text-gray-500 dark:text-gray-400">Choose when the referral bonus should be released: after the user's Provide Help (PH) is completed or after it is matured.</p>
					</div>

					{/* Maintenance Mode */}
					<div className="space-y-2">
						<label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Maintenance Mode</label>
						<button
							onClick={() => setGeneralSettings((prev) => ({ ...prev, maintenanceMode: !prev.maintenanceMode }))}
							className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${generalSettings.maintenanceMode ? 'bg-red-600' : 'bg-gray-300 dark:bg-gray-600'}`}
						>
							<span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${generalSettings.maintenanceMode ? 'translate-x-6' : 'translate-x-1'}`} />
						</button>
						{generalSettings.maintenanceMode && (
							<div className="space-y-2">
								<label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Maintenance Message</label>
								<textarea
									value={generalSettings.maintenanceMessage}
									onChange={(e) => setGeneralSettings((prev) => ({ ...prev, maintenanceMessage: e.target.value }))}
									placeholder="Enter maintenance message"
									rows={3}
									className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 resize-none ${
										errors.maintenanceMessage ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'
									}`}
								/>
								{errors.maintenanceMessage && <p className="text-sm text-red-600 dark:text-red-400">{errors.maintenanceMessage}</p>}
							</div>
						)}
					</div>

					<Button onClick={handleSaveGeneralSettings} disabled={saving === 'general'} className="bg-blue-600 hover:bg-blue-700 text-white whitespace-nowrap">
						{saving === 'general' ? (
							<>
								<i className="ri-loader-4-line animate-spin w-4 h-4 flex items-center justify-center mr-2"></i>
								Saving...
							</>
						) : (
							'Save Settings'
						)}
					</Button>
				</div>
			</Card>

			{/* Security & Authentication Settings */}
			<Card className="p-6 bg-white dark:bg-gray-800 border-0 shadow-sm">
				<div className="space-y-6">
					<h2 className="text-lg font-semibold text-gray-900 dark:text-white">Security & Authentication</h2>

					{/* Account Creation & Login */}
					<div className="space-y-4">
						<h3 className="text-md font-medium text-gray-900 dark:text-white">Account Management</h3>

						<div className="space-y-4">
							<div className="flex items-center justify-between">
								<div>
									<label className="text-sm font-medium text-gray-700 dark:text-gray-300">Allow User Login</label>
									<p className="text-sm text-gray-500 dark:text-gray-400">Allow users to log in to their accounts</p>
								</div>
								<button
									onClick={() => setSecuritySettings((prev) => ({ ...prev, allowLogin: !prev.allowLogin }))}
									className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${securitySettings.allowLogin ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'}`}
								>
									<span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${securitySettings.allowLogin ? 'translate-x-6' : 'translate-x-1'}`} />
								</button>
							</div>

							<div className="flex items-center justify-between">
								<div>
									<label className="text-sm font-medium text-gray-700 dark:text-gray-300">Allow Account Creation</label>
									<p className="text-sm text-gray-500 dark:text-gray-400">Allow new users to create accounts</p>
								</div>
								<button
									onClick={() => setSecuritySettings((prev) => ({ ...prev, allowAccountCreation: !prev.allowAccountCreation }))}
									className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${securitySettings.allowAccountCreation ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'}`}
								>
									<span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${securitySettings.allowAccountCreation ? 'translate-x-6' : 'translate-x-1'}`} />
								</button>
							</div>

							{/* Allow Duplicate Phone Number Signup */}
							<div className="flex items-center justify-between mt-4">
								<div>
									<label className="text-sm font-medium text-gray-700 dark:text-gray-300">Allow Duplicate Phone Number Signup</label>
									<p className="text-sm text-gray-500 dark:text-gray-400">Allow users to sign up with a phone number that is already registered.</p>
								</div>
								<button
									onClick={() => setSecuritySettings((prev) => ({ ...prev, allowDuplicatePhoneSignup: !prev.allowDuplicatePhoneSignup }))}
									className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${securitySettings.allowDuplicatePhoneSignup ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'}`}
								>
									<span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${securitySettings.allowDuplicatePhoneSignup ? 'translate-x-6' : 'translate-x-1'}`} />
								</button>
							</div>
						</div>
					</div>

					<Button onClick={handleSaveSecuritySettings} disabled={saving === 'security'} className="bg-blue-600 hover:bg-blue-700 text-white whitespace-nowrap">
						{saving === 'security' ? (
							<>
								<i className="ri-loader-4-line animate-spin w-4 h-4 flex items-center justify-center mr-2"></i>
								Saving...
							</>
						) : (
							'Save Security Settings'
						)}
					</Button>
				</div>
			</Card>

			{/* Notification Settings */}
			<Card className="p-6 bg-white dark:bg-gray-800 border-0 shadow-sm">
				<div className="space-y-6">
					<h2 className="text-lg font-semibold text-gray-900 dark:text-white">Notification Settings</h2>

					{/* SMS Settings */}
					<div className="space-y-4">
						<h3 className="text-md font-medium text-gray-900 dark:text-white">SMS Settings</h3>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div className="space-y-2">
								<label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Sender ID</label>
								<input
									type="text"
									value={notificationSettings.smsSenderId}
									disabled
									placeholder="Sender ID is disabled"
									className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-400 placeholder-gray-400 cursor-not-allowed"
								/>
							</div>

							{/* SMS Provider Dropdown */}
							<div className="space-y-2">
								<label className="block text-sm font-medium text-gray-700 dark:text-gray-300">SMS Provider</label>
								<select
									value={notificationSettings.smsProvider}
									onChange={(e) => setNotificationSettings((prev) => ({ ...prev, smsProvider: e.target.value }))}
									className="w-full px-3 py-2 pr-8 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
								>
									<option value="TwilioSmsProvider">Twilio</option>
									<option value="termii">Termii</option>
								</select>
							</div>
						</div>
					</div>

					{/* Email Settings */}
					<div className="space-y-4">
						<h3 className="text-md font-medium text-gray-900 dark:text-white">Email Settings</h3>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div className="space-y-2">
								<label className="block text-sm font-medium text-gray-700 dark:text-gray-300">SMTP Host</label>
								<input
									type="text"
									value={notificationSettings.emailHost}
									onChange={(e) => setNotificationSettings((prev) => ({ ...prev, emailHost: e.target.value }))}
									placeholder="Enter SMTP host"
									className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
								/>
							</div>

							<div className="space-y-2">
								<label className="block text-sm font-medium text-gray-700 dark:text-gray-300">SMTP Port</label>
								<input
									type="number"
									min="1"
									max="65535"
									value={notificationSettings.emailPort}
									onChange={(e) => setNotificationSettings((prev) => ({ ...prev, emailPort: parseInt(e.target.value) || 587 }))}
									placeholder="Enter SMTP port"
									className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 ${
										errors.emailPort ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'
									}`}
								/>
								{errors.emailPort && <p className="text-sm text-red-600 dark:text-red-400">{errors.emailPort}</p>}
							</div>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div className="space-y-2">
								<label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email Username</label>
								<input
									type="email"
									value={notificationSettings.emailUser}
									onChange={(e) => setNotificationSettings((prev) => ({ ...prev, emailUser: e.target.value }))}
									placeholder="Enter email username"
									className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 ${
										errors.emailUser ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'
									}`}
								/>
								{errors.emailUser && <p className="text-sm text-red-600 dark:text-red-400">{errors.emailUser}</p>}
							</div>

							<div className="space-y-2">
								<label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email Password</label>
								<input
									type="password"
									value={notificationSettings.emailPassword}
									onChange={(e) => setNotificationSettings((prev) => ({ ...prev, emailPassword: e.target.value }))}
									placeholder="Enter email password"
									className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
								/>
							</div>
						</div>

						<div className="space-y-2">
							<label className="block text-sm font-medium text-gray-700 dark:text-gray-300">From Name</label>
							<input
								type="text"
								value={notificationSettings.emailFromName}
								onChange={(e) => setNotificationSettings((prev) => ({ ...prev, emailFromName: e.target.value }))}
								placeholder="Enter from name"
								className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
							/>
						</div>
					</div>

					<Button onClick={handleSaveNotificationSettings} disabled={saving === 'notification'} className="bg-blue-600 hover:bg-blue-700 text-white whitespace-nowrap">
						{saving === 'notification' ? (
							<>
								<i className="ri-loader-4-line animate-spin w-4 h-4 flex items-center justify-center mr-2"></i>
								Saving...
							</>
						) : (
							'Save Settings'
						)}
					</Button>
				</div>
			</Card>

			{/* System Settings */}
			<Card className="p-6 bg-white dark:bg-gray-800 border-0 shadow-sm">
				<div className="space-y-6">
					<h2 className="text-lg font-semibold text-gray-900 dark:text-white">System Settings</h2>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div className="space-y-2">
							<label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Session Timeout (minutes)</label>
							<input
								type="number"
								min="5"
								max="480"
								value={systemSettings.sessionTimeout}
								onChange={(e) => setSystemSettings((prev) => ({ ...prev, sessionTimeout: parseInt(e.target.value) || 60 }))}
								placeholder="Enter session timeout"
								className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 ${
									errors.sessionTimeout ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'
								}`}
							/>
							{errors.sessionTimeout && <p className="text-sm text-red-600 dark:text-red-400">{errors.sessionTimeout}</p>}
						</div>

						<div className="space-y-2">
							<label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Backup Frequency</label>
							<select
								value={systemSettings.backupFrequency}
								onChange={(e) => setSystemSettings((prev) => ({ ...prev, backupFrequency: e.target.value }))}
								className="w-full px-3 py-2 pr-8 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
							>
								<option value="hourly">Hourly</option>
								<option value="daily">Daily</option>
								<option value="weekly">Weekly</option>
								<option value="monthly">Monthly</option>
							</select>
						</div>
					</div>

					<div className="space-y-2">
						<label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Maximum Login Attempts</label>
						<input
							type="number"
							min="1"
							max="20"
							value={systemSettings.maxLoginAttempts}
							onChange={(e) => setSystemSettings((prev) => ({ ...prev, maxLoginAttempts: parseInt(e.target.value) || 5 }))}
							placeholder="Enter maximum login attempts"
							className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 ${
								errors.maxLoginAttempts ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'
							}`}
						/>
						{errors.maxLoginAttempts && <p className="text-sm text-red-600 dark:text-red-400">{errors.maxLoginAttempts}</p>}
					</div>

					{/* PH/GH Enforcement & Penalty Settings */}
					{/* Cron Job Settings */}
					<div className="space-y-6 mt-6 p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
						<h3 className="text-md font-semibold text-gray-900 dark:text-white mb-2">Cron Job Settings</h3>
						<div className="flex items-center justify-between">
							<div>
								<label className="text-sm font-medium text-gray-700 dark:text-gray-300">Enable Cron Job</label>
								<p className="text-sm text-gray-500 dark:text-gray-400">Toggle to enable or disable scheduled cron jobs.</p>
							</div>
							<button
								onClick={() => setSystemSettings((prev) => ({ ...prev, enableCronJob: !prev.enableCronJob }))}
								className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${systemSettings.enableCronJob ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'}`}
							>
								<span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${systemSettings.enableCronJob ? 'translate-x-6' : 'translate-x-1'}`} />
							</button>
						</div>
					</div>
					<div className="space-y-6 mt-6 p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
						<h3 className="text-md font-semibold text-gray-900 dark:text-white mb-2">PH/GH Enforcement & Penalty Settings</h3>
						{/* Enforce Phone Number Before PH/GH */}
						<div className="flex items-center justify-between">
							<div>
								<label className="text-sm font-medium text-gray-700 dark:text-gray-300">Enforce Phone Number Before PH/GH</label>
								<p className="text-sm text-gray-500 dark:text-gray-400">Require users to have a valid phone number before they can create PH or GH requests.</p>
							</div>
							<button
								onClick={() => setSystemSettings((prev) => ({ ...prev, enforcePhoneBeforePHGH: !prev.enforcePhoneBeforePHGH }))}
								className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${systemSettings.enforcePhoneBeforePHGH ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'}`}
							>
								<span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${systemSettings.enforcePhoneBeforePHGH ? 'translate-x-6' : 'translate-x-1'}`} />
							</button>
						</div>
						{/* Enforce bank account Details Before PH/GH */}
						<div className="flex items-center justify-between">
							<div>
								<label className="text-sm font-medium text-gray-700 dark:text-gray-300">Enforce Bank Details Before PH/GH</label>
								<p className="text-sm text-gray-500 dark:text-gray-400">Require bank account details before PH or GH</p>
							</div>
							<button
								onClick={() => setSystemSettings((prev) => ({ ...prev, enforceMomoBeforePHGH: !prev.enforceMomoBeforePHGH }))}
								className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${systemSettings.enforceMomoBeforePHGH ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'}`}
							>
								<span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${systemSettings.enforceMomoBeforePHGH ? 'translate-x-6' : 'translate-x-1'}`} />
							</button>
						</div>
						{/* Countdown Duration */}
						<div className="space-y-2">
							<label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Countdown Duration</label>
							<input
								type="text"
								value={systemSettings.countdownDuration}
								onChange={(e) => setSystemSettings((prev) => ({ ...prev, countdownDuration: e.target.value }))}
								placeholder='e.g. "7 days", "1 month"'
								className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 ${
									errors.countdownDuration ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'
								}`}
							/>
							{errors.countdownDuration && <p className="text-sm text-red-600 dark:text-red-400">{errors.countdownDuration}</p>}
							<p className="text-sm text-gray-500 dark:text-gray-400">Format: "7 days", "30 days", "1 month", etc.</p>
						</div>
						{/* Allow Extra Time On Proof Upload */}
						<div className="flex items-center justify-between">
							<div>
								<label className="text-sm font-medium text-gray-700 dark:text-gray-300">Allow Extra Time On Proof Upload</label>
								<p className="text-sm text-gray-500 dark:text-gray-400">If enabled, users will get more time when they upload proof of payment.</p>
							</div>
							<button
								onClick={() => setSystemSettings((prev) => ({ ...prev, allowExtraTimeOnProof: !prev.allowExtraTimeOnProof }))}
								className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${systemSettings.allowExtraTimeOnProof ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'}`}
							>
								<span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${systemSettings.allowExtraTimeOnProof ? 'translate-x-6' : 'translate-x-1'}`} />
							</button>
						</div>
						{/* Extra Time Amount */}
						<div className="space-y-2">
							<label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Extra Time Amount</label>
							<input
								type="text"
								value={systemSettings.extraTimeAmount}
								onChange={(e) => setSystemSettings((prev) => ({ ...prev, extraTimeAmount: e.target.value }))}
								placeholder='e.g. "30 minutes", "2 hours"'
								className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 ${
									errors.extraTimeAmount ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'
								}`}
							/>
							{errors.extraTimeAmount && <p className="text-sm text-red-600 dark:text-red-400">{errors.extraTimeAmount}</p>}
							<p className="text-sm text-gray-500 dark:text-gray-400">Format: "30 minutes", "2 hours", "1 day", etc.</p>
						</div>
						{/* Penalty Application Setting */}
						<div className="space-y-2">
							<label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Penalty Application</label>
							<select
								value={systemSettings.penaltyApplication}
								onChange={(e) => setSystemSettings((prev) => ({ ...prev, penaltyApplication: e.target.value as 'both' | 'ph' | 'gh' }))}
								className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
							>
								<option value="both">Apply to both users</option>
								<option value="ph">Apply to PH user alone if proof of payment is not uploaded</option>
								<option value="gh">Apply to GH user alone if proof of payment is uploaded</option>
							</select>
							<p className="text-sm text-gray-500 dark:text-gray-400">Choose how penalty is applied when proof of payment is missing or uploaded.</p>
						</div>
					</div>

					<Button onClick={handleSaveSystemSettings} disabled={saving === 'system'} className="bg-blue-600 hover:bg-blue-700 text-white whitespace-nowrap">
						{saving === 'system' ? (
							<>
								<i className="ri-loader-4-line animate-spin w-4 h-4 flex items-center justify-center mr-2"></i>
								Saving...
							</>
						) : (
							'Save Settings'
						)}
					</Button>
				</div>
			</Card>
		</div>
	);
}

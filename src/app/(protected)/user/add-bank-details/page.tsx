import { Metadata } from 'next';
import Content from './content';

export const metadata: Metadata = {
	title: 'Add Bank account number Details',
	description: 'Add Bank account number Details page.',
};

export default function Page() {
	return <Content />;
}

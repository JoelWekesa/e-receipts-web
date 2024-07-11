import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Total } from '@/models/inventory/total';
import useInvValue from '@/services/inventory/values/store';
import currencyFormat from '@/utils/currency';
import { FC } from 'react';

interface Props {
	title: string;
	description: string;
	value: Total;
	url: string;
}

const InvValue: FC<Props> = ({title, description, value, url}) => {
	const {data: invValue} = useInvValue({url, initialData: value});

	return (
		<Card x-chunk='dashboard-07-chunk-0'>
			<CardHeader>
				<CardTitle>{title}</CardTitle>
				<CardDescription>
					<div className='flex flex-row gap-2'>
						<p>{description}</p>
						<p>{currencyFormat.format(invValue?.total || 0)}</p>
					</div>
				</CardDescription>
			</CardHeader>
		</Card>
	);
};

export default InvValue;

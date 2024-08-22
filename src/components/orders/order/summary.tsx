import CartSummary from '@/components/storefront/orders/cart-summary';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {ClientOrder} from '@/models/orders/order-client';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import {FC} from 'react';

dayjs.extend(relativeTime);

interface Props {
	order: ClientOrder;
}

const SummaryCard: FC<Props> = ({order}) => {
	return (
		<Card x-chunk='dashboard-05-chunk-3 py-3 px-9'>
			<CardHeader>
				<CardTitle>
					<div className='flex flex-row justify-between p-2'>
						<span>Summary</span>
					</div>
				</CardTitle>
				<CardDescription className='p-2'>Customer order items summary</CardDescription>
			</CardHeader>
			<CardContent className='py-3 px-9'>
				<CartSummary cart={order.cart} />
			</CardContent>
		</Card>
	);
};

export default SummaryCard;

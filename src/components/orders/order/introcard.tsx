import {Button} from '@/components/ui/button';
import {Card, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {ClientOrder} from '@/models/orders/order-client';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import {MoreHorizontal} from 'lucide-react';
import {FC} from 'react';
import OrderDropDown from './dropdown';
import {OrderStatus} from '@/models/orders/orders-store';

dayjs.extend(relativeTime);

interface Props {
	order: ClientOrder;
}

const IntroCard: FC<Props> = ({order}) => {
	return (
		<div className='w-full md:w-[60%]'>
			<Card x-chunk='dashboard-05-chunk-3'>
				<CardHeader>
					<CardTitle>
						<div className='flex flex-row justify-between p-2'>
							<span>Order #{order.id}</span>
							<OrderDropDown drop={{label: 'Order Actions', order}}>
								<Button variant='outline' size='icon' disabled={order.status === OrderStatus.COMPLETED}>
									<MoreHorizontal className='h-4 w-4' />
								</Button>
							</OrderDropDown>
						</div>
					</CardTitle>
					<CardDescription className='p-2'>Order placed {dayjs().to(dayjs(order.createdAt))}</CardDescription>
				</CardHeader>
			</Card>
		</div>
	);
};

export default IntroCard;

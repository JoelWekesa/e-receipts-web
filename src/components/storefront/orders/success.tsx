'use client';
import {Separator} from '@/components/ui/separator';
import {ClientOrder} from '@/models/orders/order-client';
import dayjs from 'dayjs';
import {FC, useState} from 'react';
import CartSummary from './cart-summary';
import ClientShipping from './shipping';
import {Button} from '@/components/ui/button';
import {Check, Copy, ShoppingCart} from 'lucide-react';
import Link from 'next/link';

interface Props {
	order: ClientOrder;
}

const OrderSuccessComponent: FC<Props> = ({order}) => {
	const [copied, setCopied] = useState(false);

	const handleCopy = () => {
		if (!copied) {
			navigator.clipboard.writeText(order.id);
		}
		setCopied(true);

		setTimeout(() => {
			setCopied(false);
		}, 2000);
	};

	return (
		<div className='py-4 px-7 md:px-20'>
			<div className='flex flex-col gap-5'>
				<p className='text-4xl font-bold'>Thank you!</p>
				<p className='text-xl font-bold'>Your order was placed successfully</p>
			</div>
			<div className='flex flex-col gap-5 mt-7 '>
				<p>
					<span>Order Date: </span>
					<span className='text-muted-foreground'>{dayjs(order.createdAt).format('ddd DD MMM YYYY HH:mm')}</span>
				</p>
				<p>
					<span>Your order id is: </span>

					<span className='text-muted-foreground'>
						{order.id}{' '}
						<Button variant='outline' size='icon' onClick={handleCopy} className='ml-2'>
							{copied ? <Check size={18} /> : <Copy size={18} />}
						</Button>
					</span>
				</p>
			</div>
			<div className='mt-7'>
				<div className='flex flex-col gap-5'>
					<p className='text-4xl font-bold'>Summary</p>
					<div>
						<Separator />
						<CartSummary cart={order.cart} />
						<Separator />
					</div>
				</div>
			</div>
			<div className='mt-7'>
				<div className='flex flex-col gap-5'>
					<p className='text-4xl font-bold'>Shipping</p>
					<div>
						<Separator />
						<ClientShipping shipping={order.shipping} />
					</div>
				</div>
			</div>
			<div className='mt-7 w-full'>
				<Link href={`/shop/${order.store.name}`}>
					<Button>
						<ShoppingCart className='h-5 w-4 mr-2' />
						Continue Shopping
					</Button>
				</Link>
			</div>
		</div>
	);
};

export default OrderSuccessComponent;

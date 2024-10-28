import {Avatar, AvatarFallback} from '@/components/ui/avatar';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Separator} from '@/components/ui/separator';
import {ClientOrder} from '@/models/orders/order-client';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import {FC} from 'react';

dayjs.extend(relativeTime);

interface Props {
	order: ClientOrder;
}

const CustomerCard: FC<Props> = ({order}) => {
	const nameInitials =
		order.shipping.firstName && order.shipping.lastName
			? `${order.shipping.firstName[0]}${order.shipping.lastName[0]}`
			: 'CN';

	return (
		<div className='w-full'>
			<Card x-chunk='dashboard-05-chunk-3 py-3 px-9'>
				<CardHeader>
					<CardTitle>
						<div className='flex flex-row justify-between p-2'>
							<span>Customer</span>
						</div>
					</CardTitle>
					<CardDescription className='p-2'>Customer shipping details</CardDescription>
				</CardHeader>
				<CardContent>
					<div className='flex flex-row p-2 gap-2'>
						<Avatar>
							<AvatarFallback>{nameInitials}</AvatarFallback>
						</Avatar>
						<div className='flex flex-col justify-between'>
							<p className='text-lg'>
								{order.shipping.firstName} {order.shipping.lastName}
							</p>
							<p className='text-sm text-muted-foreground'>{order.shipping.address}</p>
						</div>
					</div>
					<div className='hidden md:block'>
						<div className='flex h-11 items-center space-x-9 p-2 my-5'>
							<div className='flex flex-col gap-2 py-5'>
								<p className='text-sm text-muted-foreground'>Phone</p>
								<p className='text-md'>
									<a href={`tel:${order.shipping.phone}`}>{order.shipping.phone}</a>
								</p>
							</div>

							<Separator orientation='vertical' />
							<div className='flex flex-col gap-2 py-5'>
								<p className='text-sm text-muted-foreground'>Email</p>
								<p className='text-md'>
									<a href={`mailto:${order.shipping.email}`}>{order.shipping.email}</a>
								</p>
							</div>
							{order.shipping.address && (
								<>
									<Separator orientation='vertical' />
									<div className='flex flex-col gap-2 py-5'>
										<p className='text-sm text-muted-foreground'>Address</p>
										<p className='text-md'>{order.shipping.address}</p>
									</div>
								</>
							)}
						</div>
					</div>
					<div className='block md:hidden'>
						<MobileCustomerContentView order={order} />
					</div>
				</CardContent>
			</Card>
		</div>
	);
};

export default CustomerCard;

export const MobileCustomerContentView: FC<Props> = ({order}) => {
	return (
		<div className='flex flex-col gap-2 my-5 p-2'>
			<div className='flex flex-col gap-2 py-2'>
				<p className='text-sm text-muted-foreground'>Phone</p>
				<p className='text-md'>
					<a href={`tel:${order.shipping.phone}`}>{order.shipping.phone}</a>
				</p>
			</div>

			<Separator />
			<div className='flex flex-col gap-2 py-2'>
				<p className='text-sm text-muted-foreground'>Email</p>
				<p className='text-md'>
					<a href={`mailto:${order.shipping.email}`}>{order.shipping.email}</a>
				</p>
			</div>
			<Separator />
			{order.shipping.city && (
				<>
					<div className='flex flex-col gap-2 py-2'>
						<p className='text-sm text-muted-foreground'>City</p>
						<p className='text-md'>{order.shipping.city}</p>
					</div>
					<Separator />
				</>
			)}
		</div>
	);
};

'use client';
import {CheckCheck, Clock, EyeIcon, Loader2} from 'lucide-react';

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {OrderStatus, StoreOrder} from '@/models/orders/orders-store';
import {FC, ReactNode} from 'react';
import Link from 'next/link';
import useProcessOrder from '@/services/orders/process-order.dto';
import {useSession} from 'next-auth/react';

interface Drop {
	label: string;
	order: StoreOrder;
}

const StoreOrdersDropDown: FC<{drop: Drop; children: ReactNode}> = ({drop, children}) => {
	const {mutate: process, isPending: loading} = useProcessOrder();

	const {data: session} = useSession({
		required: true,
	});

	const handleProcessOrder = async (status: OrderStatus) => {
		await process({
			token: session?.accessToken || '',
			id: drop.order.id,
			status,
			cash: 0,
			mpesa: 0,
		});
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
			<DropdownMenuContent className='w-56'>
				<DropdownMenuLabel>{drop.label}</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<Link href={`/orders/order/${drop.order.id}`}>
						<DropdownMenuItem className='cursor-pointer'>
							<EyeIcon className='mr-2 h-4 w-4' />
							<span>View Order</span>
						</DropdownMenuItem>
					</Link>

					{drop.order.status === OrderStatus.PENDING && (
						<DropdownMenuItem className='cursor-pointer' onClick={() => handleProcessOrder(OrderStatus.PROCESSING)}>
							{loading ? <Loader2 className='mr-2 h-4 w-4 animate-spin' /> : <Clock className='mr-2 h-4 w-4' />}
							<span>Move To Processing</span>
						</DropdownMenuItem>
					)}

					{drop.order.status !== OrderStatus.COMPLETED && (
						<Link href={`/orders/order/${drop.order.id}`}>
							<DropdownMenuItem className='cursor-pointer'>
								<CheckCheck className='mr-2 h-4 w-4' color='green' />

								<span>Complete Order</span>
							</DropdownMenuItem>
						</Link>
					)}
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default StoreOrdersDropDown;

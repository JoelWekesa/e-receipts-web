'use client';
import {CheckCheck, Clock} from 'lucide-react';

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {ClientOrder} from '@/models/orders/order-client';
import {OrderStatus} from '@/models/orders/orders-store';
import {FC, ReactNode} from 'react';

interface Drop {
	label: string;
	order: ClientOrder;
}

const OrderDropDown: FC<{drop: Drop; children: ReactNode}> = ({drop, children}) => {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
			<DropdownMenuContent className='w-56'>
				<DropdownMenuLabel>{drop.label}</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					{drop.order.status === 'pending' && (
						<DropdownMenuItem className='cursor-pointer'>
							<Clock className='mr-2 h-4 w-4' />
							<span>Move To Processing</span>
						</DropdownMenuItem>
					)}

					{drop.order.status === OrderStatus.PROCESSING ||
						(drop.order.status === OrderStatus.PENDING && (
							<DropdownMenuItem className='cursor-pointer'>
								<CheckCheck className='mr-2 h-4 w-4' color='green' />
								<span>Complete Order</span>
							</DropdownMenuItem>
						))}
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default OrderDropDown;

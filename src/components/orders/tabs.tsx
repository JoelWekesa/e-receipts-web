import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs';
import {OrderStatus, StoreOrder} from '@/models/orders/orders-store';
import {FC} from 'react';
import StoreOrdersTable from './store-orders';
interface Props {
	pending: StoreOrder[];
	processing: StoreOrder[];
	completed: StoreOrder[];
	storeId: string;
	teamId?: string;
}

const OrderTabs: FC<Props> = ({pending, processing, completed, storeId, teamId}) => {
	return (
		<Tabs defaultValue={OrderStatus.PENDING} className='pt-6'>
			<div className='flex items-center px-7'>
				<TabsList className='grid grid-cols-3'>
					<TabsTrigger value={OrderStatus.PENDING}>Pending</TabsTrigger>
					<TabsTrigger value={OrderStatus.PROCESSING}>Processing</TabsTrigger>
					<TabsTrigger value={OrderStatus.COMPLETED}>Completed</TabsTrigger>
				</TabsList>
			</div>

			<TabsContent value={OrderStatus.PENDING} className='px-7'>
				<Card x-chunk='dashboard-05-chunk-3'>
					<CardHeader>
						<CardTitle>Pending</CardTitle>
						<CardDescription>Orders that are pending.</CardDescription>
					</CardHeader>
					<CardContent className='space-y-2'>
						<StoreOrdersTable orders={pending} storeId={storeId} status={OrderStatus.PENDING} teamId={teamId} />
					</CardContent>
				</Card>
			</TabsContent>
			<TabsContent value={OrderStatus.PROCESSING} className='px-7'>
				<Card x-chunk='dashboard-05-chunk-3'>
					<CardHeader>
						<CardTitle>Processing</CardTitle>
						<CardDescription>Orders that are being processed.</CardDescription>
					</CardHeader>
					<CardContent className='space-y-2'>
						<StoreOrdersTable orders={processing} storeId={storeId} status={OrderStatus.PROCESSING} teamId={teamId} />
					</CardContent>
				</Card>
			</TabsContent>
			<TabsContent value={OrderStatus.COMPLETED} className='px-7'>
				<Card x-chunk='dashboard-05-chunk-3'>
					<CardHeader>
						<CardTitle>Completed</CardTitle>
						<CardDescription>Orders that have been completed.</CardDescription>
					</CardHeader>
					<CardContent className='space-y-2'>
						<StoreOrdersTable orders={completed} storeId={storeId} status={OrderStatus.COMPLETED} teamId={teamId} />
					</CardContent>
				</Card>
			</TabsContent>
		</Tabs>
	);
};

export default OrderTabs;

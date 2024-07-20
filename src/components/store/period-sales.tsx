'use client';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs';
import {Receipt} from '@/models/receipts/receipt';
import {Period} from '@/services/receipts/businessperiod';
import useStorePeriodSales from '@/services/store/period-sales';
import {FC} from 'react';
import StoreSalesTable from './shared/sales-table';
import {Store} from '@/models/store';

const StorePeriodSales: FC<{
	receiptsDay: Receipt[];
	receiptsWeek: Receipt[];
	receiptsMonth: Receipt[];
	receiptsYear: Receipt[];
	allReceipts: Receipt[];
	store: Store;
}> = ({receiptsDay, receiptsWeek, receiptsMonth, receiptsYear, allReceipts, store: {id: storeId, name}}) => {
	const {data: daily} = useStorePeriodSales({
		period: Period.day,
		storeId,
		sales: receiptsDay,
	});
	const {data: weekly} = useStorePeriodSales({
		period: Period.week,
		storeId,
		sales: receiptsWeek,
	});
	const {data: monthly} = useStorePeriodSales({
		period: Period.month,
		storeId,
		sales: receiptsMonth,
	});
	const {data: yearly} = useStorePeriodSales({
		period: Period.year,
		storeId,
		sales: receiptsYear,
	});
	const {data: allTime} = useStorePeriodSales({
		period: Period.alltime,
		storeId,
		sales: allReceipts,
	});

	return (
		<Tabs defaultValue={Period.day} className='hidden lg:block'>
			<div className='flex items-center'>
				<TabsList>
					<TabsTrigger value='day'>Today</TabsTrigger>
					<TabsTrigger value='week'>Week</TabsTrigger>
					<TabsTrigger value='month'>Month</TabsTrigger>
					<TabsTrigger value='year'>Year</TabsTrigger>
					<TabsTrigger value='alltime'>All Time</TabsTrigger>
				</TabsList>
			</div>

			<TabsContent value={Period.day}>
				<Card x-chunk='dashboard-05-chunk-3'>
					<CardHeader className='px-7'>
						<CardTitle>Sales</CardTitle>
						<CardDescription>{`Today's sales from ${name}`}</CardDescription>
					</CardHeader>
					<CardContent>
						<StoreSalesTable sales={daily} period={Period.day} storeId={storeId} />
					</CardContent>
				</Card>
			</TabsContent>
			<TabsContent value={Period.week}>
				<Card x-chunk='dashboard-05-chunk-3'>
					<CardHeader className='px-7'>
						<CardTitle>Sales</CardTitle>
						<CardDescription>{`This week's sales from ${name}`}</CardDescription>
					</CardHeader>
					<CardContent>
						<StoreSalesTable sales={weekly} period={Period.week} storeId={storeId} />
					</CardContent>
				</Card>
			</TabsContent>
			<TabsContent value={Period.month}>
				<Card x-chunk='dashboard-05-chunk-3'>
					<CardHeader className='px-7'>
						<CardTitle>Sales</CardTitle>
						<CardDescription>{`This month's sales from ${name}`}</CardDescription>
					</CardHeader>
					<CardContent>
						<StoreSalesTable sales={monthly} period={Period.month} storeId={storeId} />
					</CardContent>
				</Card>
			</TabsContent>
			<TabsContent value={Period.year}>
				<Card x-chunk='dashboard-05-chunk-3'>
					<CardHeader className='px-7'>
						<CardTitle>Sales</CardTitle>
						<CardDescription>{`This year's sales from ${name}`}</CardDescription>
					</CardHeader>
					<CardContent>
						<StoreSalesTable sales={yearly} period={Period.year} storeId={storeId} />
					</CardContent>
				</Card>
			</TabsContent>
			<TabsContent value={Period.alltime}>
				<Card x-chunk='dashboard-05-chunk-3'>
					<CardHeader className='px-7'>
						<CardTitle>Sales</CardTitle>
						<CardDescription>{`All time sales from ${name}`}</CardDescription>
					</CardHeader>
					<CardContent>
						<StoreSalesTable sales={allTime} period={Period.alltime} storeId={storeId} />
					</CardContent>
				</Card>
			</TabsContent>
		</Tabs>
	);
};

export default StorePeriodSales;

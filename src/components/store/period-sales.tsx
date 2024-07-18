'use client';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs';
import {Receipt} from '@/models/receipts/receipt';
import {Period} from '@/services/receipts/businessperiod';
import useStorePeriodSales from '@/services/store/period-sales';
import {FC} from 'react';
import SalesTable from '../dashboard/tables/sales';

const StorePeriodSales: FC<{
	receiptsDay: Receipt[];
	receiptsWeek: Receipt[];
	receiptsMonth: Receipt[];
	receiptsYear: Receipt[];
	allReceipts: Receipt[];
	storeId: string;
}> = ({receiptsDay, receiptsWeek, receiptsMonth, receiptsYear, allReceipts, storeId}) => {
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
						<CardDescription>{`Today's sales from all your stores.`}</CardDescription>
					</CardHeader>
					<CardContent>
						<SalesTable receipts={daily} period={Period.day} />
					</CardContent>
				</Card>
			</TabsContent>
			<TabsContent value={Period.week}>
				<Card x-chunk='dashboard-05-chunk-3'>
					<CardHeader className='px-7'>
						<CardTitle>Sales</CardTitle>
						<CardDescription>{`This week's sales from all your stores.`}</CardDescription>
					</CardHeader>
					<CardContent>
						<SalesTable receipts={weekly} period={Period.week} />
					</CardContent>
				</Card>
			</TabsContent>
			<TabsContent value={Period.month}>
				<Card x-chunk='dashboard-05-chunk-3'>
					<CardHeader className='px-7'>
						<CardTitle>Sales</CardTitle>
						<CardDescription>{`This month's sales from all your stores.`}</CardDescription>
					</CardHeader>
					<CardContent>
						<SalesTable receipts={monthly} period={Period.month} />
					</CardContent>
				</Card>
			</TabsContent>
			<TabsContent value={Period.year}>
				<Card x-chunk='dashboard-05-chunk-3'>
					<CardHeader className='px-7'>
						<CardTitle>Sales</CardTitle>
						<CardDescription>{`This year's sales from all your stores.`}</CardDescription>
					</CardHeader>
					<CardContent>
						<SalesTable receipts={yearly} period={Period.year} />
					</CardContent>
				</Card>
			</TabsContent>
			<TabsContent value={Period.alltime}>
				<Card x-chunk='dashboard-05-chunk-3'>
					<CardHeader className='px-7'>
						<CardTitle>Sales</CardTitle>
						<CardDescription>{`All time sales from all your stores.`}</CardDescription>
					</CardHeader>
					<CardContent>
						<SalesTable receipts={allTime} period={Period.alltime} />
					</CardContent>
				</Card>
			</TabsContent>
		</Tabs>
	);
};

export default StorePeriodSales;

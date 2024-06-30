import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs';
import {Period} from '@/services/receipts/businessperiod';
import React, {FC} from 'react';
import SalesTable from '../tables/sales';
import {Receipt} from '@/models/receipts/receipt';

const PeriodSales: FC<{
	receiptsDay: Receipt[];
	receiptsWeek: Receipt[];
	receiptsMonth: Receipt[];
	receiptsYear: Receipt[];
	allReceipts: Receipt[];
}> = ({receiptsDay, receiptsWeek, receiptsMonth, receiptsYear, allReceipts}) => {
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
						<SalesTable receipts={receiptsDay} period={Period.day} />
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
						<SalesTable receipts={receiptsWeek} period={Period.week} />
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
						<SalesTable receipts={receiptsMonth} period={Period.month} />
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
						<SalesTable receipts={receiptsYear} period={Period.year} />
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
						<SalesTable receipts={allReceipts} period={Period.alltime} />
					</CardContent>
				</Card>
			</TabsContent>
		</Tabs>
	);
};

export default PeriodSales;

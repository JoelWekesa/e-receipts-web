'use client';
import dateRangeAtom from '@/atoms/shared/date-range';
import {DatePickerWithRange} from '@/components/shared/date-range-picker';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs';
import {Receipt} from '@/models/receipts/receipt';
import {Period} from '@/services/receipts/businessperiod';
import usePeriodSales, {useCustomPeriodSales} from '@/services/sales/periodsales';
import dayjs from 'dayjs';
import {useAtom} from 'jotai';
import {FC, useEffect} from 'react';
import SalesTable from '../tables/sales';

const PeriodSales: FC<{
	receiptsDay: Receipt[];
	receiptsWeek: Receipt[];
	receiptsMonth: Receipt[];
	receiptsYear: Receipt[];
	customPeriodSales: Receipt[];
	allReceipts: Receipt[];
}> = ({receiptsDay, receiptsWeek, receiptsMonth, receiptsYear, customPeriodSales, allReceipts}) => {
	const [dates, _] = useAtom(dateRangeAtom);
	const {data: daily} = usePeriodSales({period: Period.day, sales: receiptsDay});
	const {data: weekly} = usePeriodSales({period: Period.week, sales: receiptsWeek});
	const {data: monthly} = usePeriodSales({period: Period.month, sales: receiptsMonth});
	const {data: yearly} = usePeriodSales({period: Period.year, sales: receiptsYear});
	const {data: allTime} = usePeriodSales({period: Period.alltime, sales: allReceipts});
	const {data: custom, refetch} = useCustomPeriodSales({
		period: Period.custom,
		sales: customPeriodSales,
		startDate: dayjs(dates?.from).format('YYYY-MM-DD'),
		endDate: dayjs(dates?.to).format('YYYY-MM-DD'),
	});

	useEffect(() => {
		refetch();
	}, [dates, refetch]);

	return (
		<Tabs defaultValue={Period.day} className='hidden lg:block'>
			<div className='flex items-center'>
				<TabsList>
					<TabsTrigger value='day'>Today</TabsTrigger>
					<TabsTrigger value='week'>Week</TabsTrigger>
					<TabsTrigger value='month'>Month</TabsTrigger>
					<TabsTrigger value='year'>Year</TabsTrigger>
					<TabsTrigger value='custom'>Custom</TabsTrigger>
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
			<TabsContent value={Period.custom}>
				<Card x-chunk='dashboard-05-chunk-3'>
					<CardHeader className='px-7'>
						<CardTitle>Sales</CardTitle>
						<CardDescription>
							<div className='px-3 py-1'>
								<p>Custom date range sales from all your stores.</p>
							</div>
							<div className='px-3 py-1'>
								<DatePickerWithRange className='w-full' />
							</div>
						</CardDescription>
					</CardHeader>
					<CardContent>
						<SalesTable receipts={custom} period={Period.alltime} />
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

export default PeriodSales;

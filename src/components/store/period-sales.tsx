'use client';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs';
import {Receipt} from '@/models/receipts/receipt';
import {Period} from '@/services/receipts/businessperiod';
import useStorePeriodSales, {useStoreCustomPeriodSales} from '@/services/store/period-sales';
import {FC, useEffect} from 'react';
import StoreSalesTable from './shared/sales-table';
import {Store} from '@/models/store';
import {useAtom} from 'jotai';
import dateRangeAtom from '@/atoms/shared/date-range';
import dayjs from 'dayjs';
import {DatePickerWithRange} from '../shared/date-range-picker';

const StorePeriodSales: FC<{
	receiptsDay: Receipt[];
	receiptsWeek: Receipt[];
	receiptsMonth: Receipt[];
	receiptsYear: Receipt[];
	customPeriodSales: Receipt[];
	allReceipts: Receipt[];
	store: Store;
	isTeam?: boolean;
	teamId?: string;
}> = ({
	receiptsDay,
	receiptsWeek,
	receiptsMonth,
	receiptsYear,
	customPeriodSales,
	allReceipts,
	store: {id: storeId, name},
	isTeam,
	teamId,
}) => {
	const [dates, _] = useAtom(dateRangeAtom);

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

	const {data: custom, refetch} = useStoreCustomPeriodSales({
		period: Period.custom,
		storeId,
		sales: customPeriodSales,
		startDate: dayjs(dates?.from).format('YYYY-MM-DD'),
		endDate: dayjs(dates?.to).format('YYYY-MM-DD'),
	});
	const {data: allTime} = useStorePeriodSales({
		period: Period.alltime,
		storeId,
		sales: allReceipts,
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
						<CardDescription>{`Today's sales from ${name}`}</CardDescription>
					</CardHeader>
					<CardContent>
						<StoreSalesTable sales={daily} isTeam={isTeam} storeId={storeId} teamId={teamId} />
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
						<StoreSalesTable sales={weekly} isTeam={isTeam} storeId={storeId} teamId={teamId} />
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
						<StoreSalesTable sales={monthly} isTeam={isTeam} storeId={storeId} teamId={teamId} />
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
						<StoreSalesTable sales={yearly} isTeam={isTeam} storeId={storeId} teamId={teamId} />
					</CardContent>
				</Card>
			</TabsContent>
			<TabsContent value={Period.custom}>
				<Card x-chunk='dashboard-05-chunk-3'>
					<CardHeader className='px-7'>
						<CardTitle>Sales</CardTitle>
						<CardDescription>
							<div className='px-3 py-1'>
								<p>{`Custom date range sales from ${name}`}</p>
							</div>
							<div className='px-3 py-1'>
								<DatePickerWithRange className='w-full' />
							</div>
						</CardDescription>
					</CardHeader>
					<CardContent>
						<StoreSalesTable sales={custom} isTeam={isTeam} storeId={storeId} teamId={teamId} />
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
						<StoreSalesTable sales={allTime} isTeam={isTeam} />
					</CardContent>
				</Card>
			</TabsContent>
		</Tabs>
	);
};

export default StorePeriodSales;

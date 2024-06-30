'use client';
import {Copy, MoreVertical} from 'lucide-react';

import {Button, buttonVariants} from '@/components/ui/button';
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from '@/components/ui/card';
import {Progress} from '@/components/ui/progress';
import {Separator} from '@/components/ui/separator';
import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs';
import {Count} from '@/models/receipts/count';
import {Receipt} from '@/models/receipts/receipt';
import {Totals} from '@/models/receipts/totals';
import {TopCustomers, TopStore} from '@/models/store';
import {Period} from '@/services/receipts/businessperiod';
import useTotals from '@/services/receipts/totals';
import currencyFormat from '@/utils/currency';
import dayjs from 'dayjs';
import Link from 'next/link';
import {FC} from 'react';
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from '../ui/dropdown-menu';
import ReceiptDistribution from './ReceiptDistribution';
import SalesTable from './tables/sales';
import TopCustomersComponent from './TopCustomers';
import TopStores from './TopStores';

interface Data {
	//Receipt Totals
	total_daily: Totals;
	total_weekly: Totals;
	total_monthly: Totals;
	total_yearly: Totals;
	alltime: Totals;

	//Actual Receipts
	receiptsDay: Receipt[];
	receiptsWeek: Receipt[];
	receiptsMonth: Receipt[];
	receiptsYear: Receipt[];
	allReceipts: Receipt[];

	//Count Receipts
	todayCount: Count;
	weekCount: Count;
	monthCount: Count;
	yearCount: Count;
	alltimeCount: Count;

	//Top Stores
	topStores: TopStore[];

	//Top Customers
	topCustomers: TopCustomers[];
}

export const SalesDashboard: FC<{
	data: Data;
}> = ({
	data: {
		total_daily,
		total_weekly,
		total_monthly,
		total_yearly,
		alltime,
		receiptsDay,
		receiptsWeek,
		receiptsMonth,
		receiptsYear,
		allReceipts,
		todayCount,
		weekCount,
		monthCount,
		yearCount,
		alltimeCount,
		topStores,
		topCustomers,
	},
}) => {
	const {data: daily} = useTotals(
		{
			period: Period.day,
			totals: total_daily,
		},
	);

	const {data: weekly} = useTotals(
		{
			period: Period.week,
			totals: total_weekly,
		},
	);

	const {data: monthly} = useTotals(
		{
			period: Period.month,
			totals: total_monthly,
		},
	);

	const {data: annual} = useTotals({
		period: Period.year,
		totals: total_yearly,
	});

	const {data: allPeriod} = useTotals({
		period: Period.alltime,
		totals: alltime,
	});

	return (
		<div className='flex min-h-screen w-full flex-col bg-muted/40'>
			<div className='flex flex-col sm:gap-4 sm:py-4 sm:pl-14'>
				<main className='grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3'>
					<div className='grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2'>
						<div className='grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4'>
							<Card className='sm:col-span-2' x-chunk='dashboard-05-chunk-0'>
								<CardHeader className='pb-3'>
									<CardTitle>My Stores</CardTitle>
									<CardDescription className='max-w-lg text-balance leading-relaxed'>
										Introducing our sleek, streamlined dashboard: Your one-stop destination for all your business digital
										receipts.
									</CardDescription>
								</CardHeader>
								<CardFooter>
									<Link href='/stores/all' className={buttonVariants({variant: 'default'})}>
										Manage Stores
									</Link>
								</CardFooter>
							</Card>
							<Card x-chunk='dashboard-05-chunk-1'>
								<CardHeader className='pb-2'>
									<CardDescription>Today</CardDescription>
									<CardTitle className='text-base'>{currencyFormat.format(daily.currentTotal)}</CardTitle>
								</CardHeader>
								<CardContent>
									<div className='text-sm text-muted-foreground'>
										{daily.increase > 0
											? `+${(daily.increase * 100).toFixed(2)}% increase from yesterday`
											: daily.increase === -1
											? 'No sales made today'
											: `${(daily.increase * 100).toFixed(2)}% decrease from yesterday`}
									</div>
								</CardContent>
								<CardFooter>
									<Progress value={daily.increase * 100} aria-label={daily.increase > 0 ? 'Increase' : 'Decrease'} />
								</CardFooter>
							</Card>
							<Card x-chunk='dashboard-05-chunk-1'>
								<CardHeader className='pb-2'>
									<CardDescription>This Week</CardDescription>
									<CardTitle className='text-base'>{currencyFormat.format(weekly.currentTotal)}</CardTitle>
								</CardHeader>
								<CardContent>
									<div className='text-sm text-muted-foreground'>
										{weekly.increase > 0
											? `+${(weekly.increase * 100).toFixed(2)}% increase from last week`
											: weekly.increase === -1
											? 'No sales made this week'
											: `${(weekly.increase * 100).toFixed(2)}% decrease from last week`}
									</div>
								</CardContent>
								<CardFooter>
									<Progress value={weekly.increase * 100} aria-label={weekly.increase > 0 ? 'Increase' : 'Decrease'} />
								</CardFooter>
							</Card>
						</div>
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
					</div>
					<div>
						<Card className='overflow-hidden' x-chunk='dashboard-05-chunk-4'>
							<CardHeader className='flex flex-row items-start bg-muted/50'>
								<div className='grid gap-0.5'>
									<CardTitle className='group flex items-center gap-2 text-lg'>
										All time sales
										<Button
											size='icon'
											variant='outline'
											className='h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100'>
											<Copy className='h-3 w-3' />
											<span className='sr-only'>Copy Amount</span>
										</Button>
									</CardTitle>
									<CardDescription>{currencyFormat.format(allPeriod.currentTotal)}</CardDescription>
								</div>
								<div className='ml-auto flex items-center gap-1'>
									{/* <Button size='sm' variant='outline' className='h-8 gap-1'>
										<Truck className='h-3.5 w-3.5' />
										<span className='lg:sr-only xl:not-sr-only xl:whitespace-nowrap'>Track Order</span>
									</Button> */}
									<DropdownMenu>
										<DropdownMenuTrigger asChild>
											<Button size='icon' variant='outline' className='h-8 w-8'>
												<MoreVertical className='h-3.5 w-3.5' />
												<span className='sr-only'>More</span>
											</Button>
										</DropdownMenuTrigger>
										<DropdownMenuContent align='end'>
											<DropdownMenuItem>
												{new Date().getFullYear()} Sales - {currencyFormat.format(annual.currentTotal)}
											</DropdownMenuItem>
											<DropdownMenuItem>
												{dayjs(new Date()).format('MMMM')} Sales - {currencyFormat.format(monthly.currentTotal)}
											</DropdownMenuItem>
											{/* <DropdownMenuSeparator />
											<DropdownMenuItem>Trash</DropdownMenuItem> */}
										</DropdownMenuContent>
									</DropdownMenu>
								</div>
							</CardHeader>
							<CardContent className='p-6 text-sm'>
								<TopStores topStores={topStores} />
								<Separator className='my-2' />
								<TopCustomersComponent topCustomers={topCustomers} />
								<Separator className='my-2' />
								<div className='grid gap-3'>
									<div className='font-semibold'>Receipts Distribution</div>
									<ReceiptDistribution
										todayCount={todayCount}
										weekCount={weekCount}
										monthCount={monthCount}
										yearCount={yearCount}
										alltimeCount={alltimeCount}
									/>
									<Separator className='my-2' />
								</div>
								{/* <Separator className='my-4' />
								<div className='grid gap-3'>
									<div className='font-semibold'>Payment Information</div>
									<dl className='grid gap-3'>
										<div className='flex items-center justify-between'>
											<dt className='flex items-center gap-1 text-muted-foreground'>
												<CreditCard className='h-4 w-4' />
												Visa
											</dt>
											<dd>**** **** **** 4532</dd>
										</div>
									</dl>
								</div> */}
							</CardContent>
							{/* <CardFooter className='flex flex-row items-center border-t bg-muted/50 px-6 py-3'>
								<div className='text-xs text-muted-foreground'>
									Updated <time dateTime='2023-11-23'>November 23, 2023</time>
								</div>
								<Pagination className='ml-auto mr-0 w-auto'>
									<PaginationContent>
										<PaginationItem>
											<Button size='icon' variant='outline' className='h-6 w-6'>
												<ChevronLeft className='h-3.5 w-3.5' />
												<span className='sr-only'>Previous Order</span>
											</Button>
										</PaginationItem>
										<PaginationItem>
											<Button size='icon' variant='outline' className='h-6 w-6'>
												<ChevronRight className='h-3.5 w-3.5' />
												<span className='sr-only'>Next Order</span>
											</Button>
										</PaginationItem>
									</PaginationContent>
								</Pagination>
							</CardFooter> */}
						</Card>
					</div>
				</main>
			</div>
		</div>
	);
};

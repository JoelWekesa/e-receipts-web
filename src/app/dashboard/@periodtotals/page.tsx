import {options} from '@/app/api/auth/[...nextauth]/options';
import InventoryValue from '@/components/shared/inventory/value';
import {buttonVariants} from '@/components/ui/button';
import {Card, CardDescription, CardFooter, CardHeader, CardTitle} from '@/components/ui/card';
import {Skeleton} from '@/components/ui/skeleton';
import ApiClient from '@/config/axios';
import getTotals from '@/services/page/stores/inventory/all';
import {Period} from '@/services/receipts/businessperiod';
import {getServerSession} from 'next-auth';
import dynamic from 'next/dynamic';
import Link from 'next/link';

const DynamicStoresTotal = dynamic(() => import('../../../components/dashboard/totals/totals'), {
	loading: () => <Skeleton />,
});

const durations = [Period.day, Period.week, Period.month, Period.year, Period.alltime];

const periodTotalsUrls = durations.map(
	(duration) => process.env.NEXT_PUBLIC_API_URL + 'receipts/periodtotals?period=' + duration
);

async function getData({token, url}: {token: string; url: string}) {
	const response = await ApiClient(token)
		.get(url)
		.then((res) => res.data);

	return response;
}

const getAllData = async ({token}: {token: string}) => {
	const [total_daily, total_weekly, total_monthly, total_yearly, alltime, total_inventory] = await Promise.all([
		...periodTotalsUrls.map((url) => getData({token, url})),
		getTotals({token}),
	]);

	return {
		total_daily,
		total_weekly,
		total_monthly,
		total_yearly,
		alltime,
		total_inventory,
	};
};

const PeriodTotals = async () => {
	const session = await getServerSession(options);

	const data = await getAllData({
		token: session?.accessToken ? session?.accessToken : '',
	});

	return (
		<div className='grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4'>
			<Card className='sm:col-span-2' x-chunk='dashboard-05-chunk-0'>
				<CardHeader className='pb-3'>
					<CardTitle>My Stores</CardTitle>
					<CardDescription className='max-w-lg text-balance leading-relaxed'>
						<InventoryValue title='Total inventory value across all stores' total={data.total_inventory} />
					</CardDescription>
				</CardHeader>
				<CardFooter>
					<Link href='/stores/all' className={buttonVariants({variant: 'default'})}>
						Manage Stores
					</Link>
				</CardFooter>
			</Card>
			<DynamicStoresTotal
				totals={data.total_daily}
				period={Period.day}
				title='Today'
				subTitle='Today'
				subTitle1='Yesterday'
			/>
			<DynamicStoresTotal
				totals={data.total_weekly}
				period={Period.week}
				title='This week'
				subTitle='This week'
				subTitle1='Last Week'
			/>
		</div>
	);
};

export default PeriodTotals;

import {options} from '@/app/api/auth/[...nextauth]/options';
import DailyTotals from '@/components/dashboard/totals/daily';
import WeeklyTotals from '@/components/dashboard/totals/weekly';
import {buttonVariants} from '@/components/ui/button';
import {Card, CardDescription, CardFooter, CardHeader, CardTitle} from '@/components/ui/card';
import ApiClient from '@/config/axios';
import {Period} from '@/services/receipts/businessperiod';
import {getServerSession} from 'next-auth';
import Link from 'next/link';

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
	const [total_daily, total_weekly, total_monthly, total_yearly, alltime] = await Promise.all(
		periodTotalsUrls.map((url) => getData({token, url}))
	);

	return {
		total_daily,
		total_weekly,
		total_monthly,
		total_yearly,
		alltime,
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
						Introducing our sleek, streamlined dashboard: Your one-stop destination for all your business digital receipts.
					</CardDescription>
				</CardHeader>
				<CardFooter>
					<Link href='/stores/all' className={buttonVariants({variant: 'default'})}>
						Manage Stores
					</Link>
				</CardFooter>
			</Card>
			<DailyTotals daily={data.total_daily} />
			<WeeklyTotals weekly={data.total_weekly} />
		</div>
	);
};

export default PeriodTotals;

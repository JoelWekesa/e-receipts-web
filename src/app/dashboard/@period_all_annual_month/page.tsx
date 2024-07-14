import {options} from '@/app/api/auth/[...nextauth]/options';
import {Button} from '@/components/ui/button';
import {CardHeader} from '@/components/ui/card';
import {DropdownMenu, DropdownMenuContent, DropdownMenuTrigger} from '@/components/ui/dropdown-menu';
import {Skeleton} from '@/components/ui/skeleton';
import ApiClient from '@/config/axios';
import {durations} from '@/utils/durations';
import {MoreVertical} from 'lucide-react';
import {getServerSession} from 'next-auth';
import dynamic from 'next/dynamic';

const DynamicAllTimeTotal = dynamic(() => import('../../../components/dashboard/totals/alltime'), {
	loading: () => <Skeleton className='h-10 w-full' />,
});

const DynamicAnnualTotal = dynamic(() => import('../../../components/dashboard/totals/annual'), {
	loading: () => <Skeleton className='h-10 w-full' />,
});

const DynamicMonthlyTotal = dynamic(() => import('../../../components/dashboard/totals/monthly'), {
	loading: () => <Skeleton className='h-10 w-full' />,
});

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
	const [total_monthly, total_yearly, alltime] = await Promise.all(
		periodTotalsUrls.slice(-3).map((url) => getData({token, url}))
	);

	return {
		total_monthly,
		total_yearly,
		alltime,
	};
};

const PeriodSalesAllAnnualMonth = async () => {
	const session = await getServerSession(options);

	const data = await getAllData({
		token: session?.accessToken || '',
	});

	return (
		<CardHeader className='flex flex-row items-start bg-muted/50'>
			<DynamicAllTimeTotal allTime={data.alltime} />
			<div className='ml-auto flex items-center gap-1'>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button size='icon' variant='outline' className='h-8 w-8'>
							<MoreVertical className='h-3.5 w-3.5' />
							<span className='sr-only'>More</span>
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align='end'>
						<DynamicAnnualTotal annual={data.total_yearly} />
						<DynamicMonthlyTotal monthly={data.total_monthly} />
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</CardHeader>
	);
};

export default PeriodSalesAllAnnualMonth;

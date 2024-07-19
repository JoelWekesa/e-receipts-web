import {options} from '@/app/api/auth/[...nextauth]/options';
import {Button} from '@/components/ui/button';
import {CardHeader} from '@/components/ui/card';
import {DropdownMenu, DropdownMenuContent, DropdownMenuTrigger} from '@/components/ui/dropdown-menu';
import {Skeleton} from '@/components/ui/skeleton';
import {getStorePeriodTotals} from '@/services/page/stores/store/period-totals';
import {Period} from '@/services/receipts/businessperiod';
import {MoreVertical} from 'lucide-react';
import {getServerSession} from 'next-auth';
import dynamic from 'next/dynamic';

const DynamicAllTimeTotal = dynamic(() => import('../../../../../components/store/alltime'), {
	loading: () => <Skeleton className='h-10 w-full' />,
});

const DynamicDropTotal = dynamic(() => import('../../../../../components/store/drop'), {
	loading: () => <Skeleton className='h-10 w-full' />,
});

const StorePeriodSalesAllAnnualMonth = async ({params}: {params: {id: string}}) => {
	const session = await getServerSession(options);
	const token = session?.accessToken || '';

	const storeId = params.id;

	const allTimeSales = getStorePeriodTotals({
		token,
		storeId,
		period: Period.alltime,
	});

	const monthlySales = getStorePeriodTotals({
		token,
		storeId,
		period: Period.month,
	});

	const annualSales = getStorePeriodTotals({
		token,
		storeId,
		period: Period.year,
	});

	const [all, yearly, monthly] = await Promise.all([allTimeSales, annualSales, monthlySales]);

	return (
		<CardHeader className='flex flex-row items-start bg-muted/50'>
			<DynamicAllTimeTotal storeId={storeId} totals={all} period={Period.alltime} />
			<div className='ml-auto flex items-center gap-1'>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button size='icon' variant='outline' className='h-8 w-8'>
							<MoreVertical className='h-3.5 w-3.5' />
							<span className='sr-only'>More</span>
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align='end'>
						<DynamicDropTotal storeId={storeId} totals={yearly} period={Period.year} />
						<DynamicDropTotal storeId={storeId} totals={monthly} period={Period.month} />
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</CardHeader>
	);
};

export default StorePeriodSalesAllAnnualMonth;

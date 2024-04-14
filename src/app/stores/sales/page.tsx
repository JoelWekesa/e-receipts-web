import {SalesDashboard} from '@/components/dashboard/Sales';
import {Search} from '@/components/dashboard/Search';
import TeamSwitcher from '@/components/dashboard/TeamSwitcher';
import {MainNav} from '@/components/dashboard/MainNav';
import React from 'react';
import {Receipt} from '@/models/receipts/receipt';
import axios from '@/config/axios';
import {auth} from '@clerk/nextjs';
import {Period} from '@/services/receipts/businessperiod';
import {Totals} from '@/models/receipts/totals';
import {AxiosResponse} from 'axios';

async function getData({token}: {token: string}) {
	const week: Promise<AxiosResponse<Totals>> = axios.get(
		process.env.NEXT_PUBLIC_API_URL + 'receipts/periodtotals?period=' + Period.week,
		{
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
				Authorization: `Bearer ${token}`,
			},
		}
	);

	const month: Promise<AxiosResponse<Totals>> = axios.get(
		process.env.NEXT_PUBLIC_API_URL + 'receipts/periodtotals?period=' + Period.month,
		{
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
				Authorization: `Bearer ${token}`,
			},
		}
	);

	const res: Promise<AxiosResponse<Receipt[]>> = axios.get(
		process.env.NEXT_PUBLIC_API_URL + 'receipts/store?period=week',
		{
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
				Authorization: `Bearer ${token}`,
			},
		}
	);

	const [weekly, monthly, receipts] = await Promise.all([week, month, res]);

	return {
		weekly: weekly.data,
		monthly: monthly.data,
		receipts: receipts.data,
	};
}

const Sales = async () => {
	const {sessionId: token} = auth();

	const {weekly, monthly, receipts} = await getData({
		token: token ? token : '',
	});

	console.log({
		weekly,
		monthly,
	});

	return (
		<>
			<div className='hidden flex-col md:flex'>
				<div className='border-b'>
					<div className='flex h-16 items-center px-4'>
						<TeamSwitcher />
						<MainNav className='mx-6' />
						<div className='ml-auto flex items-center space-x-4'>
							<Search />
						</div>
					</div>
				</div>
			</div>
			<div className='flex-1 space-y-4 p-8 pt-6'>
				<SalesDashboard receipts={receipts} total_monthly={monthly} total_weekly={weekly} />
			</div>
		</>
	);
};

export default Sales;

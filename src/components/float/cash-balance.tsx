'use client';

import {StoreCash} from '@/models/floats/store';
import useStoreCash from '@/services/float/cash';
import currencyFormat from '@/utils/currency';
import {BanknoteIcon, RefreshCw} from 'lucide-react';
import {FC, useState} from 'react';
import {Button} from '../ui/button';
import AddCashDialog from './transaction/add-cash-dialog';
import CollectCashDialog from './transaction/collect-cash-dialog';

interface Props {
	storeId: string;
	storeCash: StoreCash | null;
}

const CashBalance: FC<Props> = ({storeId, storeCash}) => {
	const {data: float, refetch, isRefetching} = useStoreCash({storeId, storeCash});

	const [open, setOpen] = useState(false);

	const [openCollect, setOpenCollect] = useState(false);

	const handleOpen = () => {
		setOpen((open) => !open);
	};

	const handleOpenCollect = () => {
		setOpenCollect((openCollect) => !openCollect);
	};

	return (
		<>
			<div className='flex items-start px-4'>
				<div className='flex flex-col gap-2'>
					<div className='w-full max-w-md p-8 bg-gradient-to-br from-green-500 to-blue-600 rounded-3xl shadow-xl overflow-hidden relative'>
						<div className='absolute inset-0 opacity-10'>
							<div className='absolute inset-0 bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg' />
							<div className='h-full w-full bg-[radial-gradient(#ffffff33_1px,transparent_1px)] [background-size:16px_16px]' />
						</div>
						<div className='relative z-10'>
							<div className='flex items-center justify-between mb-6'>
								<h2 className='text-2xl font-bold text-white'>Cash Balance</h2>
								<Button variant='ghost' size='icon' className='hover:bg-transparent' onClick={() => refetch()}>
									<RefreshCw className={`w-8 h-8 text-white opacity-80 ${isRefetching && 'animate-spin'}`} />
								</Button>
							</div>
							<div className='space-y-2'>
								<p className='text-sm font-medium text-purple-100 opacity-80'>Cash At Hand</p>
								<p className='text-5xl font-bold text-white'>{currencyFormat.format(float?.balance || 0)}</p>
							</div>
							<div className='mt-8 pt-8 border-t border-white border-opacity-20'>
								<div className='flex justify-between items-center text-sm text-purple-100'>
									<span>Cash Account ID</span>
									<span className='font-medium'>{float?.id}</span>
								</div>
							</div>
						</div>
					</div>
					<div className='flex  flex-row gap-2 py-3'>
						<Button onClick={handleOpen}>
							<BanknoteIcon className='w-6 h-6 mr-2' />
							Top Up Cash
						</Button>

						<Button onClick={handleOpenCollect} variant='destructive'>
							<BanknoteIcon className='w-6 h-6 mr-2' />
							Collect Cash
						</Button>
					</div>
				</div>
			</div>
			<AddCashDialog open={open} onClose={handleOpen} storeCash={storeCash} />
			<CollectCashDialog open={openCollect} onClose={handleOpenCollect} storeCash={storeCash} storeId={storeId} />
		</>
	);
};

export default CashBalance;

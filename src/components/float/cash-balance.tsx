'use client';

import {StoreCash} from '@/models/floats/store';
import useStoreCash from '@/services/float/cash';
import currencyFormat from '@/utils/currency';
import {BanknoteIcon, RefreshCw} from 'lucide-react';
import {FC, useState} from 'react';
import {Button} from '../ui/button';
import AddCashDialog from './transaction/add-cash-dialog';
import CollectCashDialog from './transaction/collect-cash-dialog';
import {H2} from '../titles';

interface Props {
	storeId: string;
	storeCash: StoreCash | null;
	team?: boolean;
}

const CashBalance: FC<Props> = ({storeId, storeCash, team}) => {
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
			<div className='flex flex-col items-start px-4'>
				<div className='flex flex-col gap-4 w-full'>
					{/* Responsive wrapper for mobile and larger screens */}
					<div className='w-full max-w-full md:max-w-md p-4 md:p-8 bg-gradient-to-br from-green-500 to-blue-600 rounded-3xl shadow-xl overflow-hidden relative'>
						{/* Background effects */}
						<div className='absolute inset-0 opacity-10'>
							<div className='absolute inset-0 bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg' />
							<div className='h-full w-full bg-[radial-gradient(#ffffff33_1px,transparent_1px)] [background-size:16px_16px]' />
						</div>
						<div className='relative z-10'>
							<div className='flex items-center justify-between mb-4 md:mb-6'>
								<H2 className='text-lg md:text-2xl font-bold text-white'>Cash Balance</H2>
								<Button variant='ghost' size='icon' className='hover:bg-transparent' onClick={() => refetch()}>
									<RefreshCw className={`w-6 h-6 md:w-8 md:h-8 text-white opacity-80 ${isRefetching && 'animate-spin'}`} />
								</Button>
							</div>
							<div className='space-y-2'>
								<p className='text-xs md:text-sm font-medium text-purple-100 opacity-80'>Cash At Hand</p>
								<p className='text-3xl md:text-5xl font-bold text-white'>{currencyFormat.format(float?.balance || 0)}</p>
							</div>
							<div className='mt-4 md:mt-8 pt-4 md:pt-8 border-t border-white border-opacity-20'>
								<div className='flex justify-between items-center text-xs md:text-sm text-purple-100'>
									<span>Cash Account ID</span>
									<span className='font-medium'>{float?.id}</span>
								</div>
							</div>
						</div>
					</div>
					{!team && (
						<div className='flex flex-col md:flex-row gap-2 py-3'>
							<Button onClick={handleOpen} disabled={team} className='w-full md:w-auto'>
								<BanknoteIcon className='w-5 h-5 md:w-6 md:h-6 mr-2' />
								Top Up Cash
							</Button>

							<Button onClick={handleOpenCollect} variant='destructive' disabled={team} className='w-full md:w-auto'>
								<BanknoteIcon className='w-5 h-5 md:w-6 md:h-6 mr-2' />
								Collect Cash
							</Button>
						</div>
					)}
				</div>
			</div>
			{!team && (
				<>
					<AddCashDialog open={open} onClose={handleOpen} storeCash={storeCash} />
					<CollectCashDialog open={openCollect} onClose={handleOpenCollect} storeCash={storeCash} storeId={storeId} />
				</>
			)}
		</>
	);
};

export default CashBalance;

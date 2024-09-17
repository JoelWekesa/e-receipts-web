'use client';
import currencyFormat from '@/utils/currency';
import {Banknote, RefreshCw} from 'lucide-react';
import {FC, useState} from 'react';
import {Button} from '../ui/button';
import {useSession} from 'next-auth/react';
import useStoreFloat from '@/services/float/store-float';
import {StoreFloat} from '@/models/floats/store';
import AddFloatDialog from './add-float-dialog';

interface Props {
	storeId: string;
	storeFloat: StoreFloat | null;
	team?: boolean;
}

const FloatBalance: FC<Props> = ({storeId, storeFloat, team}) => {
	const {data: session} = useSession({
		required: true,
	});

	const token = session?.accessToken || '';

	const {data: float, refetch, isRefetching} = useStoreFloat({token, storeId, storeFloat});

	const [open, setOpen] = useState(false);

	const handleOpen = () => {
		setOpen((open) => !open);
	};

	return (
		<>
			<div className='flex flex-col items-start px-4'>
				<div className='flex flex-col gap-4 w-full'>
					{/* Responsive wrapper for mobile and larger screens */}
					<div className='w-full max-w-full md:max-w-md p-4 md:p-8 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-3xl shadow-xl overflow-hidden relative'>
						{/* Background effects */}
						<div className='absolute inset-0 opacity-10'>
							<div className='absolute inset-0 bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg' />
							<div className='h-full w-full bg-[radial-gradient(#ffffff33_1px,transparent_1px)] [background-size:16px_16px]' />
						</div>
						<div className='relative z-10'>
							<div className='flex items-center justify-between mb-4 md:mb-6'>
								<h2 className='text-lg md:text-2xl font-bold text-white'>Float Balance</h2>
								<Button variant='ghost' size='icon' className='hover:bg-transparent' onClick={() => refetch()}>
									<RefreshCw className={`w-6 h-6 md:w-8 md:h-8 text-white opacity-80 ${isRefetching && 'animate-spin'}`} />
								</Button>
							</div>
							<div className='space-y-2'>
								<p className='text-xs md:text-sm font-medium text-purple-100 opacity-80'>Available Float Amount</p>
								<p className='text-3xl md:text-5xl font-bold text-white'>{currencyFormat.format(float?.balance || 0)}</p>
							</div>
							<div className='mt-4 md:mt-8 pt-4 md:pt-8 border-t border-white border-opacity-20'>
								<div className='flex justify-between items-center text-xs md:text-sm text-purple-100'>
									<span>Float ID</span>
									<span className='font-medium'>{float?.id}</span>
								</div>
							</div>
						</div>
					</div>
					{!team && (
						<div className='flex py-3 justify-center md:justify-start'>
							<Button onClick={handleOpen} disabled={team} className='w-full md:w-auto'>
								<Banknote className='w-5 h-5 md:w-6 md:h-6 mr-2' />
								Top Up Float
							</Button>
						</div>
					)}
				</div>
			</div>
			{!team && <AddFloatDialog open={open} onClose={handleOpen} storeFloat={storeFloat} />}
		</>
	);
};

export default FloatBalance;

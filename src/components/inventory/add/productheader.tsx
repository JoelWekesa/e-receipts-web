import {Badge} from '@/components/ui/badge';
import {Button} from '@/components/ui/button';
import {ChevronLeft, Loader2} from 'lucide-react';
import Link from 'next/link';
import {FC} from 'react';

const ProductHeader: FC<{isPending: boolean; storeId: string}> = ({isPending, storeId}) => {
	return (
		<div className='flex items-center gap-4'>
			<Link href={`/inventory/${storeId}`}>
				<Button variant='outline' size='icon' className='h-7 w-7' type='button'>
					<ChevronLeft className='h-4 w-4' />
					<span className='sr-only'>Back</span>
				</Button>
			</Link>
			<h1 className='flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0'>Add Product</h1>
			<Badge variant='outline' className='ml-auto sm:ml-0'>
				New
			</Badge>
			<div className='hidden items-center gap-2 md:ml-auto md:flex'>
				<Button variant='outline' size='sm' type='button'>
					Discard
				</Button>
				<Button size='sm' type='submit' disabled={isPending}>
					{isPending && <Loader2 className='mr-2 h-4 w-4 animate-spin' />} Save Product
				</Button>
			</div>
		</div>
	);
};

export default ProductHeader;

import {Badge} from '@/components/ui/badge';
import {Button} from '@/components/ui/button';
import {Loader2} from 'lucide-react';
import {FC} from 'react';

const ProductHeader: FC<{isPending: boolean; edit?: boolean; title?: string}> = ({isPending, edit, title}) => {
	return (
		<div className='flex items-center gap-4 my-3'>
			<h1 className='flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0'>
				{edit ? 'Edit Product' : title}
			</h1>
			<Badge variant='outline' className='ml-auto sm:ml-0'>
				New
			</Badge>
			<div className='hidden items-center gap-2 md:ml-auto md:flex'>
				<Button size='sm' type='submit' disabled={isPending}>
					{isPending && <Loader2 className='mr-2 h-4 w-4 animate-spin' />} Save Product
				</Button>
			</div>
		</div>
	);
};

export default ProductHeader;

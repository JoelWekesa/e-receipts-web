import inventoryAtom from '@/atoms/inventory/inventory';
import {Badge} from '@/components/ui/badge';
import {Button} from '@/components/ui/button';
import {useAtom} from 'jotai';
import {ChevronLeft, ListCollapse} from 'lucide-react';
import {FC} from 'react';

const SeeProductHeader: FC<{hide?: boolean}> = ({hide}) => {
	const [data, setVariant] = useAtom(inventoryAtom);

	const handleClick = () => {
		setVariant({
			inventory: data?.inventory || null,
			path: 'variants',
		});
	};

	const handleRedirect = () => {
		if (hide) {
			setVariant({
				inventory: data?.inventory || null,
				path: 'view',
			});
		} else {
			setVariant({
				inventory: null,
				path: 'inventory',
			});
		}
	};

	return (
		<div className='flex items-center gap-4'>
			<Button variant='outline' size='icon' className='h-7 w-7' type='button' onClick={handleRedirect}>
				<ChevronLeft className='h-4 w-4' />
				<span className='sr-only'>Back</span>
			</Button>

			<h1 className='flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0'>
				{data?.inventory?.name}
			</h1>
			<Badge variant='outline' className='ml-auto sm:ml-0'>
				New
			</Badge>
			{!hide && (
				<div className='hidden items-center gap-2 md:ml-auto md:flex'>
					<Button size='sm' type='button' onClick={handleClick}>
						<ListCollapse className='h-4 w-4 mr-2' /> View Variants
					</Button>
				</div>
			)}
		</div>
	);
};

export default SeeProductHeader;

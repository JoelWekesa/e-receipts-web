import {ReceiptItem, receiptItemsAtom} from '@/atoms/receiptgen/receiptitem';
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from '@/components/ui/accordion';
import {useAtom} from 'jotai';
import {Edit, Trash2Icon} from 'lucide-react';
import {FC} from 'react';
import {Button} from '../ui/button';
import {ControlUnit, controlUnitAtom} from '@/atoms/receiptgen/controlunit';
import {Loyalty, loyaltyAtom} from '@/atoms/receiptgen/loyalty';

const LoyaltyControlItems = () => {
	const [item] = useAtom(loyaltyAtom);

	return (
		<Accordion type='single' collapsible className='w-full' disabled={item.length === 0}>
			<AccordionItem value='item-1'>
				<AccordionTrigger>
					<div className='flex flex-row gap-2'>
						<Edit className='mr-2 h-4 w-4' />
						<p>Manage Loyalty Points</p>
					</div>
				</AccordionTrigger>
				<AccordionContent>
					{item.map((i, index) => (
						<div className='gap-4' key={index}>
							<ListItem item={i} />
						</div>
					))}
				</AccordionContent>
			</AccordionItem>
		</Accordion>
	);
};

export default LoyaltyControlItems;

const ListItem: FC<{item: Loyalty}> = ({item}) => {
	const [_, setLoyalty] = useAtom(loyaltyAtom);

	const handleDelete = () => {
		setLoyalty([]);
	};

	return (
		<div className='flex flex-row justify-between my-2 border-b'>
			<div className='w-2/3'>
				<div className='flex flex-row justify-between'>
					<div className='w-1/3'>
						<p>{item.code}</p>
					</div>
					<div className='w-1/3'>
						<p>{item.customer}</p>
					</div>
					<div className='w-1/3'>
						<p>{item.points_earned}</p>
					</div>
				</div>
			</div>
			<div className='w-1/3 flex flex-row gap-2 justify-end items-end mb-2'>
				<Button variant='destructive' size='icon' onClick={handleDelete}>
					<Trash2Icon className='h-4 w-4' />
				</Button>
			</div>
		</div>
	);
};

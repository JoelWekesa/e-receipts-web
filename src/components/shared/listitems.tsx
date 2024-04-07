import { ReceiptItem, receiptItemsAtom } from '@/atoms/receiptitem';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useAtom } from 'jotai';
import { Edit, Trash2Icon } from 'lucide-react';
import { FC } from 'react';
import { Button } from '../ui/button';

const ListItems: FC<{handleItem: (item: ReceiptItem) => void}> = ({handleItem}) => {
	const [items, _] = useAtom(receiptItemsAtom);
	return (
		<Accordion type='single' collapsible className='w-full'>
			<AccordionItem value='item-1'>
				<AccordionTrigger>
					<div className='flex flex-row gap-2'>
						<Edit className='mr-2 h-4 w-4' />
						<p>Manage Added Receipt items</p>
					</div>
				</AccordionTrigger>
				<AccordionContent>
					<div className='gap-4'>
						{items?.map((item) => (
							<ListItem key={item.item} item={item} handleItem={() => handleItem(item)} />
						))}
					</div>
				</AccordionContent>
			</AccordionItem>
		</Accordion>
	);
};

export default ListItems;

const ListItem: FC<{item: ReceiptItem; handleItem: (item: ReceiptItem) => void}> = ({item, handleItem}) => {
	const [_, setItems] = useAtom(receiptItemsAtom);

	const handleDelete = () => {
		setItems((prev) => prev.filter((i) => i !== item));
	};
	return (
		<div className='flex flex-row justify-between my-2 border-b'>
			<div className='w-2/3'>
				<div className='flex flex-row justify-between'>
					<div className='w-1/2'>
						<p>{item.item}</p>
					</div>
					<div className='w-1/4'>
						<p>
							{item.quantity} x {item.price}
						</p>
					</div>
					<div className='w-1/4'>
						<p>{+item.quantity * +item.price}</p>
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

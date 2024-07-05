import {ControlUnit, controlUnitAtom} from '@/atoms/receiptgen/controlunit';
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from '@/components/ui/accordion';
import {useAtom} from 'jotai';
import {Edit, Trash2Icon} from 'lucide-react';
import {FC} from 'react';
import {Button} from '../ui/button';

const ListControlItems = () => {
	const [items, _] = useAtom(controlUnitAtom);
	return (
		<Accordion type='single' collapsible className='w-full' disabled={items?.length === 0}>
			<AccordionItem value='item-1'>
				<AccordionTrigger>
					<div className='flex flex-row gap-2'>
						<Edit className='mr-2 h-4 w-4' />
						<p>Manage Control Unit Info</p>
					</div>
				</AccordionTrigger>
				<AccordionContent>
					<div className='gap-4'>
						{items?.map((item) => (
							<ListItem key={item.title} item={item} />
						))}
					</div>
				</AccordionContent>
			</AccordionItem>
		</Accordion>
	);
};

export default ListControlItems;

const ListItem: FC<{item: ControlUnit}> = ({item}) => {
	const [_, setItems] = useAtom(controlUnitAtom);

	const handleDelete = () => {
		setItems((prev) => prev.filter((i) => i !== item));
	};

	return (
		<div className='flex flex-row justify-between my-2 border-b'>
			<div className='w-2/3'>
				<div className='flex flex-row justify-between'>
					<div className='w-1/2'>
						<p>{item.title}</p>
					</div>
					<div className='w-1/2'>
						<p>{item.value}</p>
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

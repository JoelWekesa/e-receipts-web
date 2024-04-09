import AddReceiptItems from '@/components/shared/additems';
import ControlUnitComponent from '@/components/shared/controlunit';
import AddPaymentDetails from '@/components/shared/payments';
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from '@/components/ui/accordion';

const GenerateSuperMarketTemplate = () => {
	return (
		<div className='flex flex-col gap-3'>
			<div>
				<AddReceiptItems />
			</div>

			<div>
				<AddPaymentDetails />
			</div>
			<div>
				<Accordion type='single' collapsible className='w-full '>
					<AccordionItem value='item-1'>
						<AccordionTrigger className='p-4'>Control Unit Information</AccordionTrigger>
						<AccordionContent>
							<ControlUnitComponent />
						</AccordionContent>
					</AccordionItem>
				</Accordion>
			</div>
		</div>
	);
};

export default GenerateSuperMarketTemplate;

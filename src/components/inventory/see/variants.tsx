import {FC} from 'react';
import AddVariant from './add-variant';
import SeeProductHeader from './header';
import SeeProductVariants from './variant';
import {Inventory} from '@/models/inventory/inventory';
import {Option} from '@/models/inventory/option';
interface Props {
	inventory: Inventory;
	options: Option[];
}

const ViewProductVariantsComponent: FC<Props> = ({inventory, options}) => {
	return (
		<div className='grid max-w-[59rem] flex-1 auto-rows-max gap-4'>
			<SeeProductHeader hide inventory={inventory} />
			<SeeProductVariants inventory={inventory} />
			<AddVariant options={options} inventory={inventory} />
		</div>
	);
};

export default ViewProductVariantsComponent;

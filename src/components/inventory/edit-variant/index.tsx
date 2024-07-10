
import { Inventory, Variant } from '@/models/inventory/inventory';
import {Option} from '@/models/inventory/option';
import {FC} from 'react';
import SeeProductHeader from '../see/header';
import EditVariant from './form';

interface Props {
	inventory: Inventory;
	variant: Variant;
	options: Option[];
}

const EditVariantComponent: FC<Props> = ({inventory, variant, options}) => {
	return (
		<div className='gap-4'>
			<div className='my-4'>
				<SeeProductHeader hide inventory={inventory} />
			</div>
			<EditVariant variant={variant} options={options} />
		</div>
	);
};

export default EditVariantComponent;

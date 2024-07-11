'use client';
import {Inventory} from '@/models/inventory/inventory';
import {VariantTypes} from '@/models/inventory/variant-types';
import {FC} from 'react';
import ProductDetails from './details';
import SeeProductHeader from './header';
import SeeProductOptions from './options';
import SeeProductImages from './productimages';
import SeeProductVariants from './variant';
import {Total} from '@/models/inventory/total';
import InvValue from '../value/value';

interface Props {
	inventory: Inventory;
	data: VariantTypes[];
	total: Total;
}

const ViewProductComponent: FC<Props> = ({inventory, data, total}) => {
	const url = `inventory/value?id=${inventory.id}`;

	return (
		<div className='grid max-w-[59rem] flex-1 auto-rows-max gap-4'>
			<SeeProductHeader inventory={inventory} />
			<InvValue title='Inventory Value' description='Total item stock value' value={total} url={url} />
			<div className='grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8'>
				<div className='grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8'>
					<ProductDetails inventory={inventory} />
				</div>
				<div className='grid auto-rows-max items-start gap-4 lg:gap-8'>
					<SeeProductImages inventory={inventory} />
				</div>
			</div>
			<SeeProductOptions data={data} />
			<SeeProductVariants inventory={inventory} />
		</div>
	);
};

export default ViewProductComponent;

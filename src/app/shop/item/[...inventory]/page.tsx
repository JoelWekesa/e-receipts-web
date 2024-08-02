import {getStoreInventoryItem} from '@/services/page/inventory/store/store-inventory-item';
import {FC} from 'react';

interface Props {
	params: {inventory: string[]};
}

const Item: FC<Props> = async ({params}) => {
	const {inventory} = params;

	const store = inventory[0];
	const name = inventory[1];

	const inventoryItem = await getStoreInventoryItem({store, name});

	return <div>{JSON.stringify(inventoryItem)}</div>;
};

export default Item;

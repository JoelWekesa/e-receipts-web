import React from 'react';
import {Switch} from '../ui/switch';
import {Label} from '../ui/label';
import {useAtom} from 'jotai';
import inventoryTypeAtom from '@/atoms/receiptgen/inventory-type';

const ToggleInventory = () => {
	const [inventoryType, setInventoryType] = useAtom(inventoryTypeAtom);

	return (
		<div className='flex items-center justify-end space-x-2 p-3 my-2'>
			<Label htmlFor='airplane-mode'>Select Products From Inventory</Label>
			<Switch id='inventory-type' onCheckedChange={() => setInventoryType(!inventoryType)} checked={inventoryType} />
		</div>
	);
};

export default ToggleInventory;

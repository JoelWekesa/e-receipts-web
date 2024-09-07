import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs';
import {Category} from '@/models/inventory/category';
import {FC} from 'react';
import AddSingleProductComponent from './single';
import AddProduct from './variant';

interface Props {
	categories: Category[];
	storeId: string;
	token: string;
}

const AddInventoryTabs: FC<Props> = ({categories, storeId, token}) => {
	return (
		<Tabs defaultValue='simple' className='w-full'>
			<TabsList className='grid grid-cols-2 w-[400px]'>
				<TabsTrigger value='simple'>Simple</TabsTrigger>
				<TabsTrigger value='variant'>With Variants</TabsTrigger>
			</TabsList>
			<TabsContent value='simple'>
				<AddSingleProductComponent categories={categories} storeId={storeId} token={token} />
			</TabsContent>
			<TabsContent value='variant'>
				<AddProduct categories={categories} storeId={storeId} token={token} />
			</TabsContent>
		</Tabs>
	);
};

export default AddInventoryTabs;

import {Cart} from '@/atoms/cart/add';
import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs';
import {FC} from 'react';
import ShoppingCartItemsComponent from './cart';
import CheckOutForm from './checkout-form';

interface Props {
	cart: Cart;
}

const MobileCheckOutTabs: FC<Props> = ({cart}) => {
	return (
		<Tabs defaultValue='shipping' className='w-full'>
			<TabsList className='grid w-full grid-cols-2'>
				<TabsTrigger value='shipping'>Shipping</TabsTrigger>
				<TabsTrigger value='confirm'>Confirm</TabsTrigger>
			</TabsList>
			<TabsContent value='shipping'>
				<CheckOutForm />
			</TabsContent>
			<TabsContent value='confirm'>
				<ShoppingCartItemsComponent cart={cart} />
			</TabsContent>
		</Tabs>
	);
};

export default MobileCheckOutTabs;

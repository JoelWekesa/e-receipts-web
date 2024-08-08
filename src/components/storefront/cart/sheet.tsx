'use client';
import {openCart} from '@/atoms/cart/add';
import {Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle} from '@/components/ui/sheet';
import {useAtom} from 'jotai';
import CartItemsComponent from './cart-items';

const CartSheet = () => {
	const [open, setOpen] = useAtom(openCart);

	const toggleOpen = () => {
		setOpen(!open);
	};

	return (
		<Sheet open={open} onOpenChange={toggleOpen}>
			<SheetContent>
				<SheetHeader>
					<SheetTitle>
						<div className='flex flex-row justify-between'>
							<h2 className='text-xl font-semibold'>My Cart</h2>
						</div>
					</SheetTitle>
					<SheetDescription>Proceed to checkout or continue shopping by closing this sheet</SheetDescription>
				</SheetHeader>
				<CartItemsComponent />
			</SheetContent>
		</Sheet>
	);
};

export default CartSheet;

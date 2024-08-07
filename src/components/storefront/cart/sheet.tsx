'use client';
import {openCart} from '@/atoms/cart/add';
import {Button} from '@/components/ui/button';
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
} from '@/components/ui/sheet';
import {useAtom} from 'jotai';
import CartItemsComponent from './cart-items';

const CartSheet = () => {
	const [open, setOpen] = useAtom(openCart);

	const toggleOpen = () => {
		setOpen(!open);
	};

	return (
		<Sheet open={open}>
			<SheetContent>
				<SheetHeader>
					<SheetTitle>
						<div className='flex flex-row justify-between'>
							<h2 className='text-xl font-semibold'>My CartCart</h2>
							<div className='flex flex-row items-center'>
								<Button type='button' onClick={toggleOpen}>
									Continue shopping
								</Button>
							</div>
						</div>
					</SheetTitle>
					<SheetDescription>Proceed to checkout or continue shopping by closing this sheet</SheetDescription>
				</SheetHeader>
				<CartItemsComponent />
				<SheetFooter>
					<SheetClose asChild>
						<Button type='submit'>Save changes</Button>
					</SheetClose>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	);
};

export default CartSheet;

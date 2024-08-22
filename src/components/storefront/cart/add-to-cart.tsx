'use client';

import {cartActions, cartAtom, openCart} from '@/atoms/cart/add';
import {cartVariant} from '@/atoms/cart/variant';
import {Form} from '@/components/ui/form';
import {Sheet, SheetContent, SheetHeader} from '@/components/ui/sheet';
import {Inventory} from '@/models/inventory/inventory';
import {useLoadedCartItems} from '@/providers/cart-items';
import useAddToCart from '@/services/cart/add';
import clsx from 'clsx';
import {useAtom} from 'jotai';
import {Loader2, PlusIcon} from 'lucide-react';
import {useForm} from 'react-hook-form';
import CartItemsComponent from './cart-items';
import LoadingDots from './loadingdots';
import {FC} from 'react';

interface Props {
	product: Inventory;
	shop: string;
}

export const AddToCart: FC<Props> = ({product, shop}) => {
	const {cartId} = useLoadedCartItems();
	const buttonClasses =
		'relative flex w-full items-center justify-center rounded-full bg-blue-600 p-4 tracking-wide text-white';

	const disabledClasses = 'cursor-not-allowed opacity-60 hover:opacity-60';

	const [variant, _] = useAtom(cartVariant);

	const [{cart}, setCart] = useAtom(cartAtom);

	// const [__, actions] = useAtom(cartActions);

	const defaultVariantId = product.Variant[0].id;
	const selectedVariantId = variant?.id || defaultVariantId;

	const [{loading}, setActions] = useAtom(cartActions);

	const successFn = async () => {
		const updatedCart = cart.map((item) => {
			if (item.id === selectedVariantId) {
				return {
					...item,
					product_name: item.variant_name,
					items: item.items + 1,
				};
			}

			return item;
		});

		setCart({
			cartId,
			cart: updatedCart,
		});

		setActions({
			loading: false,
			variantId: '',
		});

		setOpen(true);
	};

	const {mutate: add, isPending} = useAddToCart({
		successFn,
	});

	const [open, setOpen] = useAtom(openCart);

	const toggleSheet = () => {
		setOpen(!open);
	};

	const handleAddToCart = async () => {
		setActions({
			loading: true,
			variantId: selectedVariantId,
		});

		add({cartId, variantId: selectedVariantId});
	};

	const form = useForm();

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(handleAddToCart)}>
				{isPending || !variant || loading ? (
					<button aria-label='Please select an option' disabled className={clsx(buttonClasses, disabledClasses)}>
						<div className='absolute left-0 ml-4'>
							{loading || isPending ? <LoadingDots className='bg-white justify-center' /> : <PlusIcon className='h-5' />}
						</div>
						Add To Cart
					</button>
				) : (
					<button
						className={clsx(buttonClasses, {
							'hover:opacity-90': true,
						})}
						disabled={isPending || loading || !!!variant}>
						{isPending || loading ? <Loader2 className='h-5 animate-spin' /> : <PlusIcon className='h-5' />}
						Add To Cart
					</button>
				)}
				<Sheet open={open} onOpenChange={toggleSheet}>
					<SheetContent className='w-[400px] sm:w-[540px]'>
						<SheetHeader>My Cart</SheetHeader>
						<CartItemsComponent
							cart={{
								cartId,
								cart,
							}}
							shop={shop}
						/>
					</SheetContent>
				</Sheet>
			</form>
		</Form>
	);
};

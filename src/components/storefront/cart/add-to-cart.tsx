'use client';

import {getOrGenCookie} from '@/app/actions';
import {cartVariant} from '@/atoms/cart/variant';
import {Form} from '@/components/ui/form';
import {Sheet, SheetContent, SheetHeader} from '@/components/ui/sheet';
import {Inventory} from '@/models/inventory/inventory';
import useAddToCart from '@/services/cart/add';
import clsx from 'clsx';
import {useAtom} from 'jotai';
import {Loader2, PlusIcon} from 'lucide-react';
import {useState} from 'react';
import {useForm} from 'react-hook-form';
import CartItemsComponent from './cart-items';

export function AddToCart({product}: {product: Inventory}) {
	const buttonClasses =
		'relative flex w-full items-center justify-center rounded-full bg-blue-600 p-4 tracking-wide text-white';

	const disabledClasses = 'cursor-not-allowed opacity-60 hover:opacity-60';

	const [variant, _] = useAtom(cartVariant);

	const defaultVariantId = product.Variant[0].id;
	const selectedVariantId = variant?.id || defaultVariantId;

	const {mutate: add, isPending} = useAddToCart();

	const [open, setOpen] = useState(false);

	const toggleSheet = () => {
		setOpen(!open);
	};

	const handleAddToCart = async () => {
		const cartId = await getOrGenCookie();

		add({cartId, variantId: selectedVariantId});

		toggleSheet();
	};

	const form = useForm();

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(handleAddToCart)}>
				{isPending ? (
					<button aria-label='Please select an option' disabled className={clsx(buttonClasses, disabledClasses)}>
						<div className='absolute left-0 ml-4'>
							<PlusIcon className='h-5' />
						</div>
						Add To Cart
					</button>
				) : (
					<button
						className={clsx(buttonClasses, {
							'hover:opacity-90': true,
						})}
						disabled={isPending}>
						{isPending ? <Loader2 className='h-5' /> : <PlusIcon className='h-5' />}
						Add To Cart
					</button>
				)}
				<Sheet open={open} onOpenChange={toggleSheet}>
					<SheetContent>
						<SheetHeader>My Cart</SheetHeader>
						<CartItemsComponent />
					</SheetContent>
				</Sheet>
			</form>
		</Form>
	);
}

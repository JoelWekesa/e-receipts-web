import inventoryAtom from '@/atoms/inventory/inventory';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Separator} from '@/components/ui/separator';
import {useAtom} from 'jotai';
import React from 'react';

const ProductDetails = () => {
	const [data, _] = useAtom(inventoryAtom);

	return (
		<Card x-chunk='dashboard-07-chunk-0'>
			<CardHeader>
				<CardTitle>Product Details</CardTitle>
				<CardDescription>{`Seeing product details for ${data?.inventory?.name}`}</CardDescription>
			</CardHeader>

			<Separator />
			<CardContent className='mt-4'>
				<div className='grid gap-6'>
					<div className='grid gap-3'>
						<div className='flex flex-col gap-2'>
							<div className=''>Product Description</div>
							<div>
								<p className='text-[0.8rem] text-muted-foreground'>{data?.inventory?.description}</p>
							</div>
						</div>
					</div>

					<div className='grid gap-3'>
						<div className='flex flex-col gap-2'>
							<div className=''>Product Category</div>
							<div>
								<p className='text-[0.8rem] text-muted-foreground'>{data?.inventory?.category?.name}</p>
							</div>
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	);
};

export default ProductDetails;

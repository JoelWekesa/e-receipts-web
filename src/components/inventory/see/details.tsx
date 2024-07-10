import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Separator} from '@/components/ui/separator';
import {Inventory} from '@/models/inventory/inventory';
import {FC} from 'react';

interface Props {
	inventory: Inventory;
}

const ProductDetails: FC<Props> = ({inventory}) => {
	return (
		<Card x-chunk='dashboard-07-chunk-0'>
			<CardHeader>
				<CardTitle>Product Details</CardTitle>
				<CardDescription>{`Seeing product details for ${inventory.name}`}</CardDescription>
			</CardHeader>

			<Separator />
			<CardContent className='mt-4'>
				<div className='grid gap-6'>
					<div className='grid gap-3'>
						<div className='flex flex-col gap-2'>
							<div className=''>Product Description</div>
							<div>
								<p className='text-[0.8rem] text-muted-foreground'>{inventory.description}</p>
							</div>
						</div>
					</div>

					<div className='grid gap-3'>
						<div className='flex flex-col gap-2'>
							<div className=''>Product Category</div>
							<div>
								<p className='text-[0.8rem] text-muted-foreground'>{inventory?.category?.name}</p>
							</div>
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	);
};

export default ProductDetails;

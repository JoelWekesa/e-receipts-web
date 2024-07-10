import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Inventory} from '@/models/inventory/inventory';
import Image from 'next/image';
import {FC} from 'react';

interface Props {
	inventory: Inventory;
}

const SeeProductImages: FC<Props> = ({inventory}) => {
	return (
		<Card className='overflow-hidden' x-chunk='dashboard-07-chunk-4'>
			<CardHeader>
				<CardTitle>Product Images</CardTitle>
				<CardDescription>All Product Image</CardDescription>
			</CardHeader>
			<CardContent>
				<div className='grid gap-2'>
					<div className='grid grid-cols-3 gap-2'>
						{inventory?.images?.map((image, index) => (
							<Image
								alt='Product image'
								className='aspect-square w-full rounded-md object-cover'
								height='84'
								key={index}
								src={image}
								width='84'
							/>
						))}
					</div>
				</div>
			</CardContent>
		</Card>
	);
};

export default SeeProductImages;

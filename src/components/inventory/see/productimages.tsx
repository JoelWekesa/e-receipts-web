import inventoryAtom from '@/atoms/inventory/inventory';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {useAtom} from 'jotai';
import Image from 'next/image';

const SeeProductImages = () => {
	const [data, _] = useAtom(inventoryAtom);

	return (
		<Card className='overflow-hidden' x-chunk='dashboard-07-chunk-4'>
			<CardHeader>
				<CardTitle>Product Images</CardTitle>
				<CardDescription>All Product Image</CardDescription>
			</CardHeader>
			<CardContent>
				<div className='grid gap-2'>
					<div className='grid grid-cols-3 gap-2'>
						{data?.inventory?.images?.map((image, index) => (
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

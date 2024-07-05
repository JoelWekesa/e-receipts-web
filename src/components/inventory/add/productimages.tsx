import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import Image from 'next/image';
import {FC} from 'react';

const ProductImages: FC<{
	images: File[];
}> = ({images}) => {
	return (
		<Card className='overflow-hidden' x-chunk='dashboard-07-chunk-4'>
			<CardHeader>
				<CardTitle>Product Images</CardTitle>
				<CardDescription>All Product Image</CardDescription>
			</CardHeader>
			<CardContent>
				<div className='grid gap-2'>
					{/* <Image
						alt='Product image'
						className='aspect-square w-full rounded-md object-cover'
						height='300'
						src='/placeholder.svg'
						width='300'
					/> */}
					<div className='grid grid-cols-3 gap-2'>
						{images?.map((image, index) => (
							<Image
								alt='Product image'
								className='aspect-square w-full rounded-md object-cover'
								height='84'
								key={index}
								src={URL.createObjectURL(image)}
								width='84'
							/>
						))}
						{/* <button>
							<Image
								alt='Product image'
								className='aspect-square w-full rounded-md object-cover'
								height='84'
								src='/placeholder.svg'
								width='84'
							/>
						</button> */}
						{/* <button>
							<Image
								alt='Product image'
								className='aspect-square w-full rounded-md object-cover'
								height='84'
								src='/placeholder.svg'
								width='84'
							/>
						</button> */}
						{/* <button className='flex aspect-square w-full items-center justify-center rounded-md border border-dashed'>
							<Upload className='h-4 w-4 text-muted-foreground' />
							<span className='sr-only'>Upload</span>
						</button> */}
					</div>
				</div>
			</CardContent>
		</Card>
	);
};

export default ProductImages;

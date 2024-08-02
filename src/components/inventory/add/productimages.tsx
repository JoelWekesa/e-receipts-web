import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Separator} from '@/components/ui/separator';
import Image from 'next/image';
import {FC} from 'react';

const ProductImages: FC<{
	images: File[];
	thumbnail: File | null | undefined;
}> = ({images, thumbnail}) => {
	return (
		<Card className='overflow-hidden' x-chunk='dashboard-07-chunk-4'>
			<CardHeader>
				<CardTitle>Product Images</CardTitle>
				<CardDescription>All Product Image</CardDescription>
			</CardHeader>
			<CardContent>
				<div className='grid gap-2'>
					<div className='grid grid-cols-1'>
						<div className='flex flex-col gap-2'>
							<p className='text-muted-foreground'>Product thumbnail</p>
							{thumbnail && (
								<Image
									alt='Product image'
									className='h-full w-full object-contain object-center p-2'
									height='84'
									src={URL.createObjectURL(thumbnail)}
									width='84'
								/>
							)}
						</div>
					</div>
					<Separator />

					<div className='flex flex-col gap-2'>
						<p className='text-muted-foreground'>Product images</p>
						<div className='grid grid-cols-2 gap-2'>
							{images?.map((image, index) => (
								<Image
									alt='Product image'
									className='h-full w-full object-contain object-center p-2'
									height='150'
									key={index}
									src={URL.createObjectURL(image)}
									width='150'
								/>
							))}
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	);
};

export default ProductImages;

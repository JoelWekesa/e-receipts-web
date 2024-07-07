import editImagesAtom from '@/atoms/inventory/images';
import {Button} from '@/components/ui/button';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {useAtom} from 'jotai';
import {Trash2} from 'lucide-react';
import Image from 'next/image';

const EditProductImages = () => {
	const [images, setImages] = useAtom(editImagesAtom);

	const removeCurrentImage = (image: string) => {
		setImages({
			...images,
			current: images?.current?.filter((i) => i !== image),
			removed: [...(images?.removed || []), image],
		});
	};

	const removeNewImage = (image: File) => {
		setImages({
			...images,
			new: images?.new?.filter((i) => i !== image),
		});
	};

	return (
		<Card className='overflow-hidden' x-chunk='dashboard-07-chunk-4'>
			<CardHeader>
				<CardTitle>Product Images</CardTitle>
				<CardDescription>All Product Image</CardDescription>
			</CardHeader>
			<CardContent>
				<div className='grid gap-2'>
					<div className='grid grid-cols-3 gap-2'>
						{images?.current?.map((image, index) => (
							<div className='relative' key={index}>
								<Image
									alt='Product image'
									className='aspect-square w-full rounded-md object-cover'
									height='84'
									key={index}
									src={image}
									width='84'
								/>
								<Button
									variant='ghost'
									size='icon'
									className='absolute top-1 right-1'
									aria-label='Remove image'
									onClick={() => removeCurrentImage(image)}>
									<Trash2 className='h-4 w-4 rounded-full' color='red' />
								</Button>
							</div>
						))}

						{images?.new?.map((image, index) => (
							<div className='relative' key={index}>
								<Image
									alt='Product image'
									className='aspect-square w-full rounded-md object-cover'
									height='84'
									key={index}
									src={URL.createObjectURL(image)}
									width='84'
								/>
								<Button
									variant='ghost'
									size='icon'
									className='absolute top-1 right-1'
									aria-label='Remove image'
									onClick={() => removeNewImage(image)}>
									<Trash2 className='h-4 w-4 rounded-full' color='red' />
								</Button>
							</div>
						))}
					</div>
				</div>
			</CardContent>
		</Card>
	);
};

export default EditProductImages;

'use client';
import addImagesAtom from '@/atoms/inventory/addimage';
import variantsAtom from '@/atoms/inventory/variants';
import {Form} from '@/components/ui/form';
import {Category} from '@/models/inventory/category';
import useAddProduct from '@/services/inventory/products/add';
import {zodResolver} from '@hookform/resolvers/zod';
import {useAtom} from 'jotai';
import {useSession} from 'next-auth/react';
import {FC, useMemo} from 'react';
import {useForm} from 'react-hook-form';
import {z} from 'zod';
import AddVariant from './add-variant';
import SelectProductCategory from './category';
import AddProductComponent from './product';
import ProductHeader from './productheader';
import ProductImages from './productimages';
import ProductVariant from './variant';
import VariantTypes from './variant-types';

const MAX_UPLOAD_SIZE = 1024 * 1024 * 1.8; // 1.8MB
const ACCEPTED_FILE_TYPES = ['image/png', 'image/jpeg', 'image/jpg'];

const formSchema = z.object({
	name: z.string({required_error: 'Please enter a product name'}),
	description: z.string().optional(),
	category: z.string({
		required_error: 'Please select a category',
	}),
	images: z.array(
		z
			.instanceof(File, {message: 'File is required'})
			.refine((file) => {
				return !file || file.size <= MAX_UPLOAD_SIZE;
			}, 'File size must be less than 3MB')
			.refine((file) => {
				return ACCEPTED_FILE_TYPES.includes(file.type);
			}, 'File must be an image')
	),
});

const AddProduct: FC<{categories: Category[]; storeId: string}> = ({categories, storeId}) => {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			category: '',
		},

		mode: 'onChange',
	});

	const [images, _] = useAtom(addImagesAtom);

	const [variants, __] = useAtom(variantsAtom);

	const {data: session} = useSession({
		required: true,
	});

	const token = session?.accessToken || '';

	const {mutate: add, isPending} = useAddProduct();

	const fVariants = useMemo(
		() =>
			variants.map((variant) => ({
				...variant,
				warnLevel: variant.warnLevel ? parseInt(variant.warnLevel) : 0,
				price: variant.price ? parseFloat(variant.price) : 0,
				quantity: variant.quantity ? parseInt(variant.quantity) : 0,
			})),
		[variants]
	);

	const handleSubmit = (data: z.infer<typeof formSchema>) => {
		add({
			data: {
				name: data.name,
				description: data.description || '',
				categoryId: data.category,
				files: images,
				variants: fVariants,
				storeId,
			},

			token,
		});
	};

	return (
		<div className='flex min-h-screen w-full flex-col bg-muted/40'>
			<div className='flex flex-col sm:gap-4 sm:py-4 sm:pl-14'>
				<main className='grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8'>
					<div className='mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4'>
						<Form {...form}>
							<form onSubmit={form.handleSubmit(handleSubmit)}>
								<ProductHeader isPending={isPending} storeId={storeId} />
							</form>
						</Form>

						<div className='grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8'>
							<div className='grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8'>
								<Form {...form}>
									<form className='grid auto-rows-max items-start gap-4 lg:gap-8'>
										<AddProductComponent form={form} />
										<SelectProductCategory categories={categories} form={form} />
										{/* <Button type='submit'>Save and Continue</Button> */}
									</form>
								</Form>
							</div>
							<div className='grid auto-rows-max items-start gap-4 lg:gap-8'>
								{/* <ProductStatus /> */}
								<ProductImages images={images} />
							</div>
						</div>
						<VariantTypes />
						<AddVariant />
						<ProductVariant />
					</div>
				</main>
			</div>
		</div>
	);
};

export default AddProduct;

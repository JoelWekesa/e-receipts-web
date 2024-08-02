'use client';
import addImagesAtom, {thumbnailAtom} from '@/atoms/inventory/addimage';
import optionsAtom from '@/atoms/inventory/options';
import variantsAtom from '@/atoms/inventory/variants';
import {Form} from '@/components/ui/form';
import {Category} from '@/models/inventory/category';
import useAddProduct from '@/services/inventory/products/add';
import {zodResolver} from '@hookform/resolvers/zod';
import {useAtom} from 'jotai';
import {FC} from 'react';
import {useForm} from 'react-hook-form';
import {z} from 'zod';
import AddVariant from './add-variant';
import SelectProductCategory from './category';
import AddProductComponent from './product';
import ProductHeader from './productheader';
import ProductImages from './productimages';
import ProductVariant from './variant';
import VariantTypes from './variant-types';
import {pricePAttern} from '@/utils/regex';

const MAX_UPLOAD_SIZE = 1024 * 1024 * 1.8; // 1.8MB
const ACCEPTED_FILE_TYPES = ['image/png', 'image/jpeg', 'image/jpg'];

const formSchema = z.object({
	name: z.string({required_error: 'Please enter a product name'}),
	description: z.string().optional(),
	category: z.string({
		required_error: 'Please select a category',
	}),

	thumbnail: z
		.instanceof(File, {message: 'Thumbnail is required'})
		.refine((file) => {
			return !file || file.size <= MAX_UPLOAD_SIZE;
		}, 'File size must be less than 3MB')
		.refine((file) => {
			return ACCEPTED_FILE_TYPES.includes(file.type);
		}, 'File must be an image')
		.optional(),
	images: z
		.array(
			z
				.instanceof(File, {message: 'File is required'})
				.refine((file) => {
					return !file || file.size <= MAX_UPLOAD_SIZE;
				}, 'File size must be less than 3MB')
				.refine((file) => {
					return ACCEPTED_FILE_TYPES.includes(file.type);
				}, 'File must be an image')
		)
		.optional(),

	price: z
		.string()
		.refine(() => pricePAttern)
		.optional(),
});

const AddProduct: FC<{categories: Category[]; storeId: string; token: string}> = ({categories, storeId, token}) => {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			category: '',
			name: '',
			description: '',
			images: [],
			thumbnail: undefined,
			price: undefined,
		},

		mode: 'onChange',
	});

	const [images, setImages] = useAtom(addImagesAtom);

	const [thumbnail, setThumbnail] = useAtom(thumbnailAtom);

	const [variants, setVariants] = useAtom(variantsAtom);

	const [options, setOptions] = useAtom(optionsAtom);

	const handleSuccess = () => {
		form.reset();
		setVariants([]);
		setImages([]);
		setOptions([]);
		setThumbnail(null);
	};

	const {mutate: add, isPending} = useAddProduct(handleSuccess);

	const handleSubmit = (data: z.infer<typeof formSchema>) => {
		add({
			data: {
				name: data.name,
				description: data.description || '',
				categoryId: data.category,
				files: images,
				variants,
				storeId,
				options,
				thumbnail: thumbnail as File,
				price: data.price?.toString(),
			},

			token,
		});
	};

	return (
		<div className='grid max-w-[59rem] flex-1 auto-rows-max gap-4'>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(handleSubmit)}>
					<ProductHeader isPending={isPending} />
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
					<ProductImages images={images} thumbnail={thumbnail} />
				</div>
			</div>
			<VariantTypes />
			<AddVariant />
			<ProductVariant />
		</div>
	);
};

export default AddProduct;

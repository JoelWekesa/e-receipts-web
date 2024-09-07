'use client';
import addImagesAtom, {thumbnailAtom} from '@/atoms/inventory/addimage';
import optionsAtom from '@/atoms/inventory/options';
import variantsAtom from '@/atoms/inventory/variants';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Form} from '@/components/ui/form';
import {Category} from '@/models/inventory/category';
import useAddProduct from '@/services/inventory/products/add';
import {pricePAttern} from '@/utils/regex';
import {zodResolver} from '@hookform/resolvers/zod';
import {useAtom} from 'jotai';
import {FC, useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {z} from 'zod';
import ProductImages from './images/images';
import Thumbnail from './images/thumbnail';
import AddProductComponent from './product';
import ProductHeader from './productheader';
import VariantTypes from './variant-types';

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

	useEffect(() => {
		setImages([]);
		setOptions([]);
		setThumbnail(null);
		setVariants([]);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

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
				<form onSubmit={form.handleSubmit(handleSubmit)} className='gap-4'>
					<ProductHeader isPending={isPending} title='Add Product with Variant' />
					<AddProductComponent categories={categories} />
				</form>
			</Form>
			<VariantTypes />
			<Form {...form}>
				<form>
					<Card>
						<CardHeader>
							<CardTitle>Product Media</CardTitle>
							<CardDescription>Give your buyers a visual representation of your product</CardDescription>
						</CardHeader>
						<CardContent>
							<Thumbnail />
							<ProductImages />
						</CardContent>
					</Card>
				</form>
			</Form>
		</div>
	);
};

export default AddProduct;

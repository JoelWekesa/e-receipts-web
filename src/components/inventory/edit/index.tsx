'use client';
import editImagesAtom from '@/atoms/inventory/images';
import inventoryAtom from '@/atoms/inventory/inventory';
import {Form} from '@/components/ui/form';
import {Category} from '@/models/inventory/category';
import {Inventory} from '@/models/inventory/inventory';
import useEditInventory from '@/services/inventory/edit/inventory';
import {zodResolver} from '@hookform/resolvers/zod';
import {useAtom} from 'jotai';
import {useSession} from 'next-auth/react';
import {FC} from 'react';
import {useForm} from 'react-hook-form';
import {z} from 'zod';
import SelectProductCategory from '../add/category';
import ProductHeader from '../add/productheader';
import {EditProductComponent} from './product';
import EditProductImages from './productimages';
import EditVariantTypes from './variant-types';
import optionsAtom from '@/atoms/inventory/options';

const MAX_UPLOAD_SIZE = 1024 * 1024 * 1.8; // 1.8MB
const ACCEPTED_FILE_TYPES = ['image/png', 'image/jpeg', 'image/jpg'];

const formSchema = z.object({
	name: z.string({required_error: 'Please enter a product name'}),
	description: z.string().optional(),
	category: z.string({
		required_error: 'Please select a category',
	}),
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
});

const EditProduct: FC<{categories: Category[]; storeId: string; inventory?: Inventory | null}> = ({
	categories,
	storeId,
	inventory,
}) => {
	const [data, __] = useAtom(inventoryAtom);
	const [options, ___] = useAtom(optionsAtom);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			category: data?.inventory?.category?.id || '',
			name: data?.inventory?.name || '',
			description: data?.inventory?.description || '',
		},

		mode: 'onChange',
	});

	const [images, _] = useAtom(editImagesAtom);

	const {data: session} = useSession({
		required: true,
	});

	const token = session?.accessToken || '';

	const {mutate: edit, isPending} = useEditInventory();

	const handleSubmit = (data: z.infer<typeof formSchema>) => {
		edit({
			data: {
				...data,
				images: images?.new || [],
				description: data.description || '',
				removed: images?.removed || [],
				id: inventory?.id || '',
				options,
			},

			token,
		});
	};

	return (
		<div className='grid max-w-[59rem] flex-1 auto-rows-max gap-4'>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(handleSubmit)}>
					<ProductHeader isPending={isPending} storeId={storeId} edit />
				</form>
			</Form>

			<div className='grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8'>
				<div className='grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8'>
					<Form {...form}>
						<form className='grid auto-rows-max items-start gap-4 lg:gap-8'>
							<EditProductComponent form={form} inventory={data?.inventory} />
							<SelectProductCategory categories={categories} form={form} />
							{/* <Button type='submit'>Save and Continue</Button> */}
						</form>
					</Form>
				</div>
				<div className='grid auto-rows-max items-start gap-4 lg:gap-8'>
					{/* <ProductStatus /> */}
					<EditProductImages />
				</div>
			</div>
			<EditVariantTypes />
			{/* <AddVariant /> */}
			{/* <EditProductVariant /> */}
		</div>
	);
};

export default EditProduct;

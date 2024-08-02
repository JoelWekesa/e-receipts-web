'use client';
import editImagesAtom from '@/atoms/inventory/images';
import optionsAtom from '@/atoms/inventory/options';
import {Form} from '@/components/ui/form';
import {Category} from '@/models/inventory/category';
import {Inventory} from '@/models/inventory/inventory';
import {Option} from '@/models/inventory/option';
import useEditInventory from '@/services/inventory/edit/inventory';
import useSingleInventory from '@/services/inventory/single/single';
import {pricePAttern} from '@/utils/regex';
import {zodResolver} from '@hookform/resolvers/zod';
import {useAtom} from 'jotai';
import {FC} from 'react';
import {useForm} from 'react-hook-form';
import {z} from 'zod';
import SelectProductCategory from '../add/category';
import ProductHeader from '../add/productheader';
import {EditProductComponent} from './product';
import EditProductImages from './productimages';
import EditVariantTypes from './variant-types';

interface Props {
	categories: Category[];
	inventory: Inventory;
	opts: Option[];
	token: string;
}

const MAX_UPLOAD_SIZE = 1024 * 1024 * 1.8; // 1.8MB
const ACCEPTED_FILE_TYPES = ['image/png', 'image/jpeg', 'image/jpg'];

const formSchema = z.object({
	name: z.string({required_error: 'Please enter a product name'}),
	description: z.string().optional(),
	category: z.string({
		required_error: 'Please select a category',
	}),
	thumbnail: z
		.instanceof(File, {message: 'File is required'})
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

const EditProduct: FC<Props> = ({categories, inventory, opts, token}) => {
	const {data: inventoryItem} = useSingleInventory({
		id: inventory.id,
		inventory,
	});

	const [options, __] = useAtom(optionsAtom);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			category: inventoryItem.category.id,
			name: inventoryItem.name,
			description: inventoryItem.description,
			price: '' + inventoryItem?.price,
		},

		mode: 'onChange',
	});

	const [images, _] = useAtom(editImagesAtom);

	const {mutate: edit, isPending} = useEditInventory();

	const handleSubmit = (data: z.infer<typeof formSchema>) => {
		edit({
			data: {
				...data,
				thumbnail: images?.thumbnail || null,
				images: images?.new || [],
				description: data.description || '',
				removed: images?.removed || [],
				id: inventoryItem?.id || '',
				options,
				price: data.price || undefined,
			},

			token,
		});
	};

	return (
		<div className='grid max-w-[59rem] flex-1 auto-rows-max gap-4'>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(handleSubmit)}>
					<ProductHeader isPending={isPending} edit />
				</form>
			</Form>

			<div className='grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8'>
				<div className='grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8'>
					<Form {...form}>
						<form className='grid auto-rows-max items-start gap-4 lg:gap-8'>
							<EditProductComponent form={form} inventory={inventoryItem} />
							<SelectProductCategory categories={categories} form={form} />
							{/* <Button type='submit'>Save and Continue</Button> */}
						</form>
					</Form>
				</div>
				<div className='grid auto-rows-max items-start gap-4 lg:gap-8'>
					<EditProductImages />
				</div>
			</div>
			<EditVariantTypes opts={opts} />
		</div>
	);
};

export default EditProduct;

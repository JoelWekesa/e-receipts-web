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
// import SelectProductCategory from '../add/category';
import AddProductComponent from '../add/product';
import ProductHeader from '../add/productheader';
import EditVariantTypes from './variant-types';
import Thumbnail from './images/thumbnail';
import ProductImages from './images/images';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';

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

const EditProduct: FC<Props> = ({inventory, opts, token, categories}) => {
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
					<AddProductComponent categories={categories} />
				</form>
			</Form>
			<EditVariantTypes opts={opts} />
			<Form {...form}>
				<form>
					<Card>
						<CardHeader>
							<CardTitle>Product Media</CardTitle>
							<CardDescription>Give your buyers a visual representation of your product</CardDescription>
						</CardHeader>
						<CardContent>
							<Thumbnail inventory={inventoryItem} />
							<ProductImages inventory={inventoryItem} />
						</CardContent>
					</Card>
				</form>
			</Form>
		</div>
	);
};

export default EditProduct;

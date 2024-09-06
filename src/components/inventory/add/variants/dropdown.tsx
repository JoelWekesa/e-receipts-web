'use client';
import {Edit, Trash} from 'lucide-react';

import variantsAtom, {ModeVariant, variantAtom} from '@/atoms/inventory/variants';
import {Button} from '@/components/ui/button';
import {Dialog, DialogContent, DialogFooter} from '@/components/ui/dialog';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {Form} from '@/components/ui/form';
import {positiveNumberRegex} from '@/utils/regex';
import {zodResolver} from '@hookform/resolvers/zod';
import {DialogTrigger} from '@radix-ui/react-dialog';
import {useAtom} from 'jotai';
import {FC, ReactNode, useState} from 'react';
import {useForm} from 'react-hook-form';
import {z} from 'zod';
import EditVariant from './edit';

interface Drop {
	label: string;
	variant: ModeVariant;
}

const formSchema = z.object({
	name: z.array(z.object({name: z.string(), value: z.string()})),
	price: z.string({required_error: 'Please enter a variant price'}).regex(positiveNumberRegex, {
		message: 'Please enter a valid price',
	}),
	discount: z.string({required_error: 'Please enter a variant discount'}).regex(positiveNumberRegex, {
		message: 'Please enter a valid price',
	}),
	quantity: z.string({required_error: 'Please enter a variant quantity'}).regex(positiveNumberRegex, {
		message: 'Please enter a valid quantity',
	}),
	warnLevel: z
		.string()
		.regex(positiveNumberRegex, {
			message: 'Please enter a valid warn level',
		})
		.optional(),
	description: z.string(),
});

const VariantsDropDown: FC<{drop: Drop; children: ReactNode}> = ({drop, children}) => {
	const [variants, setVariants] = useAtom(variantsAtom);
	const [variant, setVariant] = useAtom(variantAtom);
	const [open, setOpen] = useState(false);

	const handleDelete = () => {
		const newVariants = variants.filter((variant) => variant !== drop.variant);
		setVariants(newVariants);
	};

	const handleEdit = (variant: ModeVariant) => {
		setOpen(!open);
		setVariant(variant);
	};

	const toggleOpen = () => setOpen(!open);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: variant?.name || [],
			price: variant?.price ? '' + variant.price : '',
			quantity: variant?.quantity ? '' + variant.quantity : '',
			warnLevel: variant?.warnLevel ? '' + variant.warnLevel : '',
			description: variant?.description || '',
			discount: variant?.discount ? '' + variant.discount : '',
		},
	});

	const handleSubmit = (data: z.infer<typeof formSchema>) => {
		const curr = {
			...data,
			price: Number(data.price),
			quantity: Number(data.quantity),
			warnLevel: Number(data.warnLevel),
			discount: Number(data.discount),
		};

		const updatedVariants = variants.map((v) => {
			if (v === drop.variant) {
				return {
					...curr,
					inventoryId: v.inventoryId,
				};
			}
			return v;
		});

		setVariants(updatedVariants);
		form.reset();
		toggleOpen();
	};

	return (
		<Dialog open={open}>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
				<DropdownMenuContent className='w-56'>
					<DropdownMenuLabel>{drop.label}</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<DropdownMenuGroup>
						<DialogTrigger asChild>
							<DropdownMenuItem onClick={() => handleEdit(drop.variant)}>
								<Edit className='mr-2 h-4 w-4' />
								<span>Edit Variant</span>
							</DropdownMenuItem>
						</DialogTrigger>

						<DropdownMenuItem onClick={handleDelete}>
							<Trash className='mr-2 h-4 w-4' />
							<span>Delete Variant</span>
						</DropdownMenuItem>
					</DropdownMenuGroup>
				</DropdownMenuContent>
			</DropdownMenu>
			<DialogContent className='sm:max-w-[425px] md:max-w-[800px] overflow-y-scroll max-h-screen py-3'>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(handleSubmit)}>
						<EditVariant />
						<DialogFooter className='my-4'>
							<Button type='button' variant='destructive' onClick={toggleOpen}>
								Cancel
							</Button>
							<Button type='submit'>Save Variant</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};

export default VariantsDropDown;

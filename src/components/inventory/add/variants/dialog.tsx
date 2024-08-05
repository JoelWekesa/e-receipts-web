'use client';

import optionsAtom from '@/atoms/inventory/options';
import Tips from '@/components/shared/tooltip';
import {Button} from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import {useAtom} from 'jotai';
import {InfoIcon, PlusCircle} from 'lucide-react';
import {useEffect, useState} from 'react';
import AddVariant from './add-variant';
import {z} from 'zod';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {Form} from '@/components/ui/form';
import variantsAtom from '@/atoms/inventory/variants';
import {positiveNumberRegex} from '@/utils/regex';

const formSchema = z.object({
	name: z.array(z.object({name: z.string(), value: z.string()})),
	price: z.string({required_error: 'Please enter a variant price'}).regex(positiveNumberRegex, {
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

const VariantsDialog = () => {
	const [options, _] = useAtom(optionsAtom);

	const [disabled, setDisabled] = useState(true);

	const [variants, setVariants] = useAtom(variantsAtom);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: [],
			price: '',
			quantity: '',
			warnLevel: '',
			description: '',
		},
	});

	const [open, setOpen] = useState(false);

	const toggleOpen = () => setOpen(!open);

	const handleSubmit = (data: z.infer<typeof formSchema>) => {
		const curr = {
			...data,
			price: Number(data.price),
			quantity: Number(data.quantity),
			warnLevel: Number(data.warnLevel),
		};

		setVariants([...variants, {...curr, inventoryId: ''}]);
		form.reset();
		toggleOpen();
	};

	useEffect(() => {
		setDisabled(options.length === 0);
	}, [options]);

	return (
		<Dialog open={open}>
			<DialogTrigger asChild>
				<div className='mt-5'>
					<div className='flex flex-row gap-2'>
						<p className={`text-sm font-semibold ${disabled && 'text-muted-foreground'}`}>Product variants</p>
						<Tips
							trigger={<InfoIcon className='h4 w-4 mx-2' color='#808080' />}
							content={
								<p>
									Variants are used to define the different options of a product. For example, a T-shirt can have different sizes
									and colors as variants.
								</p>
							}
						/>
					</div>

					<Button className='w-full' disabled={disabled} type='button' onClick={toggleOpen}>
						<PlusCircle className='h-4 w-4 mr-2' color='black' />
						<p className='dark:text-black'>Add Variant</p>
					</Button>
				</div>
			</DialogTrigger>
			<DialogContent className='sm:max-w-[425px] md:max-w-[800px] overflow-y-scroll max-h-screen py-3'>
				<DialogHeader>
					<DialogTitle>Add Variant</DialogTitle>
					<DialogDescription>
						<div className='flex flex-row  items-center'>
							<p>
								{`Variants are used to define the different options of a product. For example, a T-shirt can have different sizes and colors as variants.`}
							</p>
						</div>
					</DialogDescription>
				</DialogHeader>

				<Form {...form}>
					<form onSubmit={form.handleSubmit(handleSubmit)}>
						<AddVariant />
						<DialogFooter>
							<Button type='submit'>Save Variant</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};

export default VariantsDialog;

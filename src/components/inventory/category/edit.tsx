import {DialogDescription, DialogFooter, DialogHeader, DialogTitle} from '@/components/ui/dialog';

import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';
import {Button} from '@/components/ui/button';
import {z} from 'zod';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {FC} from 'react';
import {Category} from '@/models/inventory/category';
import {useEditCategory} from '@/services/inventory/categories/edit';
import {useSession} from 'next-auth/react';
import {Loader2} from 'lucide-react';
import {Input} from '@/components/ui/input';

const validationSchema = z.object({
	name: z.string().min(3, {
		message: 'Category name must be at least 3 characters',
	}),
});

const EditCategory: FC<{category: Category; handleClick: () => void}> = ({category, handleClick}) => {
	const form = useForm<z.infer<typeof validationSchema>>({
		defaultValues: {
			name: category?.name || '',
		},

		resolver: zodResolver(validationSchema),
	});

	const {mutate: edit, isPending} = useEditCategory(handleClick);

	const {data: session} = useSession({
		required: true,
	});

	const token = session?.accessToken || '';

	const onSubmit = (data: z.infer<typeof validationSchema>) => {
		edit({...data, id: category?.id || '', token, storeId: category?.storeId || ''});
	};

	return (
		<>
			<DialogHeader>
				<DialogTitle>Edit Category</DialogTitle>
				<DialogDescription>{`Change category name. Click save when you're done.`}</DialogDescription>
			</DialogHeader>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<div className='grid gap-4 py-4'>
						<FormField
							name='name'
							control={form.control}
							rules={{required: true}}
							render={({field}) => (
								<FormItem>
									<FormLabel>Category Name</FormLabel>
									<FormControl>
										<Input placeholder='Enter new category name' {...field} required />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<DialogFooter>
						<Button variant='destructive' disabled={isPending} onClick={handleClick} type='button'>
							Cancel
						</Button>
						<Button type='submit' disabled={isPending}>
							{isPending && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}Save Changes
						</Button>
					</DialogFooter>
				</form>
			</Form>
		</>
	);
};

export default EditCategory;

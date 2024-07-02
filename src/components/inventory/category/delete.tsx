import {DialogDescription, DialogFooter, DialogHeader, DialogTitle} from '@/components/ui/dialog';

import {Button} from '@/components/ui/button';
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';
import {Input} from '@/components/ui/input';
import {Category} from '@/models/inventory/category';
import {useDeleteCategory} from '@/services/inventory/categories/delete';
import {zodResolver} from '@hookform/resolvers/zod';
import {Loader2} from 'lucide-react';
import {useSession} from 'next-auth/react';
import {FC, useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {z} from 'zod';

const validationSchema = z.object({
	name: z.string().min(3, {
		message: 'Category name must be at least 3 characters',
	}),
});

const DeleteCategory: FC<{category: Category; handleClick: () => void}> = ({category, handleClick}) => {
	const form = useForm<z.infer<typeof validationSchema>>({
		defaultValues: {
			name: '',
		},

		mode: 'onChange',

		resolver: zodResolver(validationSchema),
	});

	const {mutate: del, isPending} = useDeleteCategory(handleClick);

	const {data: session} = useSession({
		required: true,
	});

	const token = session?.accessToken || '';

	const [name, setName] = useState('');

	useEffect(() => {
		if (name === category?.name) {
			del({id: category?.id || '', token});
		}
	}, [name, category, del, token]);

	const onSubmit = (data: z.infer<typeof validationSchema>) => {
		setName(data.name);
	};

	return (
		<>
			<DialogHeader>
				<DialogTitle>Delete Category</DialogTitle>
				<DialogDescription>
					<p>{`Are you sure you want to delete ${category?.name}? This action cannot be undone. `}</p>
					<p>
						Please type <span className='text-red-600 font-bold text-lg select-none'>{category?.name}</span> to confirm.
					</p>
				</DialogDescription>
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
										<Input placeholder='Enter new category name' {...field} required autoComplete='off' />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<DialogFooter>
						<Button
							variant='default'
							disabled={isPending}
							onClick={handleClick}
							type='button'
							className='bg-green-600 hover:bg-green-700 text-white'>
							Cancel
						</Button>
						<Button type='submit' disabled={isPending} variant='destructive'>
							{isPending && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}Delete
						</Button>
					</DialogFooter>
				</form>
			</Form>
		</>
	);
};

export default DeleteCategory;

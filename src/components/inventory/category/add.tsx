'use client';
import {Button} from '@/components/ui/button';
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from '@/components/ui/card';
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';
import {Input} from '@/components/ui/input';
import {useAddCategory} from '@/services/inventory/categories/add';
import {zodResolver} from '@hookform/resolvers/zod';
import {Loader2} from 'lucide-react';
import {useSession} from 'next-auth/react';
import {FC} from 'react';
import {useForm} from 'react-hook-form';
import {z} from 'zod';

const validationSchema = z.object({
	name: z.string().min(3, {
		message: 'Category name must be at least 3 characters',
	}),
});

const AddCategory: FC<{storeId: string}> = ({storeId}) => {
	const form = useForm<z.infer<typeof validationSchema>>({
		defaultValues: {
			name: '',
		},

		resolver: zodResolver(validationSchema),
	});

	const {data: session} = useSession({
		required: true,
	});

	const token = session?.accessToken || '';

	const {mutate: add, isPending} = useAddCategory(() => form.reset());

	const handleSubmit = (data: z.infer<typeof validationSchema>) => {
		add({...data, storeId, token});
	};

	return (
		<Card x-chunk='dashboard-07-chunk-2'>
			<Form {...form}>
				<form className='grid gap-6 sm:grid-cols-1' onSubmit={form.handleSubmit(handleSubmit)}>
					<CardHeader>
						<CardTitle>Product Category</CardTitle>
					</CardHeader>
					<CardContent>
						<FormField
							name='name'
							control={form.control}
							rules={{required: true}}
							render={({field}) => (
								<FormItem>
									<FormLabel>Category Name</FormLabel>
									<FormControl>
										<Input placeholder='Enter category name' {...field} required />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</CardContent>
					<CardFooter>
						<Button disabled={isPending} type='submit'>
							{isPending && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}Save
						</Button>
					</CardFooter>
				</form>
			</Form>
		</Card>
	);
};

export default AddCategory;

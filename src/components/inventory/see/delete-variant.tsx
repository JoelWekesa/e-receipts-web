import {DialogDescription, DialogFooter, DialogHeader, DialogTitle} from '@/components/ui/dialog';

import {Button} from '@/components/ui/button';
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';
import {Input} from '@/components/ui/input';
import {Variant} from '@/models/inventory/inventory';
import useDeleteVariant from '@/services/inventory/variants/delete';
import {zodResolver} from '@hookform/resolvers/zod';
import {Loader2} from 'lucide-react';
import {useSession} from 'next-auth/react';
import {FC} from 'react';
import {useForm} from 'react-hook-form';
import {toast} from 'sonner';
import {z} from 'zod';

const validationSchema = z.object({
	name: z.string().min(3, {
		message: 'Category name must be at least 3 characters',
	}),
});

const DeleteVariant: FC<{variant: Variant; handleClick: () => void}> = ({variant, handleClick}) => {
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

	const {mutate: del, isPending} = useDeleteVariant(handleClick);

	const onSubmit = (data: z.infer<typeof validationSchema>) => {
		if (data.name === 'Continue') {
			del({id: variant?.id || '', token, inventoryId: variant?.inventoryId || ''});
		} else {
			toast('Error', {
				description: 'Please type Continue to confirm delete.',
			});
		}
	};

	return (
		<>
			<DialogHeader>
				<DialogTitle>Delete Variant</DialogTitle>
				<DialogDescription>
					<p>Are you sure you want to delete this variant? This action cannot be undone.</p>
					<p>
						Please type <span className='text-red-600 font-bold text-lg select-none'>Continue</span> to confirm.
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
									<FormLabel>Confirm Delete</FormLabel>
									<FormControl>
										<Input placeholder='Type Continue to confirm delete' {...field} required autoComplete='off' />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<DialogFooter>
						<Button
							variant='default'
							onClick={handleClick}
							type='button'
							className='bg-green-600 hover:bg-green-700 text-white'>
							Cancel
						</Button>
						<Button type='submit' variant='destructive' disabled={isPending}>
							{isPending && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
							Delete
						</Button>
					</DialogFooter>
				</form>
			</Form>
		</>
	);
};

export default DeleteVariant;

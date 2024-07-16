import {DialogDescription, DialogFooter, DialogHeader, DialogTitle} from '@/components/ui/dialog';

import {Button} from '@/components/ui/button';
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';
import {Input} from '@/components/ui/input';
import {PendingInvite} from '@/models/teams/pending-invites';
import useDeleteInvite from '@/services/teams/delete-invite';
import {zodResolver} from '@hookform/resolvers/zod';
import {Ban, Loader2} from 'lucide-react';
import {useSession} from 'next-auth/react';
import {FC} from 'react';
import {useForm} from 'react-hook-form';
import {toast} from 'sonner';
import {z} from 'zod';

const validationSchema = z.object({
	name: z.string({
		message: 'Team name is required',
	}),
});

interface Props {
	invite?: PendingInvite;
	handleClick: () => void;
}

const DeleteInvite: FC<Props> = ({invite, handleClick}) => {
	const form = useForm<z.infer<typeof validationSchema>>({
		defaultValues: {
			name: '',
		},

		mode: 'onChange',

		resolver: zodResolver(validationSchema),
	});

	const {data: session} = useSession({
		required: true,
	});

	const token = session?.accessToken || '';

	const {mutate: del, isPending} = useDeleteInvite(handleClick);

	const onSubmit = (data: z.infer<typeof validationSchema>) => {
		if (data.name === 'Continue') {
			del({
				id: invite?.id || '',
				token,
			});
		} else {
			toast('Error', {
				description: 'Please type Continue to confirm cancellation.',
				icon: <Ban className='text-red-500 h-4 w-4' color='#ef4444' />,
			});
		}
	};

	return (
		<>
			<DialogHeader>
				<DialogTitle>Cancel Invite</DialogTitle>
				<DialogDescription>
					<p>{`Are you sure you want to cancel the invite to ${invite?.email}? to join ${invite?.team.name}?  `}</p>
					<p>This action cannot be undone.</p>
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
									<FormLabel>Inventory Name</FormLabel>
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
							onClick={handleClick}
							type='button'
							className='bg-green-600 hover:bg-green-700 text-white'>
							Cancel
						</Button>
						<Button type='submit' variant='destructive' disabled={isPending}>
							{isPending && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}Cancel Invite
						</Button>
					</DialogFooter>
				</form>
			</Form>
		</>
	);
};

export default DeleteInvite;

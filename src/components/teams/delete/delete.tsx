import {DialogDescription, DialogFooter, DialogHeader, DialogTitle} from '@/components/ui/dialog';

import {Button} from '@/components/ui/button';
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';
import {Input} from '@/components/ui/input';
import {MyTeam} from '@/models/teams/my-teams';
import useDeleteTeam from '@/services/teams/delete';
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
	team: MyTeam;
	handleClick: () => void;
}

const DeleteTeam: FC<Props> = ({team, handleClick}) => {
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

	const {mutate: del, isPending} = useDeleteTeam(handleClick);

	const onSubmit = (data: z.infer<typeof validationSchema>) => {
		if (data.name === team?.name) {
			del({
				teamId: team.id,
				token,
			});
		} else {
			toast('Error', {
				description: 'Please type the correct team name to confirm delete.',
				icon: <Ban className='text-red-500 h-4 w-4' color='#ef4444' />,
			});
		}
	};

	return (
		<>
			<DialogHeader>
				<DialogTitle>Delete Team</DialogTitle>
				<DialogDescription>
					<p>{`Are you sure you want to delete ${team?.name}? This action cannot be undone. `}</p>
					<p className='text-red-300 text-xs select-none'>
						{` This action will remove all the team members associated with ${team.name}`}
					</p>
					<p>
						Please type <span className='text-red-600 font-bold text-lg select-none'>{team?.name}</span> to confirm.
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
							{isPending && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}Delete
						</Button>
					</DialogFooter>
				</form>
			</Form>
		</>
	);
};

export default DeleteTeam;

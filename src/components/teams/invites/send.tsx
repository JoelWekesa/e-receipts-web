import {Button} from '@/components/ui/button';
import {DialogDescription, DialogFooter, DialogHeader} from '@/components/ui/dialog';
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';
import {Input} from '@/components/ui/input';
import useSendInvite from '@/services/teams/send';
import {zodResolver} from '@hookform/resolvers/zod';
import {DialogTitle} from '@radix-ui/react-dialog';
import {Loader2, Send} from 'lucide-react';
import {useSession} from 'next-auth/react';
import {FC} from 'react';
import {useForm} from 'react-hook-form';
import {z} from 'zod';
interface Props {
	teamId: string;
	teamName: string;
	close: () => void;
}

const formSchema = z.object({
	email: z.string({required_error: 'Email is required'}).email({message: 'Please enter a valid email'}),
});

const SendInvite: FC<Props> = ({teamId, teamName, close}) => {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: '',
		},
	});

	const {mutate: send, isPending} = useSendInvite(() => close());

	const {data: session} = useSession({
		required: true,
	});

	const handleSubmit = (data: z.infer<typeof formSchema>) => {
		const token = session?.accessToken || '';
		send({token, teamId, ...data});
	};

	return (
		<>
			<DialogHeader>
				<DialogTitle>Send Invite</DialogTitle>
				<DialogDescription>Send an invite to join the {teamName}.</DialogDescription>
			</DialogHeader>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(handleSubmit)}>
					<div className='py-4'>
						<FormField
							control={form.control}
							name='email'
							render={({field}) => (
								<FormItem>
									<FormLabel>Email</FormLabel>
									<FormControl>
										<Input placeholder='johndoe@example.com' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					<DialogFooter>
						<Button type='button' variant='destructive' onClick={() => close()}>
							Cancel
						</Button>
						<Button type='submit' disabled={isPending}>
							{isPending ? <Loader2 className='mr-2 h-4 w-4 animate-spin' /> : <Send className='mr-2 h-4 w-4' />}
							Send Invite
						</Button>
					</DialogFooter>
				</form>
			</Form>
		</>
	);
};

export default SendInvite;

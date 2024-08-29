'use client';
import {Button} from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';
import {Textarea} from '@/components/ui/textarea';
import {Transaction} from '@/models/floats/transactions';
import useRejectTransaction from '@/services/float/reject-transaction';
import {zodResolver} from '@hookform/resolvers/zod';
import {Loader2} from 'lucide-react';
import {useSession} from 'next-auth/react';
import {FC} from 'react';
import {useForm} from 'react-hook-form';
import {z} from 'zod';

interface Props {
	open: boolean;
	onClose: () => void;
	transaction: Transaction;
}

const validationSchema = z.object({
	reason: z.string({
		message: 'Rejection reason is required',
	}),
});

const RejectFloatDialog: FC<Props> = ({open, onClose, transaction}) => {
	const form = useForm<z.infer<typeof validationSchema>>({
		resolver: zodResolver(validationSchema),
	});

	const {data: session} = useSession({
		required: true,
	});

	const token = session?.accessToken || '';

	const successFn = () => {
		onClose();
		form.reset();
	};

	const {mutate, isPending} = useRejectTransaction();

	const handleSubmit = (data: z.infer<typeof validationSchema>) => {
		mutate({token, transactionId: transaction.id, reason: data.reason}, {onSuccess: successFn});
	};

	return (
		<Dialog open={open} onOpenChange={onClose}>
			<DialogContent className='w-3/4'>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(handleSubmit)}>
						<DialogHeader>
							<DialogTitle>Reject Transaction</DialogTitle>
							<DialogDescription>Reject the transaction with and provide a reason for the rejection.</DialogDescription>
						</DialogHeader>
						<div className='grid gap-4 py-4'>
							<FormField
								name='reason'
								control={form.control}
								render={({field}) => (
									<FormItem>
										<FormLabel>Reason</FormLabel>

										<FormControl>
											<Textarea id='reject' placeholder='Enter rejection reason' required {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<DialogFooter className='gap-2'>
							<Button variant='destructive' onClick={onClose}>
								Cancel
							</Button>
							<Button type='submit' disabled={isPending}>
								{isPending && <Loader2 className='mr-2 h-4 w-4 animate-spin' />} Reject
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};

export default RejectFloatDialog;

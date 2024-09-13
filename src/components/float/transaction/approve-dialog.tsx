'use client';
import {Badge} from '@/components/ui/badge';
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
import {Input} from '@/components/ui/input';
import {Transaction} from '@/models/floats/transactions';
import useApproveTransaction from '@/services/float/approve-transaction';
import currencyFormat from '@/utils/currency';
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
	approve: z
		.string({
			message: 'Approval confirmation is required',
		})
		.refine((value) => value === 'confirm', {
			message: 'Approval confirmation must be confirm',
		}),
});

const ApproveFloatDialog: FC<Props> = ({open, onClose, transaction}) => {
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

	const {mutate, isPending} = useApproveTransaction();

	const handleSubmit = () => {
		mutate({token, transactionId: transaction.id}, {onSuccess: successFn});
	};

	return (
		<Dialog open={open} onOpenChange={onClose}>
			<DialogContent className='w-3/4'>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(handleSubmit)}>
						<DialogHeader>
							<DialogTitle>Approve Transaction</DialogTitle>
							<DialogDescription>
								<div className='flex flex-col'>
									<div className='py-2'>
										Type <span className='text-red-500 text-xl font-bold italic'>confirm </span>
										to approve transaction. The transaction will be marked as approved and the user will be notified. This action
										is irreversible.
									</div>
									<div className='py-2'>
										<Badge className='bg-green-600 text-white rounded-xl'>{currencyFormat.format(transaction.amount)}</Badge>
									</div>
								</div>
							</DialogDescription>
						</DialogHeader>
						<div className='grid gap-4 py-4'>
							<FormField
								name='approve'
								control={form.control}
								render={({field}) => (
									<FormItem>
										<FormLabel>Confirm Approval</FormLabel>

										<FormControl>
											<Input id='approve' placeholder='Type confirm to approve' required {...field} />
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
								{isPending && <Loader2 className='mr-2 h-4 w-4 animate-spin' />} Approve
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};

export default ApproveFloatDialog;

'use client';
import {StoreFloat} from '@/models/floats/store';
import useFloatTopUp from '@/services/float/top-up';
import {zodResolver} from '@hookform/resolvers/zod';
import {Loader2} from 'lucide-react';
import {useSession} from 'next-auth/react';
import {FC} from 'react';
import {useForm} from 'react-hook-form';
import {z} from 'zod';
import {Button} from '../ui/button';
import {Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle} from '../ui/dialog';
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '../ui/form';
import {Input} from '../ui/input';

interface Props {
	open: boolean;
	onClose: () => void;
	storeFloat: StoreFloat | null;
}

const validationSchema = z.object({
	amount: z
		.string({
			message: 'Amount is required',
		})
		.refine((value) => !isNaN(parseFloat(value)), {
			message: 'Amount must be a number',
		})
		.refine((value) => parseFloat(value) > 0, {
			message: 'Amount must be greater than 0',
		}),

	transactionId: z.string({
		message: 'Transaction ID is required',
	}),
});

const AddFloatDialog: FC<Props> = ({open, onClose, storeFloat}) => {
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

	const {mutate, isPending} = useFloatTopUp(successFn);

	const handleSubmit = (data: z.infer<typeof validationSchema>) => {
		mutate({token, amount: parseFloat(data.amount), floatId: storeFloat?.id || '', transactionId: data.transactionId});
	};

	return (
		<Dialog open={open} onOpenChange={onClose}>
			<DialogContent className='w-3/4'>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(handleSubmit)}>
						<DialogHeader>
							<DialogTitle>Top Up Float</DialogTitle>
							<DialogDescription>Enter amount you want to top up</DialogDescription>
						</DialogHeader>
						<div className='grid gap-4 py-4'>
							<FormField
								name='amount'
								control={form.control}
								render={({field}) => (
									<FormItem>
										<FormLabel>Float Amount</FormLabel>

										<FormControl>
											<Input id='amount' placeholder='Enter amount' required {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								name='transactionId'
								control={form.control}
								render={({field}) => (
									<FormItem>
										<FormLabel>M-PESA Transaction ID</FormLabel>

										<FormControl>
											<Input id='transactionId' placeholder='Enter transaction id' required {...field} />
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
								{isPending && <Loader2 className='mr-2 h-4 w-4 animate-spin' />} Top Up
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};

export default AddFloatDialog;

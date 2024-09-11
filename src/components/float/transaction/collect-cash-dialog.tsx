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
import {Input} from '@/components/ui/input';
import {StoreCash} from '@/models/floats/store';
import useStoreCash from '@/services/float/cash';
import useCollectCash from '@/services/statements/collect-cash';
import {zodResolver} from '@hookform/resolvers/zod';
import {Loader2} from 'lucide-react';
import {useSession} from 'next-auth/react';
import {FC} from 'react';
import {useForm} from 'react-hook-form';
import {z} from 'zod';

interface Props {
	open: boolean;
	onClose: () => void;
	storeCash: StoreCash | null;
	storeId: string;
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
});

const CollectCashDialog: FC<Props> = ({open, onClose, storeCash, storeId}) => {
	const {refetch} = useStoreCash({storeId: storeCash?.id || '', storeCash});
	const form = useForm<z.infer<typeof validationSchema>>({
		resolver: zodResolver(validationSchema),
	});

	const successFn = () => {
		onClose();
		form.reset();
		refetch();
	};

	const {mutate: collect, isPending} = useCollectCash(successFn);

	const {data: session} = useSession({
		required: true,
	});

	const token = session?.accessToken || '';

	const handleSubmit = (data: z.infer<typeof validationSchema>) => {
		collect({
			token,
			amount: data.amount,
			storeId,
		});
	};

	return (
		<Dialog open={open} onOpenChange={onClose}>
			<DialogContent className='w-3/4'>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(handleSubmit)}>
						<DialogHeader>
							<DialogTitle>Collect Cash</DialogTitle>
							<DialogDescription>Enter amount you have collected</DialogDescription>
						</DialogHeader>
						<div className='grid gap-4 py-4'>
							<FormField
								name='amount'
								control={form.control}
								render={({field}) => (
									<FormItem>
										<FormLabel>Cash Amount</FormLabel>
										<FormControl>
											<Input id='amount' placeholder='Enter amount' required {...field} />
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
								{isPending && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}Collect Cash
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};

export default CollectCashDialog;

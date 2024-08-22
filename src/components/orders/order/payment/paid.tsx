'use client';
import {Button} from '@/components/ui/button';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Separator} from '@/components/ui/separator';
import {ClientOrder} from '@/models/orders/order-client';
import currencyFormat from '@/utils/currency';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import {Check, CopyIcon} from 'lucide-react';
import {FC, useState} from 'react';

dayjs.extend(relativeTime);

interface Props {
	order: ClientOrder;
}

const PaidCard: FC<Props> = ({order}) => {
	const [copied, setCopied] = useState(false);

	const handleCopy = (id: string) => {
		if (!copied) {
			navigator.clipboard.writeText(id);
		}
		setCopied(true);

		setTimeout(() => {
			setCopied(false);
		}, 2000);
	};

	return (
		<Card x-chunk='dashboard-05-chunk-3'>
			<CardHeader>
				<CardTitle>
					<div className='flex flex-row justify-between p-2'>
						<span>Payment</span>
					</div>
				</CardTitle>
				<CardDescription className='p-2'>Order payment details</CardDescription>
			</CardHeader>
			<CardContent>
				<div className='p-1'>
					<div className='p-1'>
						<div className='text-muted-foreground'>Payment Method(s)</div>
					</div>

					<div className='grid gap-4 p-1'>
						<div className='grid sm:grid-cols-1 gap-4'>
							{order.Receipt.map((item) =>
								item.Payment.map((payment, index) => (
									<div key={index}>
										<div className='flex flex-col gap-2 justify-between p-2'>
											{payment.mpesa > 0 && (
												<div className='flex flex-col gap-2'>
													<h3>M-Pesa</h3>
													<div className='flex flex-row gap-4 px-3 py-2'>
														<div className='text-muted-foreground'>Amount</div>
														<div>
															<span>{currencyFormat.format(payment.mpesa)}</span>
														</div>
													</div>
													<div className='flex flex-row gap-4 px-3 py-2'>
														<div className='text-muted-foreground'>Transaction ID</div>
														<div>
															<span>{payment.mpesa_transaction_id}</span>
															<Button
																size='icon'
																variant='outline'
																className='ml-2 h-6 w-6'
																onClick={() => handleCopy(payment.mpesa_transaction_id)}>
																{copied ? <Check className='h-4 w-4' color='green' /> : <CopyIcon className='h-4 w-4' />}
																<span className='sr-only'>Copy Transaction ID</span>
															</Button>
														</div>
													</div>
												</div>
											)}

											<Separator orientation='vertical' />

											{payment.cash > 0 && (
												<div className='flex flex-col gap-2 w-full'>
													<h3>Cash</h3>
													<div className='flex flex-row gap-4 px-3 py-2'>
														<div className='text-muted-foreground'>Amount</div>
														<div>
															<span>{currencyFormat.format(payment.cash)}</span>
														</div>
													</div>
												</div>
											)}
										</div>
									</div>
								))
							)}
						</div>
						<Separator />
					</div>
				</div>
			</CardContent>
		</Card>
	);
};

export default PaidCard;

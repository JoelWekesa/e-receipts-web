'use client';

/**
 * v0 by Vercel.
 * @see https://v0.dev/t/nuwh3FMXbYZ
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import {Badge} from '@/components/ui/badge';
import {Button} from '@/components/ui/button';
import {Separator} from '@/components/ui/separator';
import {Receipt} from '@/models/receipts/receipt';
import currencyFormat from '@/utils/currency';
import dayjs from 'dayjs';
import {Check, CopyIcon} from 'lucide-react';
import {FC, useState} from 'react';
import ItemsSoldTable from './itemssold';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';

interface Props {
	receipt: Receipt;
}

const SaleItem: FC<Props> = ({receipt}) => {
	const totalPay = receipt.Payment[0].mpesa + receipt.Payment[0].cash;

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
		<div className='flex min-h-screen w-full flex-col'>
			<div className='flex flex-col sm:gap-4 sm:py-4 sm:pl-14'>
				<Card x-chunk='dashboard-05-chunk-3' className='w-full'>
					<CardHeader className='px-7'>
						<CardTitle>Sale Item Details</CardTitle>
						<CardDescription>View a detailed explanation of a sale made</CardDescription>
					</CardHeader>
					<CardContent className='px-7'>
						<div className='grid gap-6'>
							<div className='grid gap-1 border border-solid rounded-lg p-2'>
								{receipt.store.displayName && (
									<>
										<div className='text-muted-foreground'>
											<p>{receipt.store.displayName}</p>
										</div>
										<Separator />
									</>
								)}
								<div className='text-muted-foreground'>Total Amount</div>
								<div className='text-2xl font-bold'>{currencyFormat.format(totalPay)}</div>
							</div>
							<div className='grid gap-4'>
								<div className='grid sm:grid-cols-1 gap-4'>
									{receipt.Payment.map((payment, index) => (
										<div key={index}>
											<div>
												<div className='text-muted-foreground'>Payment Method(s)</div>
											</div>

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
									))}
								</div>
								<Separator />
								<div className='grid sm:grid-cols-2 gap-4'>
									<div>
										<div className='text-muted-foreground'>Date</div>
										<div>{dayjs(receipt.createdAt).format('ddd DD MMM YYYY HH:mm')}</div>
									</div>
									<div>
										<div className='text-muted-foreground'>Status</div>
										<Badge variant='secondary'>Paid</Badge>
									</div>
								</div>

								<Separator />

								<div className='grid gap-1'>
									<div className='text-muted-foreground'>Items Sold</div>
									<div className='p-2'>
										<ItemsSoldTable items={receipt.ReceiptItem} />
									</div>
								</div>

								<Separator />

								{receipt.ControlUnit.length > 0 && (
									<>
										<div className='grid gap-1'>
											<div className='text-muted-foreground'>Control Unit</div>
											{receipt.ControlUnit.map((item, index) => {
												return (
													<div className='grid sm:grid-cols-2 gap-4' key={index}>
														<div>
															<div>{item.title}</div>
														</div>
														<div>
															<div>{item.value}</div>
														</div>
													</div>
												);
											})}
										</div>
										<Separator />
									</>
								)}

								{receipt.Loyalty.length > 0 && (
									<div className='grid gap-1'>
										<div className='text-muted-foreground'>Loyalty Points</div>
										{receipt.Loyalty.map((item, index) => {
											return (
												<div className='grid sm:grid-cols-2 gap-4' key={index}>
													<div>
														<div>{item.customer}</div>
													</div>
													<div>
														<div>{item.points_earned}</div>
													</div>
												</div>
											);
										})}
									</div>
								)}
							</div>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
};

export default SaleItem;

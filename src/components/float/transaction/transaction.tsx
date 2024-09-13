'use client';

import {Badge} from '@/components/ui/badge';
import {Button} from '@/components/ui/button';
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from '@/components/ui/card';
import {Separator} from '@/components/ui/separator';
import {AlertCircle, CheckCircle2, Download} from 'lucide-react';
import Image from 'next/image';
import {FC, useEffect, useState} from 'react';
import dayjs from 'dayjs';
import currencyFormat from '@/utils/currency';
import Link from 'next/link';
import {Transaction} from '@/models/floats/transactions';
import ApproveFloatDialog from './approve-dialog';
import RejectFloatDialog from './reject-dialog';
import useTransaction from '@/services/float/transaction';

interface Props {
	transaction: Transaction;
	teamId?: string;
}

const TransactionComponent: FC<Props> = ({transaction, teamId}) => {
	const {data: mountedTransaction} = useTransaction({transactionId: transaction.id, transaction});

	const [mounted, setMounted] = useState(false);

	const [open, setOpen] = useState(false);

	const [rejectOpen, setRejectOpen] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	const handleApprove = () => {
		setOpen((open) => !open);
	};

	const handleReject = () => {
		setRejectOpen((open) => !open);
	};

	if (!mounted) return null;

	const genRandomWord = () => {
		return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
	};

	return (
		<>
			<div className=' text-foreground flex items-center justify-center p-4'>
				<Card className='w-full max-w-4xl'>
					<CardHeader className='flex flex-row items-center justify-between'>
						<CardTitle className='text-4xl'>Transaction Details</CardTitle>
					</CardHeader>
					<CardContent className='space-y-4'>
						<div className='flex justify-between items-center'>
							<span className='font-semibold'>Amount:</span>
							<span className='text-2xl font-bold'>{currencyFormat.format(mountedTransaction.amount)}</span>
						</div>
						<div className='flex justify-between items-center'>
							<span className='font-semibold'>Status:</span>
							{mountedTransaction.approved ? (
								<Badge className='bg-green-600 text-white'>Approved</Badge>
							) : mountedTransaction.rejected ? (
								<Badge variant='destructive'>Rejected</Badge>
							) : (
								<Badge variant='secondary'>Pending</Badge>
							)}
						</div>
						<Separator />
						<div className='space-y-2'>
							<h2 className='font-semibold'>User Information</h2>
							<div className='flex justify-between items-center'>
								<span className='font-semibold'>Name:</span>
								<span className='text-xl font-bold'>{mountedTransaction.user.name}</span>
							</div>
							<div className='flex justify-between items-center'>
								<span className='font-semibold'>Email:</span>
								<span className='text-xl font-bold'>{mountedTransaction.user.email}</span>
							</div>
							{mountedTransaction.user.phone && (
								<div className='flex justify-between items-center'>
									<span className='font-semibold'>Phone:</span>
									<span className='text-xl font-bold'>{mountedTransaction.user.phone}</span>
								</div>
							)}
						</div>
						<Separator />
						<div className='space-y-2 w-full md:w-3/4'>
							<h3 className='font-semibold text-2xl'>Details</h3>
							<div className='flex justify-between items-end gap-2'>
								<span className='font-semibold'>Transaction ID</span>
								<span className='font-medium'>{mountedTransaction.id}</span>
							</div>
							<div className='flex justify-between items-center'>
								<span className='font-semibold'>Transaction Date</span>
								<span className='font-medium'>{dayjs(mountedTransaction.createdAt).format('ddd MM YYYY HH:mm:ss')}</span>
							</div>
							<div className='flex justify-between items-center'>
								<span className='font-semibold'>Last Updated</span>
								<span className='font-medium'>{dayjs(mountedTransaction.updatedAt).format('ddd MM YYYY HH:mm:ss')}</span>
							</div>
						</div>
						<Separator />
						<div className='space-y-2'>
							<div className='flex justify-between items-center py-3'>
								<h3 className='font-semibold'>Evidence</h3>
								<Button variant='link' size='sm'>
									<Download className='mr-2 h-4 w-4' />
									<Link href={mountedTransaction.evidence} download={genRandomWord() + mountedTransaction.evidence}>
										Download
									</Link>
								</Button>
							</div>
							<div className='relative h-[600px] w-full'>
								<Image
									className='h-full w-full object-contain'
									fill
									sizes='(min-width: 1024px) 66vw, 100vw'
									alt={mountedTransaction.id}
									src={mountedTransaction.evidence}
								/>
							</div>
						</div>

						{mountedTransaction.approved && mountedTransaction.Approvals.length > 0 && (
							<>
								<Separator />
								<Card className='bg-green-900'>
									<CardHeader className='flex flex-row items-center justify-between'>
										<CardTitle className='text-4xl'>Transaction Approved</CardTitle>
									</CardHeader>
									<CardContent className='space-y-4'>
										{mountedTransaction.Approvals.map((approval, index) => (
											<div className='space-y-2 flex flex-col' key={index}>
												<div className='flex flex-col w-full '>
													<h3 className='font-semibold text-2xl'>Approved By</h3>
													<div className='flex flex-col md:w-3/4'>
														<div className='flex justify-between items-center'>
															<span className='font-semibold'>Name:</span>
															<span className='text-xl font-bold'>{approval.user.name}</span>
														</div>
														<div className='flex justify-between items-center'>
															<span className='font-semibold'>Email:</span>
															<span className='text-xl font-bold'>{approval.user.email}</span>
														</div>
														{approval.user?.phone && (
															<div className='flex justify-between items-center'>
																<span className='font-semibold'>Phone:</span>
																<span className='text-xl font-bold'>{approval.user.phone}</span>
															</div>
														)}
													</div>
												</div>
											</div>
										))}
									</CardContent>
								</Card>
							</>
						)}

						{mountedTransaction.rejected && mountedTransaction.Rejection.length > 0 && (
							<>
								<Separator />
								<Card className='bg-red-900'>
									<CardHeader className='flex flex-row items-center justify-between'>
										<CardTitle className='text-4xl'>Transaction Rejected</CardTitle>
									</CardHeader>
									<CardContent className='space-y-4'>
										{mountedTransaction.Rejection.map((rejection, index) => (
											<div className='space-y-2 flex flex-col' key={index}>
												<p className='text-md'>{rejection.reason}</p>
												<div className='flex flex-col w-full '>
													<h3 className='font-semibold text-2xl'>Rejected By</h3>
													<div className='flex flex-col md:w-3/4'>
														<div className='flex justify-between items-center'>
															<span className='font-semibold'>Name:</span>
															<span className='text-xl font-bold'>{rejection.user.name}</span>
														</div>
														<div className='flex justify-between items-center'>
															<span className='font-semibold'>Email:</span>
															<span className='text-xl font-bold'>{rejection.user.email}</span>
														</div>
														{rejection.user?.phone && (
															<div className='flex justify-between items-center'>
																<span className='font-semibold'>Phone:</span>
																<span className='text-xl font-bold'>{rejection.user.phone}</span>
															</div>
														)}
													</div>
												</div>
											</div>
										))}
									</CardContent>
								</Card>
							</>
						)}
					</CardContent>
					{!!!teamId && (
						<CardFooter className='flex justify-end space-x-2'>
							<Button
								variant='destructive'
								onClick={handleReject}
								disabled={mountedTransaction.approved || mountedTransaction.rejected}>
								<AlertCircle className='mr-2 h-4 w-4' />
								Reject
							</Button>
							<Button variant='default' onClick={handleApprove} disabled={mountedTransaction.approved}>
								<CheckCircle2 className='mr-2 h-4 w-4' />
								Approve
							</Button>
						</CardFooter>
					)}
				</Card>
			</div>
			{!!!teamId && (
				<>
					<ApproveFloatDialog open={open} onClose={handleApprove} transaction={transaction} />
					<RejectFloatDialog open={rejectOpen} onClose={handleReject} transaction={transaction} />
				</>
			)}
		</>
	);
};

export default TransactionComponent;

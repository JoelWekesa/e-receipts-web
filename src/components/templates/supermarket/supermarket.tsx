'use client';
import {Store} from '@/models/store';
import Image from 'next/image';
import React, {FC, Fragment, useMemo} from 'react';
import dayjs from 'dayjs';
import {useAtom} from 'jotai';
import {receiptItemsAtom} from '@/atoms/receiptgen/receiptitem';
import {paymentAtom} from '@/atoms/receiptgen/payment';
import {controlUnitAtom} from '@/atoms/receiptgen/controlunit';
import {loyaltyAtom} from '@/atoms/receiptgen/loyalty';

const SupermarketComponent: FC<{store: Store}> = ({store}) => {
	const [items] = useAtom(receiptItemsAtom);

	const total = useMemo(() => items.reduce((acc, item) => acc + +item.price * +item.quantity, 0), [items]);

	const discountedItems = useMemo(() => items.filter((item) => item.discount !== 0), [items]);

	const totalDiscounts = useMemo(
		() => discountedItems.reduce((acc, item) => acc + +item.discount * +item.quantity, 0),
		[discountedItems]
	);

	const [payment] = useAtom(paymentAtom);

	const total_paid = useMemo(() => payment.cash.amount + payment.mpesa.amount, [payment]);

	const [controlUnits] = useAtom(controlUnitAtom);

	const [loyalty] = useAtom(loyaltyAtom);

	return (
		<div className=' sm:px-4 font-sans'>
			<table align='center'>
				<tr>
					<td>
						<div className='my-12 sm:my-8 text-center'>
							<a href='https://maizzle.com'>
								<Image id='barcode' alt='barcode' src={store?.logo || ''} className='block m-auto' width={70} height={70} />
							</a>
							<h1 className='m-0 text-2xl sm:leading-8  font-semibold uppercase'>{store?.name}</h1>
							<p className='m-0 sm:leading-8  font-extralight uppercase text-sm'>{store?.address}</p>
							<p className='m-0 sm:leading-8  font-extralight text-sm'>
								<span>Tel: {store?.phone} </span>
								<span>{store?.email}</span>
							</p>
							<h1 className='m-0 text-2xl sm:leading-8  font-semibold uppercase'>cash sale</h1>
							<p className='m-0 sm:leading-8  font-extralight text-sm'>
								<span>VAT Reg: {store?.vat_reg_no} </span>
								<span>PIN No: {store?.pin_no}</span>
							</p>
							<p className='m-0 sm:leading-8  font-extralight text-sm'>
								Date: {dayjs(new Date()).format('HH:mm a ddd DD MMM YYYY')}{' '}
							</p>
							<p className='m-0 sm:leading-8  font-extralight text-sm'>
								<span>Branch: 19 </span>
								<span>Till: 6 </span>
								<span>Session: 1218 </span>
								<span>Rct: 124</span>
							</p>
							<p className='m-0 sm:leading-8  font-extralight text-sm'>
								<Image
									id='barcode'
									alt='barcode'
									src='https://receipts-ke.s3.amazonaws.com/logo/barcode.png'
									width={70}
									height={70}
									className='block m-auto'
								/>
							</p>
						</div>
						<table className='w-full mb-4 border-t border-b border-black dark:border-white'>
							<tr>
								<td className='w-1/2'>
									<p className='uppercase p-2 '>item</p>
								</td>
								<td className='w-1/6'>
									<p className='uppercase p-2  '>qty</p>
								</td>
								<td className='w-1/6'>
									<p className='uppercase p-2  '>each</p>
								</td>
								<td className='w-1/6'>
									<p className='uppercase p-2  '>total</p>
								</td>
							</tr>
						</table>
						<table className='w-full mb-4 '>
							{items.map((item, index) => (
								<tr key={index}>
									<td className='w-1/2' align='left'>
										<p className='uppercase p-2'>{item.item}</p>
									</td>
									<td className='w-1/6' align='center'>
										<p className='uppercase p-2'>{item.quantity}</p>
									</td>
									<td className='w-1/6' align='center'>
										<p className='uppercase p-2'>{item.price}</p>
									</td>
									<td className='w-1/6' align='center'>
										<p className='uppercase p-2'>{+item.price * +item.quantity}</p>
									</td>
								</tr>
							))}
							{/* <tr>
								<td className='w-1/2'>
									<p className='uppercase p-2  '>stainless steel water bottle</p>
								</td>
								<td className='w-1/6'>
									<p className='uppercase p-2  '>2</p>
								</td>
								<td className='w-1/6'>
									<p className='uppercase p-2  '>200</p>
								</td>
								<td className='w-1/6'>
									<p className='uppercase p-2  '>400</p>
								</td>
							</tr>
							<tr>
								<td className='w-1/2'>
									<p className='uppercase p-2  '>shine shoe polish</p>
								</td>
								<td className='w-1/6'>
									<p className='uppercase p-2  '>1</p>
								</td>
								<td className='w-1/6'>
									<p className='uppercase p-2  '>100</p>
								</td>
								<td className='w-1/6'>
									<p className='uppercase p-2  '>100</p>
								</td>
							</tr> */}
						</table>
						<table className='w-full my-2 border-t border-b border-black dark:border-white mb-5'>
							<tr>
								<td className='w-5/6' align='left'>
									<p className='uppercase p-2 '>Total</p>
								</td>
								<td className='w-1/6' align='center'>
									<p className='capitalize p-2 '>{total}</p>
								</td>
							</tr>
							<tr>
								<td className='w-5/6'>
									<p className='uppercase p-2 '>cash paid</p>
								</td>
								<td className='w-1/6' align='center'>
									<p className='capitalize p-2 '>{payment?.cash?.amount}</p>
								</td>
							</tr>
							<tr>
								<td className='w-5/6'>
									<p className='p-2 uppercase '>mpesa pay</p>
								</td>
								<td className='w-1/6' align='center'>
									<p className='capitalize p-2 '>{payment?.mpesa?.amount}</p>
								</td>
							</tr>
							<tr>
								<td className='w-5/6'>
									<p className='uppercase p-2 '>{total_paid >= total ? 'change' : 'due'}</p>
								</td>
								<td className='w-1/6' align='center'>
									<p className='capitalize p-2 '>{total_paid >= total ? total_paid - total : total - total_paid}</p>
								</td>
							</tr>
						</table>
						{payment.mpesa.amount > 0 && (
							<table className='w-full my-2 border border-black dark:border-white mb-5 rounded'>
								<th align='left' className='p-2'>
									MPESA Details
								</th>
								<tr>
									<td className='w-1/3'>
										<p className='capitalize p-2 '>Name</p>
									</td>
									<td className='w-2/3'>
										<p className='capitalize p-2 '>{payment?.mpesa?.client_name}</p>
									</td>
								</tr>
								<tr>
									<td className='w-1/3'>
										<p className='capitalize p-2 '>Mobile No</p>
									</td>
									<td className='w-2/3'>
										<p className='capitalize p-2 '>{payment?.mpesa?.mobile_no}</p>
									</td>
								</tr>
								<tr>
									<td className='w-1/3'>
										<p className='capitalize p-2 '>MPESA TRN ID</p>
									</td>
									<td className='w-2/3'>
										<p className='capitalize p-2 '>{payment?.mpesa?.m_pesa_transaction_id}</p>
									</td>
								</tr>
								<tr>
									<td className='w-1/3'>
										<p className='capitalize p-2 '>Amount</p>
									</td>
									<td className='w-2/3'>
										<p className='capitalize p-2 '>{payment?.mpesa?.amount}</p>
									</td>
								</tr>
							</table>
						)}
						<table className='w-full my-2 mb-5'>
							<tr>
								<td className='w-1/4'>
									<p className='uppercase  font-bold'>code</p>
								</td>
								<td className='w-1/4' align='right'>
									<p className='uppercase  font-bold'>pre vat</p>
								</td>
								<td className='w-1/4' align='right'>
									<p className='uppercase  font-bold'>vat</p>
								</td>
								<td className='w-1/4' align='right'>
									<p className='uppercase  font-bold'>total</p>
								</td>
							</tr>
							<tr>
								<td className='w-1/4'>
									<p className=''>G - 16.00%</p>
								</td>
								<td className='w-1/4' align='right'>
									<p className=''>420</p>
								</td>
								<td className='w-1/4' align='right'>
									<p className=''>80</p>
								</td>
								<td className='w-1/4' align='right'>
									<p className=''>500</p>
								</td>
							</tr>
							<tr>
								<td className='w-1/4'>
									<p className=''>TOTALS</p>
								</td>
								<td className='w-1/4' align='right'>
									<p className=''>420</p>
								</td>
								<td className='w-1/4' align='right'>
									<p className=''>80</p>
								</td>
								<td className='w-1/4' align='right'>
									<p className=''>500</p>
								</td>
							</tr>
						</table>
						<table className='w-full my-2 border-t border-b border-black dark:border-white'>
							<tr>
								<td align='center'>
									<p className=' font-bold'>For home deliveries call</p>
									<p className=' font-bold'>0123456789</p>
								</td>
							</tr>
						</table>

						{controlUnits.length > 0 && (
							<table className='w-full my-2 '>
								<th align='center'>
									<p className='uppercase  font-bold'>control unit info</p>
								</th>
								{controlUnits.map((i, index) => (
									<tr key={index}>
										<td align='center'>
											<p className=' '>
												{i.title}: <span>{i.value}</span>
											</p>
										</td>
									</tr>
								))}
								<tr>
									<td align='center'>
										<Image
											src='https://receipts-ke.s3.amazonaws.com/logo/qrcode.png'
											alt='qrcode'
											className='block m-auto'
											width={100}
											height={100}
										/>
									</td>
								</tr>
							</table>
						)}

						<table className='w-full my-2 border-t border-b border-black dark:border-white'>
							<th align='left'>
								<p className='uppercase font-bold '>rewarded discounts</p>
							</th>
							<tr>
								<td className='w-1/2'>
									<p className='capitalize '>Item</p>
								</td>
								<td align='right' className='w-1/2'>
									<p className='capitalize '>Rewarded discount</p>
								</td>
							</tr>
							{discountedItems.map((item, index) => (
								<tr key={index}>
									<td className='w-1/2'>
										<p className='capitalize '>{item.item}</p>
									</td>
									<td align='right' className='w-1/2'>
										<p className='capitalize '>{Number(item.discount) * Number(item.quantity)}</p>
									</td>
								</tr>
							))}

							<tr>
								<td className='w-1/2'>
									<p className='capitalize '>total discount</p>
								</td>
								<td align='right' className='w-1/2'>
									<p className='capitalize '>{totalDiscounts}</p>
								</td>
							</tr>
						</table>

						<table className='w-full my-2'>
							<th align='left'>
								<p className=' '>Note: Prices shown on receipt are inclusive of discount</p>
							</th>
						</table>

						{loyalty.length > 0 && (
							<table className='w-full my-2 border-t border-b border-black dark:border-white'>
								<th align='left'>
									<p className='uppercase  font-bold'>loyalty points</p>
								</th>
								{loyalty.map((i, index) => (
									<Fragment key={index}>
										<tr>
											<td className='w-1/3'>
												<p className='capitalize '>loyalty code</p>
											</td>
											<td className='w-2/3'>
												<p className='capitalize '>{i.code}</p>
											</td>
										</tr>
										<tr>
											<td className='w-1/3'>
												<p className='capitalize '>customer</p>
											</td>
											<td className='w-2/3'>
												<p className='capitalize '>{i.customer}</p>
											</td>
										</tr>
										<tr>
											<td className='w-1/3'>
												<p className='capitalize '>{i.points_earned}</p>
											</td>
											<td className='w-2/3'>
												<p className='capitalize '>16 credited</p>
											</td>
										</tr>
									</Fragment>
								))}
							</table>
						)}
					</td>
				</tr>
			</table>
		</div>
	);
};

export default SupermarketComponent;

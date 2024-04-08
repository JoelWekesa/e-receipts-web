'use client';
import {Store} from '@/models/store';
import Image from 'next/image';
import React, {FC, useMemo} from 'react';
import dayjs from 'dayjs';
import {useAtom} from 'jotai';
import {receiptItemsAtom} from '@/atoms/receiptitem';
import {paymentAtom} from '@/atoms/payment';

const SupermarketComponent: FC<{store: Store}> = ({store}) => {
	const [items, _] = useAtom(receiptItemsAtom);

	const total = useMemo(() => items.reduce((acc, item) => acc + +item.price * +item.quantity, 0), [items]);

	const [payment] = useAtom(paymentAtom);

	const total_paid = useMemo(() => payment.amount.cash + payment.amount.mpesa, [payment]);

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
									src='https://e-receipts-kenya.s3.amazonaws.com/receipts/e0a484dc-acf8-4124-b144-3db15bf6bb35.png'
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
									<p className='capitalize p-2 '>{payment.amount.cash}</p>
								</td>
							</tr>
							<tr>
								<td className='w-5/6'>
									<p className='p-2 uppercase '>mpesa pay</p>
								</td>
								<td className='w-1/6' align='center'>
									<p className='capitalize p-2 '>{payment.amount.mpesa}</p>
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
						{payment.amount.mpesa > 0 && (
							<table className='w-full my-2 border border-black dark:border-white mb-5 rounded-xl'>
								<th align='left' className='p-2'>
									MPESA Details
								</th>
								<tr>
									<td className='w-1/3'>
										<p className='capitalize p-2 '>Name</p>
									</td>
									<td className='w-2/3'>
										<p className='capitalize p-2 '>{payment?.client_name}</p>
									</td>
								</tr>
								<tr>
									<td className='w-1/3'>
										<p className='capitalize p-2 '>Mobile No</p>
									</td>
									<td className='w-2/3'>
										<p className='capitalize p-2 '>{payment?.mobile_no}</p>
									</td>
								</tr>
								<tr>
									<td className='w-1/3'>
										<p className='capitalize p-2 '>MPESA TRN ID</p>
									</td>
									<td className='w-2/3'>
										<p className='capitalize p-2 '>{payment?.m_pesa_transaction_id}</p>
									</td>
								</tr>
								<tr>
									<td className='w-1/3'>
										<p className='capitalize p-2 '>Amount</p>
									</td>
									<td className='w-2/3'>
										<p className='capitalize p-2 '>{payment.amount.mpesa}</p>
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
						<table className='w-full my-2 '>
							<th align='center'>
								<p className='uppercase  font-bold'>control unit info</p>
							</th>
							<tr>
								<td align='center'>
									<p className=' '>
										CU Serial No: <span>KRAMWO123456789</span>
									</p>
								</td>
							</tr>
							<tr>
								<td align='center'>
									<p className=' '>
										CU Invoice No: <span>0O123456789</span>
									</p>
								</td>
							</tr>
							<tr>
								<td align='center'>
									<p className=' '>
										Receipt Ref No: <span>90102418951</span>
									</p>
								</td>
							</tr>
							<tr>
								<td align='center'>
									<p className=' '>
										Date: <span>9/03/2024 16:08:51</span>
									</p>
								</td>
							</tr>
							<tr>
								<td align='center'>
									<Image
										src='https://e-receipts-kenya.s3.amazonaws.com/qrcode/717b120f-548d-4598-b416-ed1b9a376fbe.png'
										alt='qrcode'
										className='block m-auto'
										width={100}
										height={100}
									/>
								</td>
							</tr>
						</table>
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
							<tr>
								<td className='w-1/2'>
									<p className='capitalize '>stainless steel water bottle</p>
								</td>
								<td align='right' className='w-1/2'>
									<p className='capitalize '>20</p>
								</td>
							</tr>
							<tr>
								<td className='w-1/2'>
									<p className='capitalize '>total discount</p>
								</td>
								<td align='right' className='w-1/2'>
									<p className='capitalize '>20</p>
								</td>
							</tr>
						</table>
						<table className='w-full my-2'>
							<th align='left'>
								<p className=' '>Note: Prices shown on receipt are inclusive of discount</p>
							</th>
						</table>
						<table className='w-full my-2 border-t border-b border-black dark:border-white'>
							<th align='left'>
								<p className='uppercase  font-bold'>loyalty points</p>
							</th>
							<tr>
								<td className='w-1/3'>
									<p className='capitalize '>loyalty code</p>
								</td>
								<td className='w-2/3'>
									<p className='capitalize '>01234567</p>
								</td>
							</tr>
							<tr>
								<td className='w-1/3'>
									<p className='capitalize '>customer</p>
								</td>
								<td className='w-2/3'>
									<p className='capitalize '>Joel Wekesa</p>
								</td>
							</tr>
							<tr>
								<td className='w-1/3'>
									<p className='capitalize '>points earned</p>
								</td>
								<td className='w-2/3'>
									<p className='capitalize '>16 credited</p>
								</td>
							</tr>
						</table>
					</td>
				</tr>
			</table>
		</div>
	);
};

export default SupermarketComponent;

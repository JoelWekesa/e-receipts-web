/* eslint-disable @next/next/no-img-element */
import React from 'react';

const SupermarketComponent = () => {
	return (
		<div className='bg-slate-50 dark:bg-slate-50 sm:px-4 font-sans'>
			<table align='center'>
				<tr>
					<td>
						<div className='my-12 sm:my-8 text-center'>
							<a href='https://maizzle.com'>
								<img
									id='barcode'
									alt='barcode'
									src='https://e-receipts-kenya.s3.amazonaws.com/logo/42a1e0fe-8197-40be-82ec-8bc9a0994d34.png'
									width='70'
									className='block m-auto'
								/>
							</a>
							<h1 className='m-0 text-2xl sm:leading-8 text-black font-semibold uppercase'>Super Mart</h1>
							<p className='m-0 sm:leading-8 text-black font-extralight uppercase text-sm'>
								<span>p.o. box 2361 00621, </span>
								<span>Village Market</span>
							</p>
							<p className='m-0 sm:leading-8 text-black font-extralight text-sm'>
								<span>Tel: +254 700 88 33 33 </span>
								<span>info@supermart.co.ke</span>
							</p>
							<h1 className='m-0 text-2xl sm:leading-8 text-black font-semibold uppercase'>cash sale</h1>
							<p className='m-0 sm:leading-8 text-black font-extralight text-sm'>
								<span>VAT Reg: 0123567Q </span>
								<span>PIN No: P0511888860D</span>
							</p>
							<p className='m-0 sm:leading-8 text-black font-extralight text-sm'>Date: 04:00pm Sun 19 March 2023</p>
							<p className='m-0 sm:leading-8 text-black font-extralight text-sm'>
								<span>Branch: 19 </span>
								<span>Till: 6 </span>
								<span>Session: 1218 </span>
								<span>Rct: 124</span>
							</p>
							<p className='m-0 sm:leading-8 text-black font-extralight text-sm'>
								<img
									id='barcode'
									alt='barcode'
									src='https://e-receipts-kenya.s3.amazonaws.com/receipts/e0a484dc-acf8-4124-b144-3db15bf6bb35.png'
									width='70'
									className='block m-auto'
								/>
							</p>
						</div>
						<table className='w-full mb-4 border-t border-b border-black'>
							<tr>
								<td className='w-1/2'>
									<p className='uppercase p-2 text-black'>item</p>
								</td>
								<td className='w-1/6'>
									<p className='uppercase p-2  text-black'>qty</p>
								</td>
								<td className='w-1/6'>
									<p className='uppercase p-2  text-black'>each</p>
								</td>
								<td className='w-1/6'>
									<p className='uppercase p-2  text-black'>total</p>
								</td>
							</tr>
						</table>
						<table className='w-full mb-4 '>
							<tr>
								<td className='w-1/2'>
									<p className='uppercase p-2  text-black'>stainless steel water bottle</p>
								</td>
								<td className='w-1/6'>
									<p className='uppercase p-2  text-black'>2</p>
								</td>
								<td className='w-1/6'>
									<p className='uppercase p-2  text-black'>200</p>
								</td>
								<td className='w-1/6'>
									<p className='uppercase p-2  text-black'>400</p>
								</td>
							</tr>
							<tr>
								<td className='w-1/2'>
									<p className='uppercase p-2  text-black'>shine shoe polish</p>
								</td>
								<td className='w-1/6'>
									<p className='uppercase p-2  text-black'>1</p>
								</td>
								<td className='w-1/6'>
									<p className='uppercase p-2  text-black'>100</p>
								</td>
								<td className='w-1/6'>
									<p className='uppercase p-2  text-black'>100</p>
								</td>
							</tr>
						</table>
						<table className='w-full my-2 border-t border-b border-black mb-5'>
							<tr>
								<td className='w-5/6'>
									<p className='uppercase p-2 text-black'>Total</p>
								</td>
								<td className='w-1/6'>
									<p className='capitalize p-2 text-black'>500</p>
								</td>
							</tr>
							<tr>
								<td className='w-5/6'>
									<p className='uppercase p-2 text-black'>cash paid</p>
								</td>
								<td className='w-1/6'>
									<p className='capitalize p-2 text-black'>0</p>
								</td>
							</tr>
							<tr>
								<td className='w-5/6'>
									<p className='p-2 uppercase text-black'>mpesa pay</p>
								</td>
								<td className='w-1/6'>
									<p className='capitalize p-2 text-black'>500</p>
								</td>
							</tr>
							<tr>
								<td className='w-5/6'>
									<p className='uppercase p-2 text-black'>change</p>
								</td>
								<td className='w-1/6'>
									<p className='capitalize p-2 text-black'>0</p>
								</td>
							</tr>
						</table>
						<table className='w-full my-2 border border-black mb-5 rounded-xl'>
							<th align='left' className='p-2'>
								MPESA Details
							</th>
							<tr>
								<td className='w-1/3'>
									<p className='capitalize p-2 text-black'>Name</p>
								</td>
								<td className='w-2/3'>
									<p className='capitalize p-2 text-black'>Joel</p>
								</td>
							</tr>
							<tr>
								<td className='w-1/3'>
									<p className='capitalize p-2 text-black'>Mobile No</p>
								</td>
								<td className='w-2/3'>
									<p className='capitalize p-2 text-black'>0719748***</p>
								</td>
							</tr>
							<tr>
								<td className='w-1/3'>
									<p className='capitalize p-2 text-black'>MPESA Type</p>
								</td>
								<td className='w-2/3'>
									<p className='capitalize p-2 text-black'>LEGACY</p>
								</td>
							</tr>
							<tr>
								<td className='w-1/3'>
									<p className='capitalize p-2 text-black'>MPESA Trn</p>
								</td>
								<td className='w-2/3'>
									<p className='capitalize p-2 text-black'>RCJ268CUOW</p>
								</td>
							</tr>
							<tr>
								<td className='w-1/3'>
									<p className='capitalize p-2 text-black'>TRN ID</p>
								</td>
								<td className='w-2/3'>
									<p className='capitalize p-2 text-black'>626996</p>
								</td>
							</tr>
							<tr>
								<td className='w-1/3'>
									<p className='capitalize p-2 text-black'>Amount</p>
								</td>
								<td className='w-2/3'>
									<p className='capitalize p-2 text-black'>500.00</p>
								</td>
							</tr>
						</table>
						<table className='w-full my-2 mb-5'>
							<tr>
								<td className='w-1/4'>
									<p className='uppercase text-black font-bold'>code</p>
								</td>
								<td className='w-1/4' align='right'>
									<p className='uppercase text-black font-bold'>pre vat</p>
								</td>
								<td className='w-1/4' align='right'>
									<p className='uppercase text-black font-bold'>vat</p>
								</td>
								<td className='w-1/4' align='right'>
									<p className='uppercase text-black font-bold'>total</p>
								</td>
							</tr>
							<tr>
								<td className='w-1/4'>
									<p className='text-black'>G - 16.00%</p>
								</td>
								<td className='w-1/4' align='right'>
									<p className='text-black'>420</p>
								</td>
								<td className='w-1/4' align='right'>
									<p className='text-black'>80</p>
								</td>
								<td className='w-1/4' align='right'>
									<p className='text-black'>500</p>
								</td>
							</tr>
							<tr>
								<td className='w-1/4'>
									<p className='text-black'>TOTALS</p>
								</td>
								<td className='w-1/4' align='right'>
									<p className='text-black'>420</p>
								</td>
								<td className='w-1/4' align='right'>
									<p className='text-black'>80</p>
								</td>
								<td className='w-1/4' align='right'>
									<p className='text-black'>500</p>
								</td>
							</tr>
						</table>
						<table className='w-full my-2 border-t border-b border-black'>
							<tr>
								<td align='center'>
									<p className='text-black font-bold'>For home deliveries call</p>
									<p className='text-black font-bold'>0123456789</p>
								</td>
							</tr>
						</table>
						<table className='w-full my-2 '>
							<th align='center'>
								<p className='uppercase text-black font-bold'>control unit info</p>
							</th>
							<tr>
								<td align='center'>
									<p className=' text-black'>
										CU Serial No: <span>KRAMWO123456789</span>
									</p>
								</td>
							</tr>
							<tr>
								<td align='center'>
									<p className=' text-black'>
										CU Invoice No: <span>0O123456789</span>
									</p>
								</td>
							</tr>
							<tr>
								<td align='center'>
									<p className=' text-black'>
										Receipt Ref No: <span>90102418951</span>
									</p>
								</td>
							</tr>
							<tr>
								<td align='center'>
									<p className=' text-black'>
										Date: <span>9/03/2024 16:08:51</span>
									</p>
								</td>
							</tr>
							<tr>
								<td align='center'>
									<img
										src='https://e-receipts-kenya.s3.amazonaws.com/qrcode/717b120f-548d-4598-b416-ed1b9a376fbe.png'
										alt='qrcode'
										className='block m-auto'
										width='100'
									/>
								</td>
							</tr>
						</table>
						<table className='w-full my-2 border-t border-b border-black'>
							<th align='left'>
								<p className='uppercase font-bold text-black'>rewarded discounts</p>
							</th>
							<tr>
								<td className='w-1/2'>
									<p className='capitalize text-black'>Item</p>
								</td>
								<td align='right' className='w-1/2'>
									<p className='capitalize text-black'>Rewarded discount</p>
								</td>
							</tr>
							<tr>
								<td className='w-1/2'>
									<p className='capitalize text-black'>stainless steel water bottle</p>
								</td>
								<td align='right' className='w-1/2'>
									<p className='capitalize text-black'>20</p>
								</td>
							</tr>
							<tr>
								<td className='w-1/2'>
									<p className='capitalize text-black'>total discount</p>
								</td>
								<td align='right' className='w-1/2'>
									<p className='capitalize text-black'>20</p>
								</td>
							</tr>
						</table>
						<table className='w-full my-2'>
							<th align='left'>
								<p className=' text-black'>Note: Prices shown on receipt are inclusive of discount</p>
							</th>
						</table>
						<table className='w-full my-2 border-t border-b border-black'>
							<th align='left'>
								<p className='uppercase text-black font-bold'>loyalty points</p>
							</th>
							<tr>
								<td className='w-1/3'>
									<p className='capitalize text-black'>loyalty code</p>
								</td>
								<td className='w-2/3'>
									<p className='capitalize text-black'>01234567</p>
								</td>
							</tr>
							<tr>
								<td className='w-1/3'>
									<p className='capitalize text-black'>customer</p>
								</td>
								<td className='w-2/3'>
									<p className='capitalize text-black'>Joel Wekesa</p>
								</td>
							</tr>
							<tr>
								<td className='w-1/3'>
									<p className='capitalize text-black'>points earned</p>
								</td>
								<td className='w-2/3'>
									<p className='capitalize text-black'>16 credited</p>
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

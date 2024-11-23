'use client';

import {Button} from '@/components/ui/button';
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from '@/components/ui/card';
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from '@/components/ui/table';
import {BillingAccount} from '@/models/billing/account';
import {Invoice} from '@/models/billing/invoice';
import {InvoiceStatus} from '@/models/billing/invoices';
import useInvoice from '@/services/invoices/invoice';
import useVerifyStatement, {VerifyPayment} from '@/services/paystack/verify-payment';
import currencyFormat from '@/utils/currency';
import dayjs from 'dayjs';
import {CheckCircle, Download, HandCoins, RefreshCw} from 'lucide-react';
import {FC, useRef} from 'react';
import {usePaystackPayment} from 'react-paystack';
import {jsPDF} from 'jspdf';
import html2canvas from 'html2canvas';

export type Paid = Omit<VerifyPayment, 'invoiceId'>;

const InvoiceComponent: FC<{invoice: Invoice; token: string; account: BillingAccount}> = ({
	invoice,
	token,
	account,
}) => {
	const {data, isPending, isLoading, isRefetching} = useInvoice({token, invoice, id: invoice.id});

	const config = {
		reference: `${new Date().getTime() + Math.floor(100000 + Math.random() * 900000)}`,
		email: account.user.email,
		amount: invoice.totalAmount * 100,
		publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || '',
		currency: 'KES',
	};

	const {mutate} = useVerifyStatement();

	const onSuccess = (paid: Paid) => {
		mutate({
			data: {
				...paid,
				invoiceId: invoice.id,
			},
			token,
		});
	};

	const onClose = () => {
		// implementation for  whatever you want to do when the Paystack dialog closed.
		console.log('closed');
	};

	const initializePayment = usePaystackPayment(config);

	const handlePay = async () =>
		initializePayment({
			onSuccess,
			onClose,
		});

	const componentRef = useRef<HTMLDivElement>(null);

	const handleDownload = async () => {
		if (!componentRef.current) return;

		// Clone the component
		const clone = componentRef.current.cloneNode(true) as HTMLElement;

		// Apply desktop-specific styles
		clone.style.width = '1024px'; // Example desktop width
		clone.style.height = 'auto'; // Ensure height adapts to content
		clone.style.background = '#ffffff'; // Set background to white
		clone.style.color = '#000000'; // Ensure text is visible

		// Hide the download button in the cloned version
		const downloadButton = clone.querySelector<HTMLButtonElement>('.download-button');
		if (downloadButton) {
			downloadButton.style.display = 'none';
		}

		// Append the clone to the body temporarily for rendering
		document.body.appendChild(clone);

		try {
			// Render the cloned element using html2canvas
			const canvas = await html2canvas(clone, {scale: 2});

			// Set up jsPDF
			const pdf = new jsPDF('p', 'mm', 'a4');
			const pdfWidth = pdf.internal.pageSize.getWidth();
			const pdfHeight = pdf.internal.pageSize.getHeight();
			const imgWidth = canvas.width;
			const imgHeight = canvas.height;
			const scaleFactor = pdfWidth / imgWidth;

			let yOffset = 0;

			// Generate multi-page PDF
			while (yOffset < imgHeight) {
				const canvasSlice = document.createElement('canvas');
				canvasSlice.width = canvas.width;
				canvasSlice.height = Math.min(canvas.height - yOffset, pdfHeight / scaleFactor);

				const ctx = canvasSlice.getContext('2d');
				if (!ctx) throw new Error('Failed to create canvas context');
				ctx.drawImage(canvas, 0, yOffset, canvas.width, canvasSlice.height, 0, 0, canvasSlice.width, canvasSlice.height);

				const sliceData = canvasSlice.toDataURL('image/png');
				if (yOffset > 0) {
					pdf.addPage();
				}
				pdf.addImage(sliceData, 'PNG', 0, 0, pdfWidth, canvasSlice.height * scaleFactor);

				yOffset += canvasSlice.height;
			}

			// Save the PDF
			pdf.save('invoice.pdf');
		} catch (error) {
			console.error('Failed to generate PDF:', error);
		} finally {
			// Clean up by removing the clone from the DOM
			document.body.removeChild(clone);
		}
	};

	return (
		<Card className='w-full max-w-4xl mx-auto'>
			<div ref={componentRef} className='px-4 md:px-0'>
				<CardHeader className='border-b border-gray-200'>
					<div className='flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0'>
						<CardTitle className='text-xl md:text-2xl font-bold'>Invoice</CardTitle>

						{data?.status === InvoiceStatus.PAID ? (
							<div className='flex items-center space-x-2'>
								{isPending ||
									isLoading ||
									(isRefetching ? (
										<RefreshCw className={`w-6 h-6 md:w-8 md:h-8 text-white opacity-80 animate-spin`} />
									) : (
										<CheckCircle className='text-green-500' />
									))}

								<span className='font-semibold text-green-500'>{data?.status}</span>
							</div>
						) : (
							<Button className='bg-red-500 hover:bg-red-600 text-slate-100 w-full md:w-auto' onClick={handlePay}>
								<HandCoins className='mr-2 h-4 w-4' /> Pay Now
							</Button>
						)}
					</div>
				</CardHeader>
				<CardContent className='pt-6'>
					<div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-6'>
						<div>
							<p className='text-sm font-medium text-gray-500'>Invoice Number</p>
							<p className='text-base md:text-lg font-semibold'>{data?.id}</p>
						</div>
						<div>
							<p className='text-sm font-medium text-gray-500'>Total Amount</p>
							<p className='text-base md:text-lg font-semibold'>
								{currencyFormat.format(data?.totalAmount || invoice.totalAmount)}
							</p>
						</div>
						<div>
							<p className='text-sm font-medium text-gray-500'>Issue Date</p>
							<p className='text-sm md:text-base'>{dayjs(data?.issuedAt).format('DD MMMM YYYY HH:mm')}</p>
						</div>
						<div>
							<p className='text-sm font-medium text-gray-500'>Due Date</p>
							<p className='text-sm md:text-base'>{dayjs(data?.dueDate).format('DD MMMM YYYY HH:mm')}</p>
						</div>
						{data?.paidAt && (
							<div>
								<p className='text-sm font-medium text-gray-500'>Paid Date</p>
								<p className='text-sm md:text-base'>{dayjs(data?.paidAt).format('DD MMMM YYYY HH:mm')}</p>
							</div>
						)}
					</div>
					<div className='overflow-x-auto'>
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead className='text-left'>Item</TableHead>
									<TableHead className='text-left hidden md:table-cell'>Description</TableHead>
									<TableHead className='text-right'>Qty</TableHead>
									<TableHead className='text-right'>Price</TableHead>
									<TableHead className='text-right'>Total</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{data?.BillingItem.map((item) => (
									<TableRow key={item.id}>
										<TableCell className='font-medium'>{item.title}</TableCell>
										<TableCell className='hidden md:table-cell'>{item.description}</TableCell>
										<TableCell className='text-right'>{item.quantity}</TableCell>
										<TableCell className='text-right'>{currencyFormat.format(item.unitPrice)}</TableCell>
										<TableCell className='text-right'>{currencyFormat.format(item.totalPrice)}</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</div>
				</CardContent>

				<CardFooter className='flex flex-col md:flex-row justify-between items-center border-t border-gray-200 pt-6 space-y-4 md:space-y-0'>
					<div className='text-center md:text-left'>
						<p className='text-sm font-medium text-gray-500'>Total Amount</p>
						<p className='text-xl md:text-2xl font-bold'>{currencyFormat.format(data?.totalAmount || invoice.totalAmount)}</p>
					</div>
					{data?.status === InvoiceStatus.PAID ? (
						<Button
							className='bg-green-500 hover:bg-green-600 text-slate-100 download-button w-full md:w-auto'
							onClick={handleDownload}>
							<Download className='mr-2 h-4 w-4' /> Download
						</Button>
					) : (
						<Button
							className='bg-red-500 hover:bg-red-600 text-slate-100 download-button w-full md:w-auto'
							onClick={handlePay}>
							<HandCoins className='mr-2 h-4 w-4' /> Pay Now
						</Button>
					)}
				</CardFooter>
			</div>
		</Card>
	);
};

export default InvoiceComponent;

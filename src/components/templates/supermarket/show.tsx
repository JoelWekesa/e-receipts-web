import {Store} from '@/models/store';
import GenerateSuperMarketTemplate from './generate';
import SupermarketComponent from './supermarket';
import {FC} from 'react';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Product} from '@/models/inventory/product';

interface Props {
	store: Store;
	token: string;
	products: Product[];
}

export const PreviewBox: FC<Props> = ({store, token, products}) => {
	return (
		<div className='flex min-h-screen w-full flex-col'>
			<div className='flex flex-col sm:gap-4 sm:py-4 sm:pl-14'>
				<main className='grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3'>
					<div className='grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2'>
						<Card x-chunk='dashboard-05-chunk-3' className='w-full'>
							<CardHeader className='px-7'>
								<CardTitle>Send Receipt</CardTitle>
								<CardDescription>Send your receipt in 3 easy steps</CardDescription>
							</CardHeader>
							<CardContent>
								<GenerateSuperMarketTemplate storeId={store.id} token={token} products={products} />
							</CardContent>
						</Card>
					</div>
					<div className='hidden sm:block lg:block justify-center items-center'>
						<Card x-chunk='dashboard-05-chunk-3' className='w-full'>
							<CardHeader className='px-7'>
								<CardTitle>Receipt</CardTitle>
								<CardDescription>This is the receipt your client will receive</CardDescription>
							</CardHeader>
							<CardContent>
								<SupermarketComponent store={store} />
							</CardContent>
						</Card>
					</div>
				</main>
			</div>
		</div>
	);
};

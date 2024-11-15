import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {ScrollArea} from '@/components/ui/scroll-area';
import {Store} from '@/models/store';
import useUserStores from '@/services/stores/user-stores';
import {PackageIcon, ShoppingBagIcon} from 'lucide-react';
import Link from 'next/link';
import {FC} from 'react';
import { buttonVariants } from '../ui/button';
import { H3 } from '../titles';

const MyStores: FC<{stores: Store[]}> = ({stores}) => {
	const {data = []} = useUserStores({initialData: stores});

	return (
		<Card className='w-full'>
			<CardHeader>
				<CardTitle className='text-2xl font-bold'>My Stores - {`${data?.length}`}</CardTitle>
			</CardHeader>
			<CardContent>
				{data.length > 0 ? (
					<ScrollArea className='h-[400px] pr-4'>
						<ul className='space-y-4'>
							{data.map((item) => (
								<li
									key={item.id}
									className='flex items-start space-x-4 p-4 bg-secondary rounded-lg transition-all hover:shadow-md'>
									<ShoppingBagIcon className='w-6 h-6 text-primary mt-1' />
									<Link href={`/store/dashboard/${item.id}`}>
										<div>
											<H3 className='font-semibold'>{item.displayName}</H3>
											<p className='text-sm text-muted-foreground'>{item.address}</p>
										</div>
									</Link>
								</li>
							))}
						</ul>
					</ScrollArea>
				) : (
					<div className='flex flex-col items-center justify-center h-[300px] text-center'>
						<PackageIcon className='w-16 h-16 text-muted-foreground mb-4' />
						<H3 className='text-xl font-semibold mb-2'>You do not have any stores</H3>
						<p className='text-muted-foreground'>Your stores list is empty. Add some stores to see them here!</p>
						<Link href={`/stores/add`} className={`${buttonVariants()} my-3`}>
							Create Store
						</Link>
					</div>
				)}
			</CardContent>
		</Card>
	);
};

export default MyStores;

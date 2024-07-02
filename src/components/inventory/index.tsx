'use client';
import Link from 'next/link';
import {FC, useState} from 'react';
import CategoryIndex, {CategoryProps} from './category';
import {Store} from '@/models/store';

export interface InventoryProps {
	categoryProps: CategoryProps;
	store: Store;
}

const InventoryComponent: FC<{data: InventoryProps}> = ({
	data: {
		categoryProps: {categories, storeId},
		store,
	},
}) => {
	const [activeTab, setActiveTab] = useState('category');

	return (
		<div className='flex min-h-screen w-full flex-col'>
			<main className='flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10'>
				<div className='mx-auto grid w-full max-w-6xl gap-2'>
					<h1 className='text-3xl font-semibold'>Inventory</h1>
				</div>
				<div className='mx-auto grid w-full max-w-6xl items-start gap-1 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]'>
					<nav className='grid gap-4 text-sm text-muted-foreground' x-chunk='dashboard-04-chunk-0'>
						<Link
							href='#'
							className={`font-semibold ${activeTab === 'category' ? 'text-primary' : 'text-muted-foreground'}`}
							onClick={() => setActiveTab('category')}>
							Categories
						</Link>
						<Link
							href={`/inventory/add/${storeId}`}
							className={`font-semibold ${activeTab === 'product' ? 'text-primary' : 'text-muted-foreground'}`}
							onClick={() => setActiveTab('product')}>
							Products
						</Link>
						<Link
							href='#'
							className={`font-semibold ${activeTab === 'integrations' ? 'text-primary' : 'text-muted-foreground'}`}
							onClick={() => setActiveTab('integrations')}>
							Integrations
						</Link>
						<Link
							href='#'
							className={`font-semibold ${activeTab === 'support' ? 'text-primary' : 'text-muted-foreground'}`}
							onClick={() => setActiveTab('support')}>
							Support
						</Link>
						<Link
							href='#'
							className={`font-semibold ${activeTab === 'organizations' ? 'text-primary' : 'text-muted-foreground'}`}
							onClick={() => setActiveTab('organizations')}>
							Organizations
						</Link>
						<Link
							href='#'
							className={`font-semibold ${activeTab === 'advanced' ? 'text-primary' : 'text-muted-foreground'}`}
							onClick={() => setActiveTab('advanced')}>
							Advanced
						</Link>
					</nav>

					<div className='grid gap-6'>
						<h1 className='text-3xl font-semibold'>{store.name}</h1>

						{activeTab === 'category' && <CategoryIndex data={{categories, storeId}} />}
					</div>
				</div>
			</main>
		</div>
	);
};

export default InventoryComponent;

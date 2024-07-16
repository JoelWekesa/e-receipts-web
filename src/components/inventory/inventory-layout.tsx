'use client';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {FC, ReactNode, useEffect, useState} from 'react';

const InventoryLayout: FC<{children: ReactNode; storeId: string}> = ({children, storeId}) => {
	const [activeTab, setActiveTab] = useState('category');

	const pathname = usePathname();

	useEffect(() => {
		const inventoryRegex = /^\/inventory\/[a-zA-Z0-9]+$/;
		const addRegex = /\/inventory\/add\/[a-zA-Z0-9]+/;
		const categoryRegex = /\/inventory\/category\/[a-zA-Z0-9]+/;

		switch (true) {
			case inventoryRegex.test(pathname):
				setActiveTab('inventory');
				break;

			case addRegex.test(pathname):
				setActiveTab('add');
				break;

			case categoryRegex.test(pathname):
				setActiveTab('category');
				break;

			default:
				setActiveTab('inventory');
		}
	}, [pathname]);

	return (
		<div className='flex min-h-screen w-full flex-col'>
			<main className='flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4  p-2 md:gap-8 md:p-10'>
				<div className='mx-auto grid w-full max-w-6xl gap-2'>
					<h1 className='text-3xl font-semibold'>Inventory</h1>
				</div>
				<div className='mx-auto grid w-full max-w-6xl items-start gap-1 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]'>
					<nav className='grid gap-4 text-sm text-muted-foreground' x-chunk='dashboard-04-chunk-0'>
						<Link
							href={`/inventory/${storeId}`}
							className={`font-semibold ${activeTab === 'inventory' ? 'text-primary' : 'text-muted-foreground'}`}>
							Inventory
						</Link>
						<Link
							href={`/inventory/category/${storeId}`}
							className={`font-semibold ${activeTab === 'category' ? 'text-primary' : 'text-muted-foreground'}`}>
							Categories
						</Link>

						<Link
							href={`/inventory/add/${storeId}`}
							className={`font-semibold ${activeTab === 'add' ? 'text-primary' : 'text-muted-foreground'}`}>
							Add Inventory
						</Link>
						<Link
							href='#'
							className={`font-semibold ${activeTab === 'integrations' ? 'text-primary' : 'text-muted-foreground'}`}>
							Integrations
						</Link>
						<Link href='#' className={`font-semibold ${activeTab === 'support' ? 'text-primary' : 'text-muted-foreground'}`}>
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
					<div className='grid gap-6'>{children}</div>
				</div>
			</main>
		</div>
	);
};

export default InventoryLayout;

import { StoreFrontSiteHeader } from '@/components/shared/store-front-site-header';
import { getCategories } from '@/services/page/inventory/categories/store-categories';
import { storeFromName } from '@/services/page/stores/store/store-from-name';
import { getServerSession } from 'next-auth';
import { FC, ReactNode } from 'react';
import { options } from '../../api/auth/[...nextauth]/options';

const StoreClientsLayout: FC<{
	children: ReactNode;
	params: {name: string};
}> = async props => {
    const params = await props.params;

    const {
        children
    } = props;

    const {name} = params;

    const session = await getServerSession(options);

    const token = session?.accessToken || '';

    const [store] = await Promise.all([storeFromName({name})]);

    const storeId = store.id;

    const categories = await getCategories({storeId, token});

    return (
		<>
			<div vaul-drawer-wrapper=''>
				<div className='relative flex min-h-screen flex-col bg-background'>
					<StoreFrontSiteHeader store={store} categories={categories} />
					<main className='flex-1'>{children}</main>
				</div>
			</div>
		</>
	);
};

export default StoreClientsLayout;

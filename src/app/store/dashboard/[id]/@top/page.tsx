import {options} from '@/app/api/auth/[...nextauth]/options';
import {Skeleton} from '@/components/ui/skeleton';
import {getStoreTopCustomers} from '@/services/page/stores/store/top-customers';
import {getServerSession} from 'next-auth';
import dynamic from 'next/dynamic';

const DynamicTopsComponent = dynamic(() => import('../../../../../components/store/tops'), {
	loading: () => <Skeleton className='h-10 w-full' />,
});

const StoreTopCustomers = async (props: {params: Promise<{id: string}>}) => {
    const params = await props.params;
    const session = await getServerSession(options);

    const token = session?.accessToken || '';

    const storeId = params.id;

    const topCustomers = await getStoreTopCustomers({
		storeId,
		token,
	});

    return <DynamicTopsComponent topCustomers={topCustomers} storeId={storeId} />;
};

export default StoreTopCustomers;

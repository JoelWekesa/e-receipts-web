import {options} from '@/app/api/auth/[...nextauth]/options';
import {Skeleton} from '@/components/ui/skeleton';
import {getStoreTopCustomers} from '@/services/page/stores/store/top-customers';
import {getStoreFromTeam} from '@/services/page/teams/store-from-team';
import {getServerSession} from 'next-auth';
import dynamic from 'next/dynamic';

const DynamicTopsComponent = dynamic(() => import('../../../../../components/store/tops'), {
	loading: () => <Skeleton className='h-10 w-full' />,
});

const StoreTopCustomers = async (props: {params: Promise<{team: string}>}) => {
    const params = await props.params;
    const session = await getServerSession(options);

    const token = session?.accessToken || '';

    const id = params.team;

    const storeFromTeam = await getStoreFromTeam({
		id,
		token,
	});

    const topCustomers = await getStoreTopCustomers({
		storeId: storeFromTeam?.store?.id || '',
		token,
	});

    return <DynamicTopsComponent topCustomers={topCustomers} storeId={storeFromTeam.store.id} />;
};

export default StoreTopCustomers;

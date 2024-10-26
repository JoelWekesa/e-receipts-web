import {options} from '@/app/api/auth/[...nextauth]/options';
import OrderTabs from '@/components/orders/tabs';
import {OrderStatus} from '@/models/orders/orders-store';
import orderStores from '@/services/page/orders/orders-store';
import {getServerSession} from 'next-auth';

interface Props {
	params: Promise<{
		storeId: string;
	}>;
}

const Orders = async (props: Props) => {
    const params = await props.params;

    const {
        storeId
    } = params;

    const session = await getServerSession(options);

    const token = session?.accessToken || '';

    const [pending, processing, completed] = await Promise.all([
		orderStores({storeId, status: OrderStatus.PENDING, token}),
		orderStores({storeId, status: OrderStatus.PROCESSING, token}),
		orderStores({storeId, status: OrderStatus.COMPLETED, token}),
	]);

    return <OrderTabs pending={pending} processing={processing} completed={completed} storeId={storeId} />;
};

export default Orders;

import {options} from '@/app/api/auth/[...nextauth]/options';
import {PreviewBox} from '@/components/templates/supermarket/show';
import {getStoreProducts} from '@/services/page/inventory/store/store-variants';
import {getStoreFromTeam} from '@/services/page/teams/store-from-team';
import {getServerSession} from 'next-auth';

const CreateReceiptPage = async ({params}: {params: {id: string}}) => {
	const session = await getServerSession(options);

	const token = session?.accessToken || '';

	const {id} = params;

	const storeFromTeam = await getStoreFromTeam({id, token});

	const {store} = storeFromTeam;

	const products = await getStoreProducts({token, storeId: store.id});

	return (
		<div className='p-3'>
			<PreviewBox
				store={{
					...store,
					updatedAt: new Date(store.updatedAt),
					updatedById: store?.updatedById || '',
					access_id: store?.access_id || '',
				}}
				token={token}
				products={products}
			/>
		</div>
	);
};

export default CreateReceiptPage;

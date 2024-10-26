import {options} from '@/app/api/auth/[...nextauth]/options';
import RecordFloatBalance from '@/components/float/transaction/record-balance';
import StoreTransactionsComponent from '@/components/float/transaction/table';
import {siteConfig} from '@/config/site';
import {getStoreFloat} from '@/services/page/float/get-store-float';
import {getStoreTransactions} from '@/services/page/float/transactions';
import {getStore} from '@/services/page/stores/store/get-store';
import {getTeam} from '@/services/page/teams/get-team';
import {Metadata} from 'next';
import {getServerSession} from 'next-auth';
import {FC} from 'react';

type Params = Promise<{team: string}>;

export async function generateMetadata(props: {params: Params}): Promise<Metadata> {
	const params = await props.params;
	const session = await getServerSession(options);

	const token = session?.accessToken || '';

	const {team: teamId} = params;

	const team = await getTeam({id: teamId, token});

	const store = await getStore({
		token,
		id: team.storeId,
	});

	const shopUrl = `${siteConfig.url}/shop/${encodeURIComponent(store.name)}`;

	const indexable = !!store?.logo;

	return {
		title: `Record Float Balance | ${store.displayName}`,
		description: store.displayName,
		keywords: [store.displayName, store.address],
		metadataBase: new URL(shopUrl),
		robots: {
			index: indexable,
			follow: indexable,
			googleBot: {
				index: indexable,
				follow: indexable,
			},
		},

		openGraph: {
			type: 'website',
			locale: 'en_US',
			url: shopUrl,
			title: store.displayName,
			description: store.displayName,
			siteName: store.displayName,
			images: [
				{
					url: store.logo,
					width: 1200,
					height: 630,
					alt: store.name,
				},
			],
		},

		twitter: {
			card: 'summary_large_image',
			title: store.displayName,
			description: store.displayName,
			images: [store.logo],
			creator: '@joelwekesa_',
		},
		icons: {
			icon: '/favicon.ico',
			shortcut: '/favicon-16x16.png',
			apple: '/apple-touch-icon.png',
		},
	};
}

const CashStatements: FC<{params: Params}> = async ({params}) => {
	const {team: teamId} = await params;

	const session = await getServerSession(options);

	const token = session?.accessToken || '';

	const team = await getTeam({id: teamId, token});

	const store = await getStore({
		token,
		id: team.storeId,
	});

	const {id: storeId} = store;

	const float = getStoreFloat({storeId, token});

	const storeTransactions = getStoreTransactions({storeId, token});

	const [storeFloat, transactions] = await Promise.all([float, storeTransactions]);

	if (!storeFloat) {
		return null;
	}

	return (
		<div className='container mx-auto'>
			<div className='flex flex-col gap-2'>
				<RecordFloatBalance floatId={storeFloat.id} token={token} />
				<StoreTransactionsComponent
					storeFloat={null}
					storeCash={null}
					transactions={transactions}
					storeId={storeId}
					teamId={teamId}
				/>
			</div>
		</div>
	);
};

export default CashStatements;

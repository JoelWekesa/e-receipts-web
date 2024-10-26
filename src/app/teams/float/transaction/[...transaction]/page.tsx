import {options} from '@/app/api/auth/[...nextauth]/options';
import TransactionComponent from '@/components/float/transaction/transaction';
import {siteConfig} from '@/config/site';
import {getStoreFloat} from '@/services/page/float/get-store-float';
import {getStoreTransaction} from '@/services/page/float/transaction';
import {getStore} from '@/services/page/stores/store/get-store';
import {getTeam} from '@/services/page/teams/get-team';
import {Metadata} from 'next';
import {getServerSession} from 'next-auth';
import {FC} from 'react';

interface Props {
	params: Promise<{
		transaction: string[];
	}>;
}

export async function generateMetadata(props: Props): Promise<Metadata> {
    const params = await props.params;
    const session = await getServerSession(options);

    const token = session?.accessToken || '';

    const teamId = params.transaction[0];

    const team = await getTeam({id: teamId, token});

    const store = await getStore({
		token,
		id: team.storeId,
	});

    const shopUrl = `${siteConfig.url}/shop/${encodeURIComponent(store.name)}`;

    const indexable = !!store?.logo;

    return {
		title: `Float Transaction | ${store.displayName}`,
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

const CashStatements: FC<Props> = async props => {
    const params = await props.params;
    const teamId = params.transaction[0];
    const transactionId = params.transaction[1];
    const session = await getServerSession(options);

    const token = session?.accessToken || '';

    const team = await getTeam({id: teamId, token});

    const store = await getStore({
		token,
		id: team.storeId,
	});

    const {id: storeId} = store;

    const float = getStoreFloat({storeId, token});

    const storeTransaction = getStoreTransaction({token, transactionId});

    const [storeFloat, transaction] = await Promise.all([float, storeTransaction]);

    if (!storeFloat) {
		return null;
	}

    return (
		<div className='container mx-auto my-4'>
			<TransactionComponent transaction={transaction} teamId={teamId} />
		</div>
	);
};

export default CashStatements;

import {options} from '@/app/api/auth/[...nextauth]/options';
import StoreFloatStatementsComponent from '@/components/statements/float';
import {siteConfig} from '@/config/site';
import {getStoreCash} from '@/services/page/float/cash';
import getStoreFloatStatements from '@/services/page/float/float-statements';
import {getStoreFloat} from '@/services/page/float/get-store-float';
import {getStore} from '@/services/page/stores/store/get-store';
import {getTeam} from '@/services/page/teams/get-team';
import {Metadata} from 'next';
import {getServerSession} from 'next-auth';
import {FC} from 'react';

interface Props {
	params: {
		team: string;
	};
}

export async function generateMetadata({params}: {params: {team: string}}): Promise<Metadata> {
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
		title: `Float Statements | ${store.displayName}`,
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

const FloatStatements: FC<Props> = async ({params: {team: teamId}}) => {
	const session = await getServerSession(options);

	const token = session?.accessToken || '';

	const team = await getTeam({id: teamId, token});

	const store = await getStore({
		token,
		id: team.storeId,
	});

	const {id: storeId} = store;

	console.log({storeId});

	const float = getStoreFloat({storeId, token});

	const cash = getStoreCash({storeId, token});

	const floatStatements = getStoreFloatStatements({storeId, token});

	const [storeFloat, storeCash, statements] = await Promise.all([float, cash, floatStatements]);

	return (
		<div className='container mx-auto'>
			<StoreFloatStatementsComponent
				statements={statements}
				storeId={storeId}
				token={token}
				storeCash={storeCash}
				storeFloat={storeFloat}
				team
			/>
		</div>
	);
};

export default FloatStatements;

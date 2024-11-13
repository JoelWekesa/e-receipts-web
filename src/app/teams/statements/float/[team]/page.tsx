import {options} from '@/app/api/auth/[...nextauth]/options';
import StoreFloatStatementsComponent from '@/components/statements/float';
import {siteConfig} from '@/config/site';
import {getStoreCash} from '@/services/page/float/cash';
import getStoreFloatStatements from '@/services/page/float/float-statements';
import {getStoreFloat} from '@/services/page/float/get-store-float';
import {getStore} from '@/services/page/stores/store/get-store';
import {getTeam} from '@/services/page/teams/get-team';
import dayjs from 'dayjs';
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
		title: `Float Statements | ${store.displayName}`,
		description: store.displayName,
		keywords: [store.displayName, store.address, ...siteConfig.keywords],
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

const FloatStatements: FC<{params: Params}> = async ({params}) => {
	const {team: teamId} = await params;

	const startDate = dayjs().startOf('month').startOf('day').toISOString();
	const endDate = dayjs().endOf('month').endOf('day').toISOString();

	const session = await getServerSession(options);

	const token = session?.accessToken || '';

	const team = await getTeam({id: teamId, token});

	const store = await getStore({
		token,
		id: team.storeId,
	});

	const {id: storeId} = store;

	const float = getStoreFloat({storeId, token});

	const cash = getStoreCash({storeId, token});

	const floatStatements = getStoreFloatStatements({storeId, token, startDate, endDate});

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

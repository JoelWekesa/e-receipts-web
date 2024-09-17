import {options} from '@/app/api/auth/[...nextauth]/options';
import StoreCashStatementsComponent from '@/components/statements/cash';
import {siteConfig} from '@/config/site';
import {getStoreCash} from '@/services/page/float/cash';
import {getStoreFloat} from '@/services/page/float/get-store-float';
import getCashStatements from '@/services/page/float/statements';
import {getStore} from '@/services/page/stores/store/get-store';
import {getTeam} from '@/services/page/teams/get-team';
import dayjs from 'dayjs';
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
		title: `Cash Statements | ${store.displayName}`,
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

const CashStatements: FC<Props> = async ({params: {team: teamId}}) => {
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

	console.log({storeId});

	const float = getStoreFloat({storeId, token});

	const cash = getStoreCash({storeId, token});

	const cashStatement = getCashStatements({storeId, token, startDate, endDate});

	const [storeFloat, storeCash, statements] = await Promise.all([float, cash, cashStatement]);

	return (
		<div className='container mx-auto'>
			<StoreCashStatementsComponent
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

export default CashStatements;

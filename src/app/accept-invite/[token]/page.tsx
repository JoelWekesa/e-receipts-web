import {options} from '@/app/api/auth/[...nextauth]/options';
import AcceptComponent from '@/components/teams/invites/accept';
import ApiClient from '@/config/axios';
import {getServerSession} from 'next-auth';
import React from 'react';

export const revalidate = 0;

const acceptInvitation = async ({token, acceptToken}: {token: string; acceptToken: string}) => {
	const response = await ApiClient(token)
		.get(`teams/accept?token=${acceptToken}`)
		.then((res) => res.data);
	return response;
};

const ConfirmPage = async ({params}: {params: {token: string}}) => {
	const {token: acceptToken} = params;
	const session = await getServerSession(options);
	const token = session?.accessToken || '';
	const {teamId} = await acceptInvitation({token, acceptToken});

	return (
		<div>
			<AcceptComponent teamId={teamId} />
		</div>
	);
};

export default ConfirmPage;

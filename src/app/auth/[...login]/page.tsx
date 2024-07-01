import {LoginForm} from '@/components/auth/login';
import React from 'react';

const LoginPage = (req: any) => {
	const url = new URL(req?.searchParams?.callbackUrl || process.env.NEXT_PUBLIC_DOMAIN);
	return (
		<div className='flex flex-1 h-screen justify-center items-center'>
			<LoginForm path={url?.pathname} />
		</div>
	);
};

export default LoginPage;

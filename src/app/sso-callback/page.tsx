import { AuthenticateWithRedirectCallback } from '@clerk/nextjs';
import React from 'react';

const SSOCall = () => {
	return <AuthenticateWithRedirectCallback />;
};

export default SSOCall;

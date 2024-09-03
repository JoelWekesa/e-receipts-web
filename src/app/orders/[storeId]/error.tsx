'use client';

import CustomError from '@/components/error';

export default function AuthError({error}: {error: Error & {digest?: string}; reset: () => void}) {
	return <CustomError error={error} reset={() => {}} />;
}

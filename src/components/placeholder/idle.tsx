'use client';

import {useIdleTime} from '@/providers/idle-time';
import React from 'react';

const IdleComponent = () => {
	const {state, remaining} = useIdleTime();

	return <>{JSON.stringify({state, remaining})}</>;
};

export default IdleComponent;

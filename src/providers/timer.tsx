'use client';
import React, {createContext, FC, ReactNode, useEffect} from 'react';
import {IdleStatus, useIdleTime} from './idle-time';
import {signOut} from 'next-auth/react';

interface Props {
	children: ReactNode;
}

const TimerContext = createContext({});

const TimerProvider: FC<Props> = ({children}) => {
	const {state} = useIdleTime();

	useEffect(() => {
		if (state === IdleStatus.Idle) {
			signOut();
		}
	}, [state]);

	return <TimerContext.Provider value={{}}>{children}</TimerContext.Provider>;
};

export default TimerProvider;

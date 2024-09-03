'use client';
import React, {createContext, FC, useContext, useEffect, useState} from 'react';
import {useIdleTimer} from 'react-idle-timer';
interface Props {
	children: React.ReactNode;
}

export enum IdleStatus {
	Active = 'active',
	Idle = 'idle',
}

const IdleContext = createContext({
	state: IdleStatus.Active,
	remaining: 0,
});

export const useIdleTime = () => useContext(IdleContext);

const IdleTime: FC<Props> = ({children}) => {
	const [state, setState] = useState<IdleStatus>(IdleStatus.Active);
	const [count, setCount] = useState<number>(0);
	const [remaining, setRemaining] = useState<number>(0);

	const onIdle = () => {
		setState(IdleStatus.Idle);
	};

	const onActive = () => {
		setState(IdleStatus.Active);
	};

	const onAction = () => {
		setCount(count + 1);
	};

	const {getRemainingTime} = useIdleTimer({
		timeout: 1000 * 60 * 5,
		onIdle,
		onActive,
		onAction,
	});

	useEffect(() => {
		const interval = setInterval(() => {
			setRemaining(Math.ceil(getRemainingTime() / 1000));
		}, 500);

		return () => {
			clearInterval(interval);
		};
	}, [getRemainingTime]);

	return (
		<IdleContext.Provider
			value={{
				state,
				remaining,
			}}>
			{children}
		</IdleContext.Provider>
	);
};

export default IdleTime;

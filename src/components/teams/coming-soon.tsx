'use client';

import {Team} from '@/models/teams/team';
import {FC, useEffect, useState} from 'react';

interface Props {
	team: Team;
}

const ComingSoon: FC<Props> = ({team}) => {
	const [days, setDays] = useState(0);
	const [hours, setHours] = useState(0);
	const [minutes, setMinutes] = useState(0);
	const [seconds, setSeconds] = useState(0);

	useEffect(() => {
		const target = new Date('2024-11-31 23:59:59').getTime();

		const interval = setInterval(() => {
			const now = new Date().getTime();
			const difference = target - now;

			const d = Math.floor(difference / (1000 * 60 * 60 * 24));
			setDays(d);

			const h = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
			setHours(h);

			const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
			setMinutes(m);

			const s = Math.floor((difference % (1000 * 60)) / 1000);
			setSeconds(s);

			if (d <= 0 && h <= 0 && m <= 0 && s <= 0) {
				clearInterval(interval);
			}
		}, 1000);

		return () => clearInterval(interval);
	}, []);

	return (
		<div
			className='min-h-screen flex flex-col items-center justify-center bg-cover bg-center text-white'
			style={{
				backgroundImage:
					"url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80')",
			}}>
			<div className='absolute inset-0 bg-black opacity-50'></div>
			<div className='z-10 text-center'>
				<h1 className='text-5xl font-bold mb-4'>Coming Soon</h1>
				<p className='text-xl mb-8'>We are working hard to bring you something amazing!</p>
				<p className='text-md mb-8'>
					You will soon be able to work under {team.name} @{team.store.name}
				</p>
				<div className='flex justify-center space-x-4 mb-8'>
					<div className='text-center'>
						<span className='text-4xl font-bold'>{days}</span>
						<p className='text-sm'>Days</p>
					</div>
					<div className='text-center'>
						<span className='text-4xl font-bold'>{hours}</span>
						<p className='text-sm'>Hours</p>
					</div>
					<div className='text-center'>
						<span className='text-4xl font-bold'>{minutes}</span>
						<p className='text-sm'>Minutes</p>
					</div>
					<div className='text-center'>
						<span className='text-4xl font-bold'>{seconds}</span>
						<p className='text-sm'>Seconds</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ComingSoon;

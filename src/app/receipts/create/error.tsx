'use client';
import {Button} from '@/components/ui/button';
import Link from 'next/link';

export default function StoresError({error, reset}: {error: Error & {digest?: string}; reset: () => void}) {
	return (
		<div className='flex flex-col items-center justify-center w-full min-h-[80vh] px-4 text-center space-y-4'>
			<ServerCrashIcon className='h-20 w-20' />
			<div className='space-y-2'>
				<h1 className='text-4xl font-extrabold tracking-tighter sm:text-5xl/line-through'>{error?.name}</h1>
				<p className='text-gray-500'>
					{`We're sorry, but it looks like there was an error processing your request. `} <br /> Please make sure you{' '}
					<b className='text-green-500'>select a store </b> or <b className='text-green-500'>set a default store in settings</b>{' '}
					and try again
				</p>
			</div>
			<div className='flex flex-row gap-2'>
				<Link href='/stores/all'>
					<Button size='sm'>Go to Sores</Button>
				</Link>
				<Link href='/settings'>
					<Button size='sm'>Go to Settings</Button>
				</Link>
			</div>
		</div>
	);
}

function ServerCrashIcon(props: any) {
	return (
		<svg
			{...props}
			xmlns='http://www.w3.org/2000/svg'
			width='24'
			height='24'
			viewBox='0 0 24 24'
			fill='none'
			stroke='currentColor'
			strokeWidth='2'
			strokeLinecap='round'
			strokeLinejoin='round'>
			<path d='M6 10H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-2' />
			<path d='M6 14H4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2h-2' />
			<path d='M6 6h.01' />
			<path d='M6 18h.01' />
			<path d='m13 6-4 6h6l-4 6' />
		</svg>
	);
}

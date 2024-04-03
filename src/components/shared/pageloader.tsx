import React from 'react';

const PageLoader = () => {
	return (
		<div className='flex items-center justify-center h-screen text-center'>
			<div className='flex flex-col items-center justify-center space-y-2'>
				<div className='rounded-full border-4 border-gray-100 border-solid w-14 h-14 animate-pulse dark:border-gray-900' />
				<p className='text-2xl font-semibold tracking-tighter text-gray-500 animate-pulse dark:text-gray-400'>Loading</p>
			</div>
		</div>
	);
};

export default PageLoader;

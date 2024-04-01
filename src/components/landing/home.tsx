import React from 'react';
import {Button} from '../ui/button';
import Link from 'next/link';

const HomeComponent = () => {
	return (
		<section className='w-full py-12 md:py-24 lg:py-32 xl:py-40 p-8'>
			<div className='flex-col'>
				<div className='h-32 border-b my-8'>
					<p className='text-4xl sm:text-6xl tracking-widest text-center text-balance font-bold'>
						The most comprehensive E-Receipts Platform
					</p>
				</div>
				<div className='flex items-center justify-center flex-col'>
					<p className='text-base sm:text-xl tracking-widest text-center text-balance'>
						Say goodbye to messy wallets, fading ink, and lost receipts! E-Receipts revolutionizes the way businesses send and
						customers receive receipts.
					</p>
					<div className='flex flex-row mt-8 gap-5'>
						<Link href='/stores/add'>
							<Button>Get Started</Button>
						</Link>

						<Button variant='ghost'>Contact Sales</Button>
					</div>
				</div>
			</div>
		</section>
	);
};

export default HomeComponent;

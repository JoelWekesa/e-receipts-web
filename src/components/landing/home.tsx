import Link from 'next/link';
import {Button} from '../ui/button';
import {ArrowRight} from 'lucide-react';

const HomeComponent = () => {
	return (
		<div className='flex flex-col gap-8 pb-8 md:gap-16 md:pb-16 xl:pb-24'>
			<div className='flex flex-col items-center justify-center max-w-3xl px-8 mx-auto mt-8 sm:min-h-screen sm:mt-0 sm:px-0'>
				<div className='hidden sm:mb-8 sm:flex sm:justify-center'>
					<Link
						href='https://github.com/chronark/envshare'
						className='dark:text-zinc-400 text-zinc-800 relative overflow-hidden rounded-full py-1.5 px-4 text-sm leading-6 ring-1 dark:ring-zinc-100/10  ring-[#bfbfbf] hover:ring-zinc-100/30 duration-150'>
						Introducing{''}
						<span className='mx-2 font-semibold dark:text-zinc-200 text-black'>
							E-Risiti <span aria-hidden='true'>&rarr;</span>
						</span>
					</Link>
				</div>
				<div>
					<h1 className='py-4 text-5xl font-bold tracking-tight text-center text-transparent bg-gradient-to-t bg-clip-text from-zinc-100/50 to-black dark:to-white sm:text-7xl'>
						The Ultimate E-Receipts Platform
					</h1>
					<p className='mt-6 leading-5 sm:text-center'>
						Say goodbye to messy wallets, <span className='dark:text-zinc-600 text-zinc-400'>fading ink,</span> and lost
						receipts! E-Receipts revolutionizes the way businesses send and customers receive receipts.
					</p>
					<div className='flex flex-col justify-center gap-4 mx-auto mt-8 sm:flex-row sm:max-w-lg '>
						<Button variant='outline'>
							Share
							<ArrowRight className='ml-2 h-4 w-4' size={16} />
						</Button>
						<Button>Get Started For Free</Button>
					</div>
				</div>
			</div>
			{/* <h2 className='py-4 text-3xl font-bold text-center text-zinc-300 '>Used and trusted by a growing community</h2> */}
		</div>
	);
};

export default HomeComponent;

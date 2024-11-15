import {ArrowRight, BarChart3, Hammer, ShoppingCart, Store, Users2} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import {H1, H2, H3} from '../titles';
import {Button, buttonVariants} from '../ui/button';
import {Card, CardContent} from '../ui/card';

const HomeComponent = () => {
	return (
		<div className='flex flex-col'>
			{/* Introduction Section */}
			<section className='w-full py-8 bg-gradient-to-b from-white to-gray-50 dark:from-black dark:to-gray-900'>
				<div className='container flex flex-col items-center justify-center px-4 mx-auto sm:min-h-screen'>
					<div className='mb-6 sm:mb-8'>
						<Link
							href={process.env.NEXT_PUBLIC_DOMAIN || 'https://estore.africa'}
							className='relative overflow-hidden rounded-full py-1.5 px-4 text-sm leading-6 ring-1 ring-[#bfbfbf] hover:ring-zinc-100/30 duration-200 hover:scale-105 transition-all dark:text-zinc-400 text-zinc-800 dark:ring-zinc-100/10'>
							Introducing{' '}
							<span className='mx-2 font-semibold dark:text-zinc-200 text-black'>
								estore.africa <span aria-hidden='true'>&rarr;</span>
							</span>
						</Link>
					</div>
					<H1 className='py-4 text-5xl font-bold tracking-tight text-center text-transparent bg-gradient-to-t bg-clip-text from-zinc-100/50 to-black dark:to-white sm:text-7xl'>
						The smart way to run your business
					</H1>
					<p className='mt-6 leading-5 text-center'>
						An all-in-one platform to manage your business, from customers to inventory, and everything in between.
					</p>
					<div className='flex flex-col justify-center gap-4 mx-auto mt-8 sm:flex-row sm:max-w-lg'>
						<Button variant='outline' className='transition-transform duration-200 hover:scale-105'>
							Share
							<ArrowRight className='ml-2 h-4 w-4' size={16} />
						</Button>
						<Link
							href='/stores/add'
							className={buttonVariants({variant: 'default'}) + ' transition-transform duration-200 hover:scale-105'}>
							Get Started For Free
						</Link>
					</div>
				</div>
			</section>

			<main className='flex-1'>
				{/* Overview Section */}
				<section className='w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-gray-50 to-green-50 dark:from-gray-900 dark:to-black'>
					<div className='container px-4 md:px-6'>
						<H2 className='text-3xl font-bold tracking-tighter text-center mb-12'>An Overview Of eStore</H2>
						<div className='grid gap-8 md:grid-cols-3'>
							{[
								{
									icon: <Image src='/logo.png' alt='image' width={35} height={35} />,
									title: 'What Is eStore?',
									description:
										'An all-in-one business management platform designed to help entrepreneurs, retailers, wholesalers, and e-commerce businesses streamline their operations. eStore provides a comprehensive suite of tools to manage inventory, track sales, integrate with storefronts, and gain insights through real-time analytics.',
								},
								{
									icon: <Hammer className='w-6 h-6 text-blue-500 dark:text-blue-400' />,
									title: 'How Does It Work?',
									description:
										'eStore simplifies the way you run your business, combining powerful tools into one seamless platform. From a centralized dashboard, smart inventory automation, client management, and so much more',
								},
								{
									icon: <Users2 className='w-6 h-6 text-orange-500 dark:text-orange-400' />,
									title: 'Who Is It For?',
									description:
										'Perfect for businesses of all sizes looking to simplify and streamline their operations. Whether you’re a solo entrepreneur, a small retail shop, or a large multi-location business, eStore adapts to your needs.',
								},
							].map((item, index) => (
								<Card key={index} className='relative overflow-hidden transition-transform duration-200 hover:scale-105'>
									<CardContent className='p-6 pt-8'>
										<div className='rounded-full w-12 h-12 bg-primary/10 dark:bg-primary/20 flex items-center justify-center mb-4'>
											{item.icon}
										</div>
										<H3 className='text-xl font-bold mb-2'>{item.title}</H3>
										<p className='text-gray-500 dark:text-gray-400'>{item.description}</p>
									</CardContent>
								</Card>
							))}
						</div>
					</div>
				</section>

				{/* Features Section */}
				<section
					id='features'
					className='w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-green-50 to-white dark:from-black dark:to-gray-900'>
					<div className='container px-4 md:px-6'>
						<H2 className='text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12'>Key Features</H2>
						<div className='grid gap-10 sm:grid-cols-2 md:grid-cols-3'>
							{[
								{
									icon: <BarChart3 className='h-12 w-12 mb-2 text-primary' />,
									title: 'Real-time Analytics',
									description: 'Get instant insights into your inventory levels and sales performance.',
								},
								{
									icon: <Store className='h-12 w-12 mb-2 text-primary' />,
									title: 'Multi-Store Management',
									description: 'Centralize your operations and oversee all your stores from one platform.',
								},
								{
									icon: <ShoppingCart className='h-12 w-12 mb-2 text-primary' />,
									title: 'Integrated Storefront',
									description: 'Built-in e-commerce platform to showcase and sell your products online.',
								},
							].map((feature, index) => (
								<div
									key={index}
									className='flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg transition-transform duration-200 hover:scale-105'>
									{feature.icon}
									<H3 className='text-xl font-bold text-center'>{feature.title}</H3>
									<p className='text-sm text-center text-gray-500 dark:text-gray-400'>{feature.description}</p>
								</div>
							))}
						</div>
					</div>
				</section>

				{/* Contact Section */}
				<section
					id='contact'
					className='w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-white to-white dark:from-gray-900 dark:to-black'>
					<div className='container px-4 md:px-6'>
						<div className='flex flex-col items-center space-y-4 text-center'>
							<H2 className='text-3xl font-bold tracking-tighter sm:text-5xl'>Ready to Get Started?</H2>
							<p className='max-w-[600px] text-gray-500 dark:text-gray-400'>
								Join other businesses already using our platform. Sign up for a free trial today.
							</p>
							<div className='w-full max-w-sm space-y-2'>
								<Link
									href='/stores/add'
									className={buttonVariants({variant: 'default'}) + ' transition-transform duration-200 hover:scale-105'}>
									Get Started For Free
								</Link>
								<p className='text-xs text-gray-500 dark:text-gray-400'>
									By signing up, you agree to our{' '}
									<Link className='underline underline-offset-2' href='https://policy.estore.africa'>
										Terms & Conditions
									</Link>
								</p>
							</div>
						</div>
					</div>
				</section>
			</main>
		</div>
	);
};

export default HomeComponent;

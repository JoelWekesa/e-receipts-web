import {ArrowRight, BarChart3, CheckCircle, Lock, ShoppingCart, Smartphone, Store, Users2} from 'lucide-react';
import Link from 'next/link';
import {Button} from '../ui/button';
import {Card, CardContent} from '../ui/card';
import {Input} from '../ui/input';
import {H1, H2, H3} from '../titles';

const HomeComponent = () => {
	return (
		<div className='flex flex-col gap-8 pb-8 md:gap-16 md:pb-16 xl:pb-24'>
			<div className='flex flex-col items-center justify-center max-w-3xl px-8 mx-auto mt-8 sm:min-h-screen sm:mt-0 sm:px-0'>
				<div className='hidden sm:mb-8 sm:flex sm:justify-center'>
					<Link
						href={process.env.NEXT_PUBLIC_DOMAIN || 'https://estore.africa'}
						className='dark:text-zinc-400 text-zinc-800 relative overflow-hidden rounded-full py-1.5 px-4 text-sm leading-6 ring-1 dark:ring-zinc-100/10  ring-[#bfbfbf] hover:ring-zinc-100/30 duration-150'>
						Introducing{''}
						<span className='mx-2 font-semibold dark:text-zinc-200 text-black'>
							estore.africa <span aria-hidden='true'>&rarr;</span>
						</span>
					</Link>
				</div>
				<div>
					<H1 className='py-4 text-5xl font-bold tracking-tight text-center text-transparent bg-gradient-to-t bg-clip-text from-zinc-100/50 to-black dark:to-white sm:text-7xl'>
						The smart way to run your business
					</H1>
					<p className='mt-6 leading-5 sm:text-center'>
						An all-in-one platform to manage your business, from customers to inventory, and everything in between.
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
			{/* <H2 className='py-4 text-3xl font-bold text-center text-zinc-300 '>Used and trusted by a growing community</H2> */}

			<main className='flex-1'>
				<section className='w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-white to-gray-200 dark:from-gray-900 dark:to-gray-800'>
					<div className='container px-4 md:px-6'>
						<H2 className='text-3xl font-bold tracking-tighter text-center mb-12'>An Overview Of The Platform</H2>
						<div className='grid gap-8 md:grid-cols-3'>
							<Card className='relative overflow-hidden'>
								<CardContent className='p-6 pt-8'>
									<div className='rounded-full w-12 h-12 bg-primary/10 dark:bg-primary/20 flex items-center justify-center mb-4'>
										<Users2 className='w-6 h-6 text-primary' />
									</div>
									<H3 className='text-xl font-bold mb-2'>What Is Inventory Pro?</H3>
									<p className='text-gray-500 dark:text-gray-400'>
										A comprehensive inventory management solution built to simplify, streamline and accelerate your business
										growth. Our platform enables you to optimize, track, and manage your inventory efficiently and
										cost-effectively.
									</p>
								</CardContent>
							</Card>
							<Card className='relative overflow-hidden'>
								<CardContent className='p-6 pt-8'>
									<div className='rounded-full w-12 h-12 bg-pink-100 dark:bg-pink-900/20 flex items-center justify-center mb-4'>
										<Smartphone className='w-6 h-6 text-pink-500 dark:text-pink-400' />
									</div>
									<H3 className='text-xl font-bold mb-2'>How Does It Work?</H3>
									<p className='text-gray-500 dark:text-gray-400'>
										Inventory Pro integrates seamlessly with your existing systems and provides a user-friendly interface to
										manage your inventory. Track stock levels, automate reordering, and analyze performance with powerful
										analytics tools.
									</p>
								</CardContent>
							</Card>
							<Card className='relative overflow-hidden'>
								<CardContent className='p-6 pt-8'>
									<div className='rounded-full w-12 h-12 bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center mb-4'>
										<Lock className='w-6 h-6 text-orange-500 dark:text-orange-400' />
									</div>
									<H3 className='text-xl font-bold mb-2'>Who Is It For?</H3>
									<p className='text-gray-500 dark:text-gray-400'>
										Perfect for retailers, wholesalers, and e-commerce businesses looking to optimize their inventory management.
										Whether you are a small business or a large enterprise, our scalable solution adapts to your needs.
									</p>
								</CardContent>
							</Card>
						</div>
					</div>
				</section>
				<section
					id='features'
					className='w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-gray-800'>
					<div className='container px-4 md:px-6'>
						<H2 className='text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12'>Key Features</H2>
						<div className='grid gap-10 sm:grid-cols-2 md:grid-cols-3'>
							<div className='flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg'>
								<BarChart3 className='h-12 w-12 mb-2 text-primary' />
								<H3 className='text-xl font-bold text-center'>Real-time Analytics</H3>
								<p className='text-sm text-center text-gray-500 dark:text-gray-400'>
									Get instant insights into your inventory levels and sales performance.
								</p>
							</div>
							<div className='flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg'>
								<Store className='h-12 w-12 mb-2 text-primary' />
								<H3 className='text-xl font-bold text-center'>Multi-Store Management</H3>
								<p className='text-sm text-center text-gray-500 dark:text-gray-400'>
									Centralize your operations — oversee and grow all your stores with one powerful platform and one account.
								</p>
							</div>
							<div className='flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg'>
								<ShoppingCart className='h-12 w-12 mb-2 text-primary' />
								<H3 className='text-xl font-bold text-center'>Integrated Storefront</H3>
								<p className='text-sm text-center text-gray-500 dark:text-gray-400'>
									Built-in e-commerce platform to showcase and sell your products online.
								</p>
							</div>
						</div>
					</div>
				</section>
				<section id='pricing' className='w-full py-12 md:py-24 lg:py-32'>
					<div className='container px-4 md:px-6'>
						<H2 className='text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12'>Flexible Pricing</H2>
						<div className='grid gap-8 sm:grid-cols-2 lg:grid-cols-3'>
							{[
								{name: 'Starter', price: '$29', features: ['Basic inventory management', 'Up to 500 SKUs', '1 user']},
								{
									name: 'Pro',
									price: '$79',
									features: ['Advanced analytics', 'Unlimited SKUs', '5 users', 'Multi-channel support'],
								},
								{
									name: 'Enterprise',
									price: 'Custom',
									features: ['Dedicated support', 'Custom integrations', 'Unlimited everything'],
								},
							].map((plan) => (
								<div
									key={plan.name}
									className='flex flex-col p-6 bg-white shadow-lg rounded-lg dark:bg-gray-800 justify-between'>
									<div>
										<H3 className='text-2xl font-bold text-center'>{plan.name}</H3>
										<div className='mt-4 text-center text-gray-500 dark:text-gray-400'>
											<span className='text-4xl font-bold text-gray-900 dark:text-gray-50'>{plan.price}</span>
											{plan.name !== 'Enterprise' && <span className='text-sm font-medium'>/month</span>}
										</div>
										<ul className='mt-4 space-y-2'>
											{plan.features.map((feature) => (
												<li key={feature} className='flex items-center'>
													<CheckCircle className='text-green-500 mr-2 h-4 w-4' />
													{feature}
												</li>
											))}
										</ul>
									</div>
									<Button className='mt-6' variant={plan.name === 'Pro' ? 'default' : 'outline'}>
										{plan.name === 'Enterprise' ? 'Contact Sales' : 'Get Started'}
									</Button>
								</div>
							))}
						</div>
					</div>
				</section>
				<section id='contact' className='w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800'>
					<div className='container px-4 md:px-6'>
						<div className='flex flex-col items-center space-y-4 text-center'>
							<div className='space-y-2'>
								<H2 className='text-3xl font-bold tracking-tighter sm:text-5xl'>Ready to Get Started?</H2>
								<p className='max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400'>
									Join thousands of businesses already using our platform. Sign up for a free trial today.
								</p>
							</div>
							<div className='w-full max-w-sm space-y-2'>
								<form className='flex space-x-2'>
									<Input className='max-w-lg flex-1' placeholder='Enter your email' type='email' />
									<Button type='submit'>Sign Up</Button>
								</form>
								<p className='text-xs text-gray-500 dark:text-gray-400'>
									By signing up, you agree to our{' '}
									<Link className='underline underline-offset-2' href='#'>
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

'use client';

import * as React from 'react';

import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import {cn} from '@/lib/utils';

interface Props {
	id: string;
}

const FloatNavMenu: React.FC<Props> = ({id}) => {
	return (
		<NavigationMenu>
			<NavigationMenuList>
				<NavigationMenuItem>
					<NavigationMenuTrigger>Float Management</NavigationMenuTrigger>
					<NavigationMenuContent>
						<ul className='grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]'>
							<li className='row-span-3'>
								<NavigationMenuLink asChild>
									<a
										className='flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md'
										href='/'>
										{/* <Icons.logo className='h-6 w-6' />
										<div className='mb-2 mt-4 text-lg font-medium'>shadcn/ui</div> */}
										<p className='text-sm leading-tight text-muted-foreground'>
											Efficiently manage your M-Pesa Float. Streamline tracking, reporting, and approvals for optimal financial
											control.
										</p>
									</a>
								</NavigationMenuLink>
							</li>
							<ListItem href={`/store/float/${id}`} title='Float Top Ups'>
								Record and track all float top ups made to your M-Pesa Float account.
							</ListItem>
							<ListItem href={`/store/float/transactions/${id}`} title='Transactions'>
								Record and track all transactions made from your M-Pesa Float account.
							</ListItem>
						</ul>
					</NavigationMenuContent>
				</NavigationMenuItem>
				{/* <NavigationMenuItem>
					<NavigationMenuTrigger>Components</NavigationMenuTrigger>
					<NavigationMenuContent>
						<ul className='grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] '>
							{components.map((component) => (
								<ListItem key={component.title} title={component.title} href={component.href}>
									{component.description}
								</ListItem>
							))}
						</ul>
					</NavigationMenuContent>
				</NavigationMenuItem>
				<NavigationMenuItem>
					<Link href='/docs' legacyBehavior passHref>
						<NavigationMenuLink className={navigationMenuTriggerStyle()}>Documentation</NavigationMenuLink>
					</Link>
				</NavigationMenuItem> */}
			</NavigationMenuList>
		</NavigationMenu>
	);
};

const ListItem = React.forwardRef<React.ElementRef<'a'>, React.ComponentPropsWithoutRef<'a'>>(
	({className, title, children, ...props}, ref) => {
		return (
			<li>
				<NavigationMenuLink asChild>
					<a
						ref={ref}
						className={cn(
							'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
							className
						)}
						{...props}>
						<div className='text-sm font-medium leading-none'>{title}</div>
						<p className='line-clamp-2 text-sm leading-snug text-muted-foreground'>{children}</p>
					</a>
				</NavigationMenuLink>
			</li>
		);
	}
);
ListItem.displayName = 'ListItem';

export default FloatNavMenu;

'use client';
import {
	Menubar,
	MenubarContent,
	MenubarItem,
	MenubarMenu,
	MenubarSeparator,
	MenubarSub,
	MenubarSubContent,
	MenubarSubTrigger,
	MenubarTrigger,
} from '@/components/ui/menubar';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {FC} from 'react';

interface Props {
	id: string;
	teamId?: string;
}

export const MpesaMenuBar: FC<Props> = ({id, teamId}) => {
	const pathName = usePathname();

	return (
		<Menubar>
			<MenubarMenu>
				<MenubarTrigger>
					<span
						className={`text-sm font-medium ${
							pathName.includes(`/store/float`) ? 'text-primary' : 'text-muted-foreground'
						} transition-colors hover:text-primary`}>
						Float Management
					</span>
				</MenubarTrigger>
				<MenubarContent>
					{teamId ? (
						<MenubarItem>
							<Link href={`/teams/float/${teamId}`}>Record Daily Float Balance</Link>
						</MenubarItem>
					) : (
						<>
							<MenubarItem>
								<Link href={`/store/float/${id}`}>Top Ups</Link>
							</MenubarItem>
							<MenubarItem>
								<Link href={`/store/float/transactions/${id}`}>Approve Transactions</Link>
							</MenubarItem>
						</>
					)}

					<MenubarSeparator />
					<MenubarSub>
						<MenubarSubTrigger>Statements</MenubarSubTrigger>
						<MenubarSubContent>
							<MenubarItem>
								<Link href={teamId ? `/teams/statements/cash/${teamId}` : `/store/statements/cash/${id}`}>Cash At Hand</Link>
							</MenubarItem>
							<MenubarItem>
								<Link href={teamId ? `/teams/statements/float/${teamId}` : `/store/statements/float/${id}`}>Float</Link>
							</MenubarItem>
						</MenubarSubContent>
					</MenubarSub>
					<MenubarSeparator />
				</MenubarContent>
			</MenubarMenu>
		</Menubar>
	);
};

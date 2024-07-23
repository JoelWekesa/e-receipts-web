'use client';

import {CaretSortIcon, CheckIcon, PlusCircledIcon} from '@radix-ui/react-icons';
import * as React from 'react';

import {cn} from '@/lib/utils';
import {Store} from '@/models/store';
import {MemberTeam} from '@/models/teams/member-team';
import {Permission} from '@/models/teams/permissions';
import {useSession} from 'next-auth/react';
import {usePathname, useRouter} from 'next/navigation';
import AddTeamComponent from '../teams/add/add-team';
import {Avatar, AvatarFallback, AvatarImage} from '../ui/avatar';
import {Button} from '../ui/button';
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator,
} from '../ui/command';
import {Dialog, DialogTrigger} from '../ui/dialog';
import {Popover, PopoverContent, PopoverTrigger} from '../ui/popover';
const groupsP = [
	{
		label: 'Personal Account',
		teams: [
			{
				label: 'Alicia Koch',
				value: 'personal',
			},
		],
	},
	{
		label: 'Teams',
		teams: [
			{
				label: 'Acme Inc.',
				value: 'acme-inc',
			},
			{
				label: 'Monsters Inc.',
				value: 'monsters',
			},
		],
	},
];

type Team = (typeof groupsP)[number]['teams'][number];

type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>;

interface TeamSwitcherProps extends PopoverTriggerProps {
	teams: MemberTeam[];
	stores: Store[];
	permissions: Permission[];
}

export default function TeamSwitcher({className, teams, stores, permissions}: TeamSwitcherProps) {
	const {data: user} = useSession();

	const fTeams: Team[] = React.useMemo(() => {
		return teams.map((team) => {
			return {
				label: team.team.name + ' - ' + team.team.store.displayName,
				value: team.teamId,
			};
		});
	}, [teams]);

	const groups = [
		{
			label: 'Personal Account',
			teams: [
				{
					label: user?.name || 'Team Switcher',
					value: 'personal',
				},
			],
		},
		{
			label: 'Teams',
			teams: fTeams,
		},
	];
	const [open, setOpen] = React.useState(false);
	const [showNewTeamDialog, setShowNewTeamDialog] = React.useState(false);
	const [selectedTeam, setSelectedTeam] = React.useState<Team>(groups[0].teams[0]);

	const pathName = usePathname();
	const router = useRouter();

	React.useEffect(() => {
		const regex = /^\/teams(\/|$)/;

		if (regex.test(pathName)) {
			const l = pathName.split('/').length;
			const teamId = pathName.split('/')[l - 1];

			if (teamId) {
				const team = fTeams.find((t) => t.value === teamId);
				if (team) {
					setSelectedTeam(team);
				}
			}
		}
	}, [pathName, fTeams]);

	const handleRedirect = (value: string) => {
		if (value === 'personal') {
			router.push('/dashboard');
		} else {
			router.push(`/teams/${value}`);
		}
	};

	return (
		<Dialog open={showNewTeamDialog} onOpenChange={setShowNewTeamDialog}>
			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger asChild>
					<Button
						variant='outline'
						role='combobox'
						aria-expanded={open}
						aria-label='Select a team'
						className={cn('w-[200px] justify-between', className)}>
						<Avatar className='mr-2 h-5 w-5'>
							<AvatarImage src={user?.picture || user?.image || ''} alt={selectedTeam.label} className='grayscale' />
							<AvatarFallback>{user?.name?.slice(0, 1)}</AvatarFallback>
						</Avatar>
						{selectedTeam.label}
						<CaretSortIcon className='ml-auto h-4 w-4 shrink-0 opacity-50' />
					</Button>
				</PopoverTrigger>
				<PopoverContent className='w-[200px] p-0'>
					<Command>
						<CommandList>
							<CommandInput placeholder='Search team...' />
							<CommandEmpty>No team found.</CommandEmpty>

							{groups.map((group) => (
								<CommandGroup key={group.label} heading={group.label}>
									{group.teams.map((team) => (
										<CommandItem
											key={team.value}
											onSelect={() => {
												setSelectedTeam(team);
												setOpen(false);
												handleRedirect(team.value);
											}}
											className='text-sm'>
											<Avatar className='mr-2 h-5 w-5'>
												<AvatarImage src={`https://avatar.vercel.sh/${team.value}.png`} alt={team.label} className='grayscale' />
												<AvatarFallback>SC</AvatarFallback>
											</Avatar>
											{team.label}
											<CheckIcon
												className={cn('ml-auto h-4 w-4', selectedTeam.value === team.value ? 'opacity-100' : 'opacity-0')}
											/>
										</CommandItem>
									))}
								</CommandGroup>
							))}
						</CommandList>
						<CommandSeparator />
						<CommandList>
							<CommandGroup>
								<DialogTrigger asChild>
									<CommandItem
										onSelect={() => {
											setOpen(false);
											setShowNewTeamDialog(true);
										}}>
										<PlusCircledIcon className='mr-2 h-5 w-5' />
										Create Team
									</CommandItem>
								</DialogTrigger>
							</CommandGroup>
						</CommandList>
					</Command>
				</PopoverContent>
			</Popover>
			<AddTeamComponent stores={stores} permissions={permissions} close={() => setShowNewTeamDialog(false)} />
		</Dialog>
	);
}

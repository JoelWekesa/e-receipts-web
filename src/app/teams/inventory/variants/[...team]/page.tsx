import {options} from '@/app/api/auth/[...nextauth]/options';
import ViewProductVariantsComponent from '@/components/inventory/see/variants';
import TeamInventoryLayout from '@/components/inventory/team-inventory-layout';
import {getInventory} from '@/services/page/inventory/get';
import {getInventoryOptions} from '@/services/page/inventory/variants/options';
import {getServerSession} from 'next-auth';

const InventoryVariantsPage = async (props: {params: Promise<{team: string[]}>}) => {
    const params = await props.params;
    const session = await getServerSession(options);

    const token = session?.accessToken || '';

    const {team} = params;

    const teamId = team[0];

    const id = team[1];

    const [inventory, opts] = await Promise.all([getInventory({id, token}), getInventoryOptions({id, token})]);

    return (
		<div className='flex-1 space-y-4 p-8 pt-1'>
			<TeamInventoryLayout teamId={teamId}>
				<ViewProductVariantsComponent inventory={inventory} options={opts} isTeam={true} teamId={teamId} />
			</TeamInventoryLayout>
		</div>
	);
};

export default InventoryVariantsPage;

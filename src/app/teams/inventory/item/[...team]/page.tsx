import {options} from '@/app/api/auth/[...nextauth]/options';
import ViewProductComponent from '@/components/inventory/see';
import TeamInventoryLayout from '@/components/inventory/team-inventory-layout';
import {getInventory} from '@/services/page/inventory/get';
import {getInventoryTotal} from '@/services/page/inventory/total';
import {getInventoryOptions} from '@/services/page/inventory/variants/options';
import {getServerSession} from 'next-auth';

const InventoryItemPage = async ({params}: {params: {team: string[]}}) => {
	const {team} = params;

	const teamId = team[0];

	const id = team[1];

	const session = await getServerSession(options);

	const token = session?.accessToken || '';

	const [inventory, data, total] = await Promise.all([
		getInventory({id, token}),
		getInventoryOptions({id, token}),
		getInventoryTotal({id, token}),
	]);

	return (
		<div className='flex-1 space-y-4 p-8 pt-1'>
			<TeamInventoryLayout teamId={teamId}>
				<ViewProductComponent inventory={inventory} data={data} total={total} isTeam={true} teamId={teamId} />
			</TeamInventoryLayout>
		</div>
	);
};

export default InventoryItemPage;

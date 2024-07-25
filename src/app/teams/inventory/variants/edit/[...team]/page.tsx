import {options} from '@/app/api/auth/[...nextauth]/options';
import EditVariantComponent from '@/components/inventory/edit-variant';
import TeamInventoryLayout from '@/components/inventory/team-inventory-layout';
import {getInventory} from '@/services/page/inventory/get';
import {getVariant} from '@/services/page/inventory/variants/get';
import {getInventoryOptions} from '@/services/page/inventory/variants/options';
import {getServerSession} from 'next-auth';

const EditVariantPage = async ({params}: {params: {team: string[]}}) => {
	const session = await getServerSession(options);

	const token = session?.accessToken || '';

	const {team} = params;

	const teamId = team[0];

	const id = team[1];

	const variant = await getVariant({id, token});

	const [opts, inventory] = await Promise.all([
		getInventoryOptions({id: variant.inventoryId, token}),
		getInventory({id: variant.inventoryId, token}),
	]);

	return (
		<div className='flex-1 space-y-4 p-8 pt-1'>
			<TeamInventoryLayout teamId={teamId}>
				<EditVariantComponent variant={variant} options={opts} inventory={inventory} />
			</TeamInventoryLayout>
		</div>
	);
};

export default EditVariantPage;

import {FC} from 'react';
import AddVariant from './add-variant';
import SeeProductHeader from './header';
import SeeProductVariants from './variant';
import {Inventory} from '@/models/inventory/inventory';
import {Option} from '@/models/inventory/option';
interface Props {
	inventory: Inventory;
	options: Option[];
	isTeam?: boolean;
	teamId?: string;
}

const ViewProductVariantsComponent: FC<Props> = ({inventory, options, isTeam, teamId}) => {
	return (
		<div className='grid max-w-[59rem] flex-1 auto-rows-max gap-4'>
			<SeeProductHeader hide inventory={inventory} isTeam={isTeam} teamId={teamId} />
			<SeeProductVariants inventory={inventory} isTeam={isTeam} teamId={teamId} />
			{!teamId && <AddVariant options={options} inventory={inventory} />}
		</div>
	);
};

export default ViewProductVariantsComponent;

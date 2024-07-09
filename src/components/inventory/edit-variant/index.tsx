import {variantAtom} from '@/atoms/inventory/variants';
import {useAtom} from 'jotai';
import EditVariant from './form';
import SeeProductHeader from '../see/header';

const EditVariantComponent = () => {
	const [data, _] = useAtom(variantAtom);
	return (
		<div className='gap-4'>
			<div className='my-4'>
				<SeeProductHeader hide />
			</div>
			<EditVariant variant={data!} />
		</div>
	);
};

export default EditVariantComponent;

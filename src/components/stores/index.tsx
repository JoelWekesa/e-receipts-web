import {FC} from 'react';
import AddStore from './add';

const StoreHomeComponent: FC<{token: string}> = ({token}) => {
	return (
		<div className='flex flex-wrap justify-between' suppressHydrationWarning>
			<AddStore token={token} />
		</div>
	);
};

export default StoreHomeComponent;

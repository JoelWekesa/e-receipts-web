import {Store} from '@/models/store';
import GenerateSuperMarketTemplate from './generate';
import SupermarketComponent from './supermarket';
import {FC} from 'react';

export const PreviewBox: FC<{store: Store}> = ({store}) => {
	return (
		<div className='container mx-auto px-4 py-8'>
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4'>
				<div className=' p-4'>
					<GenerateSuperMarketTemplate />
				</div>
				<div className='hidden sm:block lg:block p-4 justify-center items-center'>
					<SupermarketComponent store={store} />
				</div>
			</div>
		</div>
	);
};

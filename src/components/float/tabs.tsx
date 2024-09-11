import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs';
import {CashTopUp} from '@/models/floats/cash-topups';
import {FloatTopUp} from '@/models/floats/top-up';
import {FC} from 'react';
import StoreCashTopUps from './cash-topups';
import StoreFloatTopUps from './topups';

interface Props {
	floatTopUps: FloatTopUp[];
	cashTopUps: CashTopUp[];
}

const TopUpsTabs: FC<Props> = ({floatTopUps, cashTopUps}) => {
	return (
		<Tabs defaultValue='float' className='w-full'>
			<TabsList className='grid grid-cols-2 w-[400px]'>
				<TabsTrigger value='float'>Float Top Ups</TabsTrigger>
				<TabsTrigger value='cash'>Cash Top Ups</TabsTrigger>
			</TabsList>
			<TabsContent value='float'>
				<StoreFloatTopUps topUps={floatTopUps} />
			</TabsContent>
			<TabsContent value='cash'>
				<StoreCashTopUps topUps={cashTopUps} />
			</TabsContent>
		</Tabs>
	);
};

export default TopUpsTabs;

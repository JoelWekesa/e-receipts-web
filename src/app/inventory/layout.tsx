import TimerProvider from '@/providers/timer';
import React, {FC} from 'react';

interface Props {
	children: React.ReactNode;
}

const InventoryLayout: FC<Props> = ({children}) => {
	return <TimerProvider>{children}</TimerProvider>;
};

export default InventoryLayout;

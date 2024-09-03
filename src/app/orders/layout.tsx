import TimerProvider from '@/providers/timer';
import React, {FC, ReactNode} from 'react';
interface Props {
	children: ReactNode;
}

const OrdersLayout: FC<Props> = ({children}) => {
	return <TimerProvider>{children}</TimerProvider>;
};

export default OrdersLayout;

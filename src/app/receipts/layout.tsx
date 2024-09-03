import TimerProvider from '@/providers/timer';
import React, {FC, ReactNode} from 'react';

interface Props {
	children: ReactNode;
}

const ReceiptsLayout: FC<Props> = ({children}) => {
	return <TimerProvider>{children}</TimerProvider>;
};

export default ReceiptsLayout;

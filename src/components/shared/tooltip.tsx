'use client';
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from '@/components/ui/tooltip';
import {FC, ReactNode} from 'react';

interface Props {
	trigger: ReactNode | string;
	content: ReactNode | string;
}

const Tips: FC<Props> = ({trigger, content}) => {
	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger>{trigger}</TooltipTrigger>
				<TooltipContent>{content}</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
};

export default Tips;

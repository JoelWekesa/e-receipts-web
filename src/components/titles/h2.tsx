import {headerText} from '@/lib/fonts';
import {cn} from '@/lib/utils';
import React from 'react';

export interface H1Props extends React.HTMLAttributes<HTMLHeadingElement> {
	className?: string;
}

const H2: React.FC<H1Props> = ({className, ...props}) => {
	return <h2 className={cn(headerText.className, className)} {...props} />;
};

export default H2;

import {headerText} from '@/lib/fonts';
import {cn} from '@/lib/utils';
import React from 'react';

export interface H1Props extends React.HTMLAttributes<HTMLHeadingElement> {
	className?: string;
}

const H1: React.FC<H1Props> = ({className, ...props}) => {
	return <h1 className={cn(headerText.className, className)} {...props} />;
};

export default H1;

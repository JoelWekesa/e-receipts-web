import {headerText} from '@/lib/fonts';
import {cn} from '@/lib/utils';
import React from 'react';

export interface H3Props extends React.HTMLAttributes<HTMLHeadingElement> {
	className?: string;
}

const H3 = React.forwardRef<HTMLHeadingElement, H3Props>(({className, ...props}, ref) => {
	return <h3 ref={ref} className={cn(headerText.className, className)} {...props} />;
});

H3.displayName = 'H3';

export default H3;

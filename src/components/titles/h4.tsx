import {headerText} from '@/lib/fonts';
import {cn} from '@/lib/utils';
import React from 'react';

export interface H3Props extends React.HTMLAttributes<HTMLHeadingElement> {
	className?: string;
}

const H4 = React.forwardRef<HTMLHeadingElement, H3Props>(({className, ...props}, ref) => {
	return <h4 ref={ref} className={cn(headerText.className, className)} {...props} />;
});

H4.displayName = 'H4';

export default H4;

import * as React from 'react';

import {cn} from '@/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	lg?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({className, type, lg, ...props}, ref) => {
	return (
		<input
			type={type}
			className={cn(
				`flex h-9 w-full rounded-md border border-input bg-transparent px-3 ${
					lg ? 'py-7' : 'py-1'
				} text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground ring-1 ring-ring dark:ring-[#a2a2a9] ring-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50`,
				className
			)}
			ref={ref}
			{...props}
		/>
	);
});
Input.displayName = 'Input';

export {Input};

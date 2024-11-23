import React, {FC, ReactNode} from 'react';

const InvoicesLayout: FC<{invoices: ReactNode; total: ReactNode}> = ({invoices, total}) => {
	return (
		<div className='container mx-auto'>
			<div className='my-2'>{total}</div>
			<div className='my-2'>{invoices}</div>
		</div>
	);
};

export default InvoicesLayout;

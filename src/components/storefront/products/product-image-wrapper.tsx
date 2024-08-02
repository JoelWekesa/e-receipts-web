import Image, {ImageProps} from 'next/image';
import React from 'react';

const ProductImageWrapper = (props: ImageProps) => {
	return (
		<div className='aspect-square overflow-hidden bg-neutral-100 dark:bg-neutral-800 rounded-md'>
			<Image {...props} alt='product-image' className='h-full w-full object-contain object-center p-2' />
		</div>
	);
};

export default ProductImageWrapper;

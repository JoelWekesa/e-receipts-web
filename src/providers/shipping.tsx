'use client';

import {Shipping} from '@/models/shipping/shipping';
import useShipping from '@/services/shipping/get';
import {createContext, FC, ReactNode, useContext} from 'react';

interface Props {
	shipping: Shipping | null;
	children: ReactNode;
}

interface Items {
	shipping: Shipping | null;
}

const ShippingContext = createContext<Items>({
	shipping: null,
});

export const useShippingLoaded = () => useContext(ShippingContext);

const ShippingProvider: FC<Props> = ({shipping, children}) => {
	const {data} = useShipping({
		shipping,
	});

	return (
		<ShippingContext.Provider
			value={{
				shipping: data,
			}}>
			{children}
		</ShippingContext.Provider>
	);
};

export default ShippingProvider;

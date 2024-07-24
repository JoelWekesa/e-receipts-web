import React from 'react';

const Shop = ({params}: {params: {id: string}}) => {
	return <div>{JSON.stringify(params)}</div>;
};

export default Shop;

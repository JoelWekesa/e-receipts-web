import {Button} from '@/components/ui/button';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import React from 'react';

const ArchiveProduct = () => {
	return (
		<Card x-chunk='dashboard-07-chunk-5'>
			<CardHeader>
				<CardTitle>Archive Product</CardTitle>
				<CardDescription>Lipsum dolor sit amet, consectetur adipiscing elit.</CardDescription>
			</CardHeader>
			<CardContent>
				<div></div>
				<Button size='sm' variant='secondary'>
					Archive Product
				</Button>
			</CardContent>
		</Card>
	);
};

export default ArchiveProduct;

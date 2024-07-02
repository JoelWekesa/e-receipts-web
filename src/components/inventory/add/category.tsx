import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Label} from '@/components/ui/label';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';
import React from 'react';

const SelectProductCategory = () => {
	return (
		<Card x-chunk='dashboard-07-chunk-2'>
			<CardHeader>
				<CardTitle>Product Category</CardTitle>
			</CardHeader>
			<CardContent>
				<div className='grid gap-6 sm:grid-cols-1'>
					<div className='grid gap-3'>
						<Label htmlFor='category'>Category</Label>
						<Select>
							<SelectTrigger id='category' aria-label='Select category'>
								<SelectValue placeholder='Select category' />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value='clothing'>Clothing</SelectItem>
								<SelectItem value='electronics'>Electronics</SelectItem>
								<SelectItem value='accessories'>Accessories</SelectItem>
							</SelectContent>
						</Select>
					</div>
				</div>
			</CardContent>
		</Card>
	);
};

export default SelectProductCategory;

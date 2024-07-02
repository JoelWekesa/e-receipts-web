import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {Textarea} from '@/components/ui/textarea';

export default function AddProductComponent() {
	return (
		<Card x-chunk='dashboard-07-chunk-0'>
			<CardHeader>
				<CardTitle>Product Details</CardTitle>
				<CardDescription>Add a new product to your store</CardDescription>
			</CardHeader>
			<CardContent>
				<div className='grid gap-6'>
					<div className='grid gap-3'>
						<Label htmlFor='name'>Name</Label>
						<Input id='name' type='text' className='w-full' placeholder='Product Name' />
					</div>
					<div className='grid gap-3'>
						<Label htmlFor='description'>Description</Label>
						<Textarea id='description' placeholder='Give a brief description of your product' className='min-h-32' />
					</div>
				</div>
			</CardContent>
		</Card>
	);
}

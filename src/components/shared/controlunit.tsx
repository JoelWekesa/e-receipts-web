'use client';
import {controlUnitAtom} from '@/atoms/receiptgen/controlunit';
import {zodResolver} from '@hookform/resolvers/zod';
import {useAtom} from 'jotai';
import {ArrowLeft, ArrowRight, Plus} from 'lucide-react';
import {useForm} from 'react-hook-form';
import {z} from 'zod';
import {Button} from '../ui/button';
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '../ui/form';
import {Input} from '../ui/input';
import ListControlItems from './listcontrolunits';
import {navigateAtom, Path} from '@/atoms/receiptgen/navigate';
import {Progress} from '../ui/progress';

const formSchema = z.object({
	title: z.string().min(1, {message: 'Title is required'}),
	value: z.string().min(1, {message: 'Value is required'}),
});

const ControlUnitComponent = () => {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			title: '',
			value: '',
		},
	});

	const [_, setControlUnits] = useAtom(controlUnitAtom);

	const [__, setPath] = useAtom(navigateAtom);

	const handleSubmit = (data: z.infer<typeof formSchema>) => {
		setControlUnits((prev) => [...prev, data]);
		form.reset();
	};

	return (
		<>
			<div className='p-4 pt-0'>
				<Progress value={80} />
			</div>
			<Form {...form}>
				<form className='grid w-full items-start gap-6 overflow-auto p-4 pt-0' onSubmit={form.handleSubmit(handleSubmit)}>
					<fieldset className='grid gap-6 rounded-lg border p-4'>
						<legend className='-ml-1 px-1 text-sm font-medium capitalize'>Control Unit Information</legend>

						<div className='grid gap-3'>
							<FormField
								control={form.control}
								name='title'
								render={({field}) => (
									<FormItem>
										<FormLabel>Control Unit</FormLabel>
										<FormControl>
											<Input placeholder='Add Control Unit' {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<div className='grid gap-3'>
							<FormField
								control={form.control}
								name='value'
								render={({field}) => (
									<FormItem>
										<FormLabel>Control Unit Value</FormLabel>
										<FormControl>
											<Input placeholder='Add Control Unit' {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<div className='grid gap-3'>
							<Button type='submit'>
								{' '}
								<Plus className='mr-2 h-4 w-4' />
								Add Control Unit
							</Button>
						</div>
						<ListControlItems />
					</fieldset>
				</form>
			</Form>

			<div className='flex justify-end items-end p-4 pt-0'>
				<div className='flex flex-row gap-2'>
					<Button onClick={() => setPath(Path.PAYMENT)}>
						<ArrowLeft className='mr-2 h-4 w-4' />
						Prev
					</Button>
					<Button onClick={() => setPath(Path.LOYALTY_POINTS)}>
						<ArrowRight className='mr-2 h-4 w-4' />
						Next
					</Button>
				</div>
			</div>
		</>
	);
};

export default ControlUnitComponent;

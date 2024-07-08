import inventoryAtom from '@/atoms/inventory/inventory';
import optionsAtom, {Option} from '@/atoms/inventory/options';
import PageLoader from '@/components/shared/pageloader';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import useInventoryOptions from '@/services/inventory/options/all';
import {useAtom} from 'jotai';
import {useEffect, useMemo} from 'react';

const SeeProductOptions = () => {
	const [item, _] = useAtom(inventoryAtom);

	const {data = [], isLoading} = useInventoryOptions({inventoryId: item?.inventory?.id || ''});

	const [options, setOptions] = useAtom(optionsAtom);

	const fetchedVariants: Option[] = useMemo(
		() =>
			data.map((item) => ({
				name: item.name,
				id: item.id,
				options: item.options,
			})),
		[data]
	);

	useEffect(() => {
		setOptions(fetchedVariants);
	}, [fetchedVariants, setOptions]);

	if (isLoading) {
		return <PageLoader />;
	}

	return (
		<Card x-chunk='dashboard-07-chunk-0'>
			<CardHeader>
				<CardTitle>Product Options </CardTitle>
				<CardDescription>
					<div>
						Add variations of this product. Offer your customers different options for color, format, size, shape, etc.
					</div>
				</CardDescription>
				<CardContent>
					<div className={`flex flex-col gap-2 min-w-full ${options?.length > 0 ? 'my-8 ' : 'hidden'}`}>
						{options?.map((option) => (
							<div className='flex flex-row gap-2 justify-between' key={option.id}>
								<div className='flex w-[15%]'>{option?.name}</div>
								<div className='flex flex-row flex-wrap gap-2 justify-start w-[75%]'>
									{option.options.map((item, index) => (
										<div
											className='inline-flex items-center rounded bg-primary px-3 py-2 text-xs font-medium text-primary-foreground mr-1 mb-1'
											key={index}>
											<span>{item}</span>
										</div>
									))}
								</div>
							</div>
						))}
					</div>
				</CardContent>
			</CardHeader>
		</Card>
	);
};

export default SeeProductOptions;

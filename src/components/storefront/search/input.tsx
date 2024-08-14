'use client';

import {Input} from '@/components/ui/input';
import {useDebouncedValue} from '@/lib/hooks';
import {cn} from '@/lib/utils';
import {usePathname, useRouter, useSearchParams} from 'next/navigation';
import {FC, useEffect, useState} from 'react';

interface Props {
	placeholder: string;
	shop: string;
}

const inputClasses = cn(
	'min-w-14 md:max-w-full appearance-none rounded-md border py-2 pl-4 pr-10 md:pl-2 md:pr-8 lg:pl-4 lg:pr-10 transition-opacity inline-block'
);

export const SearchInput: FC<Props> = ({placeholder, shop}) => {
	const searchParams = useSearchParams();
	const pathname = usePathname();
	const router = useRouter();

	const searchParamQuery = searchParams.get('q') ?? '';

	const [query, setQuery] = useState(searchParamQuery);
	const [_isQueryPending, debouncedQuery] = useDebouncedValue(query, 100);

	useEffect(() => {
		router.prefetch(`/${shop}/search?q=${encodeURIComponent(query)}`);
	}, [query, router, shop]);

	useEffect(() => {
		if (debouncedQuery) {
			router.push(`/shop/${shop}/search?q=${encodeURIComponent(query)}`, {scroll: false});
		}
	}, [debouncedQuery, query, router, shop]);

	useEffect(() => {
		if (pathname === `/shop/${shop}/search` && !query) {
			router.push(`/shop/${shop}`, {scroll: true});
		}
	}, [pathname, query, router, shop]);

	useEffect(() => {
		if (pathname !== `/shop/${shop}/search`) {
			setQuery('');
		}
	}, [pathname, shop]);

	return (
		<Input
			onChange={(e) => {
				const query = e.target.value;
				setQuery(query);
			}}
			className={inputClasses}
			placeholder={placeholder}
			type='search'
			enterKeyHint='search'
			name='search'
			value={query}
		/>
	);
};

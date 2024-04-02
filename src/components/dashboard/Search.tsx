'use client';
import {useAtom} from 'jotai';
import {Input} from '../ui/input';
import {searchAtom} from '@/atoms/search';

export function Search() {
	const [_, setSearch] = useAtom(searchAtom);
	const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearch(event.target.value);
	};

	return (
		<div>
			<Input type='search' placeholder='Search...' className='md:w-[100px] lg:w-[300px]' onChange={handleSearch} />
		</div>
	);
}

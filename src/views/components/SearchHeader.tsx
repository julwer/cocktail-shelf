import IconInput from './IconInput';
import { useEffect, useState } from 'react';
import { Nav } from './Nav';

type SearchHeaderProps = {
	onSearch: (query: string) => void;
};

export function SearchHeader({ onSearch }: SearchHeaderProps) {
	const [searchInputValue, setSearchInputValue] = useState('');
	const [debouncedValue, setDebouncedValue] = useState('');

	const handleSearch = () => {
		onSearch(searchInputValue);
	};

	useEffect(() => {
		const timer = setTimeout(() => {
			setDebouncedValue(searchInputValue);
		}, 500);
		return () => clearTimeout(timer);
	}, [searchInputValue, debouncedValue]);

	useEffect(() => {
		onSearch(debouncedValue);
	}, [debouncedValue, onSearch]);

	return (
		<header className='flex flex-row items-center py-3 px-4 min-h-14'>
			<Nav>
				<IconInput
					placeholder='Search...'
					inputClassName='bg-white border border-outline border-solid placeholder:text-second-txt transition delay-150 focus:outline-none focus:border-2 focus:border-primary mx-4 py-1 pl-4 text-m'
					inputWidth='auto'
					trailingIcon='Search'
					trailingSpanClass='py-1 pr-6 hover:text-primary'
					button={true}
					onSubmit={handleSearch}
					onTrailingIconClick={handleSearch}
					onChangeEvent={(event) => setSearchInputValue(event.target.value)}
				/>
			</Nav>
		</header>
	);
}

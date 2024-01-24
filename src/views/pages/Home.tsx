import { useState } from 'react';
import { useGetCocktailsQuery } from '../../app/api/apiSlice';
import { SearchHeader } from '../UI/SearchHeader';
import { CocktailList } from '../components/CocktailList';
import { LoadingIndicator } from '../UI/LoadingIndicator';
import { CocktailItem } from '../components/CocktailItem';

export function HomePage() {
	const [query, setQuery] = useState<string>('');
	const { data, isLoading } = useGetCocktailsQuery({ query });

	const onSearch = (query: string) => {
		setQuery(query);
	};

	return (
		<div className=''>
			{/* <SearchHeader onSearch={onSearch} /> */}
			<main className='flex flex-col items-center w-[100vw] h-[100vh] md:w-full '>
				{isLoading && <LoadingIndicator />}
				<CocktailList cocktails={data} btns={false} />
			</main>
		</div>
	);
}

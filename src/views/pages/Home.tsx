import { useState } from 'react';
import { useGetCocktailsQuery } from '../../app/api/apiSlice';
import { SearchHeader } from '../components/SearchHeader';
import { CocktailList } from '../components/CocktailList';

export function HomePage() {
	const [query, setQuery] = useState<string>('');
	const { data, isLoading } = useGetCocktailsQuery({ query });

	const onSearch = (query: string) => {
		setQuery(query);
	};

	return (
		<div>
			<SearchHeader onSearch={onSearch} />
			<main>
				{isLoading && <p>Cocktails are being fetched...</p>}
				<CocktailList cocktails={data} deleteBtn={false}/>
			</main>
		</div>
	);
}

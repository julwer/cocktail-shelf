import { useState } from 'react';
import { useGetCocktailsQuery } from '../../app/api/apiSlice';
import { SearchHeader } from '../UI/SearchHeader';
import { CocktailList } from '../components/CocktailList';
import { LoadingIndicator } from '../UI/LoadingIndicator';

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
				{isLoading && <LoadingIndicator />}
				<CocktailList cocktails={data} btns={false} />
			</main>
		</div>
	);
}

import { useState } from 'react';
import {
	useDeleteCocktailMutation,
	useGetCocktailsQuery,
} from '../../app/api/apiSlice';
import { getOwnerId } from '../../authService';
import { Snackbar } from '../UI/Snackbar';
import { CocktailList } from '../components/CocktailList';
import { Header } from '../UI/Header';
import { SearchHeader } from '../UI/SearchHeader';

export function YourCocktails() {
	const ownerId: string | undefined = getOwnerId();
	const [query, setQuery] = useState<string>('');
	const { data, isLoading, refetch } = useGetCocktailsQuery({ ownerId, query });
	const [deleteCocktail, { isSuccess }] = useDeleteCocktailMutation();

	if (isSuccess) {
		refetch();
	}

	return (
		<>
			<SearchHeader onSearch={(query: string) => setQuery(query)} />
			{isLoading ? (
				<p>Loading...</p>
			) : (
				<main>
					{isSuccess && (
						<Snackbar message='Cocktail has been removed.' iconName='done' />
					)}
					<CocktailList
						cocktails={data}
						deleteBtn={true}
						deleteCocktail={deleteCocktail}
					/>
				</main>
			)}
		</>
	);
}

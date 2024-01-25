import { useState } from 'react';
import {
	useDeleteCocktailMutation,
	useGetCocktailsQuery,
} from '../../app/api/apiSlice';
import { getOwnerId } from '../../authService';
import { Snackbar } from '../UI/Snackbar';
import { CocktailList } from '../components/CocktailList';
import { SearchHeader } from '../UI/SearchHeader';
import { LoadingIndicator } from '../UI/LoadingIndicator';
import { MobileMenu } from '../UI/MobileMenu';

export function YourCocktailsPage() {
	const ownerId: string | undefined = getOwnerId();
	const [query, setQuery] = useState<string>('');
	const { data, isLoading, refetch } = useGetCocktailsQuery({ ownerId, query });
	const [deleteCocktail, { isSuccess }] = useDeleteCocktailMutation();

	if (isSuccess) {
		refetch();
	}

	function editCocktail() {}

	return (
		<>
			{/* <SearchHeader onSearch={(query: string) => setQuery(query)} /> */}
			<MobileMenu searchInput={true}></MobileMenu>
			{isLoading ? (
				<LoadingIndicator />
			) : (
				<main className='flex justify-center'>
					{isSuccess && (
						<Snackbar
							message='Cocktail has been removed.'
							iconName='done'
							className='top-[5%]'
						/>
					)}
					<CocktailList
						cocktails={data}
						btns={true}
						deleteCocktail={deleteCocktail}
						editCocktail={editCocktail}
					/>
				</main>
			)}
		</>
	);
}

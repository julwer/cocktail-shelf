import { useEffect, useState } from 'react';
import {
	useDeleteCocktailMutation,
	useGetCocktailsQuery,
} from '../../app/api/apiSlice';
import { getOwnerId } from '../../utils/authService';
import { Snackbar } from '../UI/Universal/Snackbar';
import { CocktailList } from '../components/DisplayCocktail/CocktailList';
import { SearchHeader } from '../UI/Universal/SearchHeader';
import { LoadingIndicator } from '../UI/Universal/LoadingIndicator';
import { MobileHeader } from '../UI/Mobile/MobileHeader';
import { isMobile } from '../../utils/checkWindowWidth';
import { useScreenWidth } from '../../hooks/useScreenWidth';

export function YourCocktailsPage() {
	const ownerId: string | undefined = getOwnerId();
	const [query, setQuery] = useState<string>('');
	const { data, isLoading, refetch } = useGetCocktailsQuery({ ownerId, query });
	const [deleteCocktail, { isSuccess }] = useDeleteCocktailMutation();

	const windowWidth: number = useScreenWidth();

	useEffect(() => {
		if (isSuccess) {
			refetch();
		}
	}, [isSuccess, refetch]);

	function onSearch(query: string) {
		setQuery(query);
	}

	function editCocktail() {}

	return (
		<>
			{isLoading && <LoadingIndicator />}
			{isMobile(windowWidth) ? (
				<MobileHeader searchInput={true} onSearch={onSearch} />
			) : (
				<SearchHeader onSearch={onSearch} />
			)}
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
		</>
	);
}

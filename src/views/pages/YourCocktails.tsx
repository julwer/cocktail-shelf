import { useGetCocktailsQuery } from '../../app/api/apiSlice';
import { getOwnerId } from '../../authService';
import { CocktailList } from '../components/CocktailList';
import { Header } from '../components/Header';

export function YourCocktails() {
	const ownerId: string | undefined = getOwnerId();
	console.log(ownerId);
	const { data, isLoading } = useGetCocktailsQuery({ ownerId });

	//co trzeba wysłac aby dostać drinki wg usera
	return (
		<>
			<Header />
			<main>
				<CocktailList cocktails={data} />
			</main>
		</>
	);
}

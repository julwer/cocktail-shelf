import { useGetCocktailsQuery } from '../../app/api/logInApiSlice';
import { CocktailItem } from '../components/CocktailItem';

export function HomePage() {
	const { data, isLoading } = useGetCocktailsQuery();
	const cocktailArray = data;
	return (
		<div>
			<main className=''>
				{isLoading && <p>Cocktails are being fetched...</p>}
				<ul className='list-none p0 flex flex-wrap w-2/3 mx-auto'>
					{cocktailArray &&
						cocktailArray!.map((cocktail: any) => {
							return (
								<li key={cocktail.id}>
									<CocktailItem
										name={cocktail.name}
										description={cocktail.description}
										ingredients={cocktail.ingredients}
										id={cocktail.id}
										imageUrl={cocktail.imageUrl}
									/>
								</li>
							);
						})}
				</ul>
			</main>
		</div>
	);
}

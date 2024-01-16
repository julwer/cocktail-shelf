import { CocktailModel } from '../../types/cocktailModel';
import { CocktailItem } from './CocktailItem';

export type CocktailListProps = {
	cocktails: CocktailModel[] | undefined;
};

export function CocktailList({ cocktails }: CocktailListProps) {
	return (
		<ul className='list-none p0 flex flex-wrap w-2/3 mx-auto justify-center'>
			{!cocktails || cocktails.length === 0 ? (
				<p>We don't have cocktail that you're looking for.</p>
			) : (
				cocktails!.map((cocktail: any) => {
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
				})
			)}
		</ul>
	);
}

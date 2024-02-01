import { CocktailModel } from '../../../types/cocktailModel';
import { CocktailItem } from './CocktailItem';
import { NoCocktailsError } from './NoCocktailsError';

export type CocktailListProps = {
	cocktails: CocktailModel[] | undefined;
	btns: boolean;
	deleteCocktail?: (id: string) => void;
	editCocktail?: () => void | undefined;
};

export function CocktailList({
	cocktails,
	btns,
	editCocktail,
	deleteCocktail,
}: CocktailListProps) {
	return (
		<>
			{!cocktails ||
				(cocktails.length === 0 ? (
					<NoCocktailsError />
				) : (
					<ul className='list-none flex flex-col md:flex-row md:flex-wrap md:justify-center md:w-2/3'>
						{cocktails &&
							cocktails.length > 0 &&
							cocktails!.map((cocktail: any) => {
								return (
									<li key={cocktail.id}>
										<CocktailItem
											name={cocktail.name}
											id={cocktail.id}
											imageUrl={cocktail.imageUrl}
											btns={btns}
											deleteCocktail={deleteCocktail}
											editCocktail={editCocktail}
										/>
									</li>
								);
							})}
					</ul>
				))}
		</>
	);
}

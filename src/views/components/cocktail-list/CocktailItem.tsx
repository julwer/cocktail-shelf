import { CocktailCoverImg } from './CocktailCoverImg';
import { YourCocktailsActions } from './YourCocktailsActions';
import { CocktailName } from './CocktailName';

export type CocktailItemProps = {
	imageUrl: string;
	name: string;
	id: string;
	btns: boolean;
	deleteCocktail?: ((id: string) => void) | undefined;
	editCocktail?: () => void | undefined;
};

export function CocktailItem({
	imageUrl,
	name,
	id,
	btns,
	deleteCocktail,
	editCocktail,
}: CocktailItemProps) {
	return (
		<section className='my-1 flex flex-col items-center'>
			<div className='h-64 w-64 md:h-48 md:w-48 my-1 md:my-2 md:mx-4'>
				<CocktailCoverImg id={id} imageUrl={imageUrl} name={name} />
				{btns && (
					<YourCocktailsActions
						deleteCocktail={deleteCocktail}
						editCocktail={editCocktail}
						id={id}
					/>
				)}
			</div>
			<CocktailName id={id} name={name} />
		</section>
	);
}

import { CocktailModel } from '../../types/cocktailModel';
import MainText from '../UI/MainText';
import { CocktailItem } from './CocktailItem';
import catImg from '../../images/hiddencat.jpg';

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
				(cocktails.length === 0 && (
					<main className='flex flex-col items-center h-full w-full m-8'>
						<MainText
							h1Txt='We could not find any cocktails.'
							h2Txt='Try to create a new one!'
							h2ClassName='text-main-txt'
							className='absolute mt-8'
						/>
						<div className='w-1/2 h-1/2 overflow-hidden rounded-xl justify-self-center'>
							<img alt='hidden cat' src={catImg} className='object-cover' />
						</div>
					</main>
				))}
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
		</>
	);
}

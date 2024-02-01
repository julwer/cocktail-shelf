import { useParams } from 'react-router-dom';
import { useGetCocktailDetailsQuery } from '../../app/api/apiSlice';
import { Header } from '../UI/Universal/Header';
import { LoadingIndicator } from '../UI/Universal/LoadingIndicator';
import { MobileHeader } from '../UI/Mobile/MobileHeader';
import { isMobile } from '../../utils/checkWindowWidth';
import {
	ReactElement,
	JSXElementConstructor,
	ReactNode,
	ReactPortal,
} from 'react';
import { useScreenWidth } from '../../hooks/useScreenWidth';
import defaultCocktailImg from '../../images/defaultCocktail.png';

export function CocktailDetailPage() {
	const { cocktailId } = useParams<{ cocktailId?: string }>();
	const { data, isLoading } = useGetCocktailDetailsQuery(cocktailId!);
	const windowWidth: number = useScreenWidth();

	return (
		<>
			{isLoading && <LoadingIndicator />}
			{isMobile(windowWidth) ? (
				<MobileHeader searchInput={false} />
			) : (
				<Header />
			)}
			{data && (
				<div className='w-full lg:grid lg:grid-cols-2 h-screen text-main-txt'>
					<section className='w-full flex justify-center lg:hidden my-2'>
						<div className='overflow-hidden h-[250px] w-[250px] md:w-[350px] md:h-[350px] rounded-xl lg:self-center '>
							<img
								src={`${
									data.imageUrl === null ? defaultCocktailImg : data.imageUrl
								}`}
								className='w-full h-full object-cover'
								alt='cocktail'
							/>
						</div>
					</section>
					<section className='px-4 lg:px-8 text-justify leading-6'>
						<h1 className='font-bold text-2xl lg:text-3xl py-4 lg:pt-8 md:pb-4'>
							{data.name}
						</h1>
						<p className='text-main-txt'>{data.description}</p>
						<h2 className='font-bold text-xl py-4 lg:pt-8 lg:pb-4'>
							Ingredients
						</h2>
						<ul className='marker:text-main-txt list-outside list-disc px-3 text-main-txt'>
							{data.ingredients?.map(
								(
									ingredient:
										| string
										| number
										| boolean
										| ReactElement<any, string | JSXElementConstructor<any>>
										| Iterable<ReactNode>
										| ReactPortal
										| null
										| undefined
								) => (
									<li key={`${Math.random()}`} className='py-1'>
										{ingredient}
									</li>
								)
							)}
						</ul>
						<h2 className='font-bold text-xl pt-4 lg:pt-8'>Instructions</h2>
						<p className='py-4 text-justify leading-6 lg:pb-8'>
							{data.instructions}
						</p>
					</section>
					<section className='overflow-hidden lg:h-[600px] lg:w-[600px] rounded-xl self-center justify-self-center hidden lg:block lg:ml-12'>
						<img
							src={`${
								data.imageUrl === null ? defaultCocktailImg : data.imageUrl
							}`}
							alt={`${data.name}`}
							className='w-full h-full object-cover'
						/>
					</section>
				</div>
			)}
		</>
	);
}

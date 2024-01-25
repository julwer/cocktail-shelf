import { useParams } from 'react-router-dom';
import { useGetCocktailDetailsQuery } from '../../app/api/apiSlice';
import { Header } from '../UI/Header';
import { LoadingIndicator } from '../UI/LoadingIndicator';
import { MobileMenu } from '../UI/MobileMenu';

export function CocktailDetailPage() {
	const { cocktailId } = useParams<{ cocktailId?: string }>();
	const { data, isLoading } = useGetCocktailDetailsQuery(cocktailId!);
	return (
		<>
			{/* <Header /> */}
			<MobileMenu searchInput={false} />
			{isLoading && <LoadingIndicator />}
			{data && (
				<div className='w-full md:grid md:grid-cols-2 h-screen text-main-txt'>
					<div className='overflow-hidden h-[250px] w-[250px] rounded-xl md:self-center md:hidden'>
						<img
							src={data.imageUrl}
							className='w-full h-full object-cover'></img>
					</div>
					<section className='px-3 md:px-8 text-justify leading-6'>
						<h1 className='font-bold text-2xl md:text-3xl py-4 md:pt-8 md:pb-4'>
							{data.name}
						</h1>
						<p className='text-main-txt'>{data.description}</p>
						<h2 className='font-bold text-xl py-4 md:pt-8 md:pb-4'>
							Ingredients
						</h2>
						<ul className='marker:text-main-txt list-outside list-disc px-3 text-main-txt'>
							{data.ingredients?.map((ingredient) => (
								<li key={`${Math.random()}`} className='py-1'>
									{ingredient}
								</li>
							))}
						</ul>
						<h2 className='font-bold text-xl pt-4 md:pt-8'>Instructions</h2>
						<p className='py-4 text-justify leading-6 md:pb-8'>
							{data.instructions}
						</p>
					</section>
					<section className='overflow-hidden md:h-[600px] md:w-[600px] rounded-xl self-center justify-self-center hidden md:block'>
						<img
							src={`${data.imageUrl}`}
							alt={`${data.name}`}
							className='w-full h-full object-cover'
						/>
					</section>
				</div>
			)}
		</>
	);
}

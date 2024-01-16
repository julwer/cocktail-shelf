import { useParams } from 'react-router-dom';
import { useGetCocktailDetailsQuery } from '../../app/api/apiSlice';
import { Header } from '../components/Header';

export function CocktailDetailPage() {
	const { cocktailId } = useParams<{ cocktailId?: string }>();
	const { data } = useGetCocktailDetailsQuery(cocktailId!);
	return (
		<>
			<Header />
			{data && (
				<div className='w-full grid grid-cols-2 h-screen'>
					<section className='px-8 text-justify leading-6'>
						<h1 className='font-bold text-secondary text-3xl pt-8 pb-4'>
							{data.name}
						</h1>
						<p className='text-main-txt'>{data.description}</p>
						<h2 className='font-bold text-secondary text-xl pt-8 pb-4'>
							Ingredients
						</h2>
						<ul className='marker:text-primary list-outside list-disc px-3 text-main-txt'>
							{data.ingredients?.map((ingredient) => (
								<li key={`${Math.random()}`} className='py-1'>
									{ingredient}
								</li>
							))}
						</ul>
						<h2 className='font-bold text-secondary text-xl pt-8 pb-4'>
							Instructions
						</h2>
						{/* <p className='px-5 text-justify leading-6 text-main-txt'>{data.instructions}</p> */}
					</section>
					<section className='overflow-hidden h-screen rounded-tl-3xl'>
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

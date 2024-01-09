import { Link } from 'react-router-dom';
import { CocktailModel } from '../../model/cocktailModel';

export function CocktailItem({ img, name, id }: CocktailModel) {

	return (
		<section className='m-4'>
			<Link to={`/home/${id}`}>
				<div className='h-40 w-40 rounded-lg my-2 overflow-hidden'>
					<img src={`${img}`} alt={name} className='w-full h-full object-cover' />
				</div>
				<p className='font-bold text-main-txt text-m hover:underline ml-2'>
					{name}
				</p>
			</Link>
		</section>
	);
}

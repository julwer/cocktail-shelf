import { Link } from 'react-router-dom';

export function CocktailName({ id, name }: { id: string; name: string }) {
	return (
		<Link to={`/${id}`} className='self-center md:self-start'>
			<p className='font-bold w-fit text-main-txt text-m ml-2 text-nowrap hover:underline md:ml-6 '>
				{name}
			</p>
		</Link>
	);
}

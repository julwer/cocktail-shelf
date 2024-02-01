import { Link } from 'react-router-dom';
import defaultCocktailImg from '../../../images/defaultCocktail.png';

interface CocktailCoverImgProps {
	imageUrl: string;
	id: string;
	name: string;
}

export function CocktailCoverImg({
	imageUrl,
	id,
	name,
}: CocktailCoverImgProps) {
	return (
		<Link to={`/${id}`} className='self-center md:self-start'>
			<div className='h-full w-full rounded-lg overflow-hidden box-content'>
				<img
					src={`${imageUrl === null ? defaultCocktailImg : imageUrl}`}
					alt={name}
					className='w-full h-full object-cover'
				/>
			</div>
		</Link>
	);
}

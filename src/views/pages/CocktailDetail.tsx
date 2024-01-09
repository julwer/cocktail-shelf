import { useParams } from 'react-router-dom';

export function CocktailDetailPage() {
	const params = useParams();

	return (
		<div className='bg-primary'>
			<h1>Product details</h1>
			<p>{params.cocktailId}</p>
		</div>
	);
}

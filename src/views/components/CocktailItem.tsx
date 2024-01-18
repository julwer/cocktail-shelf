import { Link } from 'react-router-dom';
import Button from '../UI/Button';

export type CocktailItemProps = {
	imageUrl: string;
	name: string;
	id: string;
	deleteBtn: boolean;
	deleteCocktail?: ((id: string) => void) | undefined;
};

export function CocktailItem({
	imageUrl,
	name,
	id,
	deleteBtn,
	deleteCocktail,
}: CocktailItemProps) {
	function removeCocktail() {
		deleteCocktail!(id);
	}

	return (
		<section className='m-4'>
			<div className='h-47 w-47 my-2 flex flex-row'>
				<div className='h-40 w-40 rounded-lg overflow-hidden box-content'>
					<img
						src={`${imageUrl}`}
						alt={name}
						className='w-full h-full object-cover '
					/>
				</div>
				{deleteBtn && (
					<Button
						className='bg-form/50 w-7 h-7 rounded-md box-content relative left-[-32px] top-2 flex items-center justify-center'
						onClick={removeCocktail}>
						<span className='material-symbols-outlined  text-main-txt'>
							delete
						</span>
					</Button>
				)}
			</div>
			<Link to={`/home/${id}`}>
				<p className='font-bold text-main-txt text-m hover:underline ml-2'>
					{name}
				</p>
			</Link>
		</section>
	);
}

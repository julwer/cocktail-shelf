import { Link } from 'react-router-dom';
import Button from '../UI/Button';

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
				{btns && (
					<div className='box-content relative left-[-64px] top-2 flex flex-row'>
						<Button
							className='bg-form/50 w-7 h-7 rounded-md  flex items-center justify-center hover:text-primary text-main-txt mr-1'
							onClick={removeCocktail}>
							<span className='material-symbols-outlined'>delete</span>
						</Button>
						<Button
							className='bg-form/50 w-7 h-7 rounded-md  flex items-center justify-center hover:text-primary text-main-txt'
							onClick={editCocktail}>
							<span className='material-symbols-outlined'>edit</span>
						</Button>
					</div>
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

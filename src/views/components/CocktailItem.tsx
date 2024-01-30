import { Link, useNavigate } from 'react-router-dom';
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
	const navigate = useNavigate();
	function removeCocktail() {
		deleteCocktail!(id);
	}

	function handleEdit() {
		// editCocktail();
		navigate(`/edit/${id}`);
	}

	return (
		<section className='my-1 flex flex-col items-center'>
			<div className='h-64 w-64 md:h-48 md:w-48 my-1 md:my-2 md:mx-4'>
				<Link to={`/${id}`} className='self-center md:self-start'>
					<div className='h-full w-full rounded-lg overflow-hidden box-content'>
						<img
							src={`${imageUrl}`}
							alt={name}
							className='w-full h-full object-cover'
						/>
					</div>
				</Link>
				{btns && (
					<div className='box-content relative flex flex-row justify-end bottom-[95%] right-2'>
						<Button
							onClick={removeCocktail}
							className='bg-form/50 w-7 h-7 rounded-md flex items-center justify-center hover:text-primary text-main-txt mr-1 '>
							<span className='material-symbols-outlined'>delete</span>
						</Button>
						<Button
							onClick={handleEdit}
							className='bg-form/50 w-7 h-7 rounded-md  flex items-center justify-center hover:text-primary text-main-txt'>
							<span className='material-symbols-outlined'>edit</span>
						</Button>
					</div>
				)}
			</div>
			<Link to={`/${id}`} className='self-center md:self-start'>
				<p className='font-bold w-fit text-main-txt text-m ml-2 text-nowrap hover:underline md:ml-6 '>
					{name}
				</p>
			</Link>
		</section>
	);
}

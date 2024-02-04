import { useNavigate } from 'react-router-dom';
import Button from '../Button';

export function YourCocktailsActions({
	id,
	deleteCocktail,
	editCocktail,
}: {
	id: string;
	deleteCocktail?: ((id: string) => void) | undefined;
	editCocktail?: () => void | undefined;
}) {
	const navigate = useNavigate();
	function removeCocktail() {
		deleteCocktail!(id);
	}

	function handleEdit() {
		// editCocktail();
		navigate(`/edit/${id}`);
	}

	return (
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
	);
}

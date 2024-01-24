import { CocktailForm } from '../components/CocktailForm';
import { Header } from '../UI/Header';

export function CreateCocktailPage() {
	return (
		<div className='flex flex-col'>
			<Header />
			<div className='flex self-center w-1/2 justify-center m-4'>
				<CocktailForm />
			</div>
		</div>
	);
}

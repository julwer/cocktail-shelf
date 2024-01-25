import { CocktailForm } from '../components/CocktailForm';
import { Header } from '../UI/Header';
import { MobileMenu } from '../UI/MobileMenu';

export function CreateCocktailPage() {
	return (
		<div className='flex flex-col'>
			<MobileMenu searchInput={false}/>
			{/* <Header /> */}
			<div className='flex self-center md:w-1/2 justify-center m-4'>
				<CocktailForm />
			</div>
		</div>
	);
}

import { isMobile } from '../../utils/checkWindowWidth';
import { CocktailForm } from '../components/CocktailForm/CocktailForm';
import { Header } from '../UI/Universal/Header';
import { MobileHeader } from '../UI/Mobile/MobileHeader';
import { useScreenWidth } from '../../hooks/useScreenWidth';

export function CreateCocktailPage() {
	const windowWidth: number = useScreenWidth();

	return (
		<div className='flex flex-col'>
			{isMobile(windowWidth) ? (
				<MobileHeader searchInput={false} />
			) : (
				<Header />
			)}
			<div className='flex self-center md:w-1/2 justify-center m-4'>
				<CocktailForm />
			</div>
		</div>
	);
}

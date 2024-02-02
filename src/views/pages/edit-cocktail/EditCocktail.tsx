import { MobileHeader } from '../../components/mobile/MobileHeader';
import inProgressImg from '../../../images/inprogress.gif';
import { isMobile } from '../../../utils/checkWindowSize';
import { Header } from '../../components/Header';
import { useScreenWidth } from '../../../hooks/useScreenWidth';

export function EditCocktailPage() {
	const windowWidth: number = useScreenWidth();
	return (
		<>
			{isMobile(windowWidth) ? (
				<MobileHeader searchInput={false} />
			) : (
				<Header />
			)}
			<p className='m-4 text-center font-bold text-main-txt md:text-3xl md:m-6'>
				Edit page is being developed...
			</p>
			<div className='flex flex-col items-center'>
				<div className='m-4 rounded-md overflow-hidden w-fit h-fit'>
					<img
						src={inProgressImg}
						alt='gif with penguin as builder'
						className='w-fit h-fit object-cover'
					/>
				</div>
			</div>
		</>
	);
}

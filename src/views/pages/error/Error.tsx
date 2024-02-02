import { useScreenWidth } from '../../../hooks/useScreenWidth';
import catImg from '../../../images/hiddencat.jpg';
import { isMobile } from '../../../utils/checkWindowSize';
import { Header } from '../../components/Header';
import MainText from '../../components/MainText';
import { MobileHeader } from '../../components/mobile/MobileHeader';

export function ErrorPage() {
	const windowWidth: number = useScreenWidth();

	return (
		<main className='flex flex-col items-center h-full w-full m-4'>
			{isMobile(windowWidth) ? (
				<MobileHeader searchInput={false} />
			) : (
				<Header />
			)}
			<MainText
				h1Txt='An error occured!'
				h2Txt='Could not find this page!'
				h2ClassName='text-main-txt'
				className='absolute mt-4'
			/>
			<div className='md:w-2/3 w-fulloverflow-hidden rounded-xl justify-self-center'>
				<img alt='hidden cat' src={catImg} className='object-cover' />
			</div>
		</main>
	);
}

import { useScreenWidth } from '../../../hooks/useScreenWidth';
import catImg from '../../../images/hiddencat.jpg';
import { isMobile } from '../../../utils/checkWindowSize';
import { Header } from '../../components/Header';
import MainText from '../../components/MainText';
import { MobileHeader } from '../../components/mobile/MobileHeader';

export function ErrorPage() {
	const windowWidth: number = useScreenWidth();

	return (
		<main>
			{isMobile(windowWidth) ? (
				<MobileHeader searchInput={false} />
			) : (
				<Header />
			)}
			<div className='flex flex-col items-center h-screen m-4'>
				<MainText
					h1Txt='An error occured!'
					h2Txt='Could not find this page!'
					h2ClassName='text-main-txt'
					className='absolute md:mt-24'
				/>
				<div className='md:w-1/2 w-full overflow-hidden rounded-xl justify-self-center md:mt-20'>
					<img alt='hidden cat' src={catImg} className='object-cover' />
				</div>
			</div>
		</main>
	);
}

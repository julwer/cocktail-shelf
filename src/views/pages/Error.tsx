import MainText from '../UI/MainText';
import catImg from '../../img/hiddencat.jpg';

export function ErrorPage() {
	return (
		<main className='flex flex-col items-center h-full w-full m-4'>
			<MainText h1Txt='An error occured!' h2Txt='Could not find this page!'/>
			<div className='w-1/2 h-1/2 overflow-hidden pt-4 '>
				<img src={catImg} alt='hidden cat' className='object-cover' />
			</div>
		</main>
	);
}
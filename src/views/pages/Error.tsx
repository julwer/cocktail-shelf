import catImg from '../../images/hiddencat.jpg';
import MainText from '../UI/MainText';

export function ErrorPage() {
	return (
		<main className='flex flex-col items-center h-full w-full m-4'>
			<MainText h1Txt='An error occured!' h2Txt='Could not find this page!' h2ClassName='text-main-txt' className='absolute mt-4'/>
			<div className='w-2/3 h-2/3 overflow-hidden rounded-xl justify-self-center'>
				<img alt='hidden cat' src={catImg} className='object-cover' />
			</div>
		</main>
	);
}

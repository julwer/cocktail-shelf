import MainText from '../MainText';
import catImg from '../../../images/hiddencat.jpg';

export function NoCocktailsError() {
	return (
		<main className='flex flex-col items-center m-4'>
			<MainText
				h1Txt='We could not find any cocktails'
				h2Txt='Try to create a new one!'
				h2ClassName='text-main-txt mt-2'
				className='md:absolute md:m-8 mb-4  md:w-1/2'
			/>
			<div className='md:w-1/2 overflow-hidden rounded-xl justify-self-center'>
				<img alt='hidden cat' src={catImg} className='object-cover' />
			</div>
		</main>
	);
}

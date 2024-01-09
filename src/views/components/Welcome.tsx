import MainText from '../UI/MainText';
import cocktailImgBig from '../../img/drinks-big.png';

export default function MainWelcome() {
	return (
		<div className='flex flex-col items-center '>
			<img className='w-5/6' src={cocktailImgBig} alt='coctails' />
			<MainText
				h1Txt='Make Some Cocktails'
				h2Txt='Join our community to find some new recipes!'
			/>
		</div>
	);
}

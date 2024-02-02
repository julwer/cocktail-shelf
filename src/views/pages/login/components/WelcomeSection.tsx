import cocktailsImg from '../../../../images/39.jpg';
import MainText from '../../../components/MainText';

export default function WelcomeSection() {
	return (
		<div className='relative'>
			<div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full'>
				<MainText
					h1Txt={'Make Some Cocktails'}
					h2Txt={'Join our community to find some new recipes!'}
					h2ClassName='text-main-txt text-xl pb-4'
					className='rounded-md bg-white/85 '
				/>
			</div>
			<div className='w-full md:h-[100vh] overflow-hidden'>
				<img
					src={cocktailsImg}
					alt='cocktails graphics'
					className='object-cover w-full h-full'
				/>
			</div>
		</div>
	);
}

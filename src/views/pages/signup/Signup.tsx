import MainText from '../../components/MainText';
import logoImg from '../../../images/logo.png'
import { SignupForm } from './components/SignupForm';
import { useScreenHeight } from '../../../hooks/useScreenHeight';
import { heightIsSmall } from '../../../utils/checkWindowSize';

export function SignupPage() {
	const windowHeight: number = useScreenHeight();

	return (
		<>
			<div className={`absolute md:mt-8 md:top-10 flex flex-col items-center w-full mt-20 ${heightIsSmall(windowHeight, 580) && 'hidden'}`}>
				<div className='w-2/3 md:w-1/4 h-fit'>
					<img src={logoImg} alt='logo' className='w-full md:w-full pb-6' />
				</div>
			</div>
			<section className='flex flex-col w-full h-[100vh] justify-center'>
				<MainText
					h1Txt='Welcome!'
					h2Txt='Please enter your account here'
					h2ClassName='mb-4'
					className='my-3'
				/>
				<SignupForm />
			</section>
		</>
	);
}

import LoginPageWelcome from './components/LoginPageWelcome';
import logoImg from '../../../images/logo.png';
import LoginFormSection from './components/LoginFormSection';

export default function LandingPage() {
	return (
		<div className='flex flex-col h-screen w-screen md:flex-row'>
			<div className='md:w-1/2 md:h-full hidden md:inline-block'>
				<LoginPageWelcome />
			</div>
			<div className='absolute mt-20 flex flex-col w-full'>
				<div className='w-full md:w-1/2 md:self-end flex justify-center'>
					<div className='md:w-1/2 h-fit w-2/3 '>
						<img src={logoImg} alt='logo' className='w-full' />
					</div>
				</div>
			</div>
			<div className='h-screen flex flex-col items-center justify-center  md:w-1/2'>
				<LoginFormSection />
			</div>
		</div>
	);
}

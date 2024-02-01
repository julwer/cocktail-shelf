import Welcome from '../components/Landing/Welcome';
import Login from '../components/Landing/Login/Login';
import logoImg from '../../images/logo.png';

export default function LandingPage() {
	return (
		<div className='flex flex-col h-screen w-screen md:flex-row'>
			<div className='md:w-1/2 md:h-full hidden md:inline-block'>
				<Welcome />
			</div>
			<div className='absolute mt-20 flex flex-col w-full'>
				<div className='w-full md:w-1/2 md:self-end flex justify-center'>
					<div className='md:w-1/2 h-fit w-2/3 '>
						<img src={logoImg} alt='logo' className='w-full' />
					</div>
				</div>
			</div>
			<div className='h-screen flex flex-col items-center justify-center  md:w-1/2'>
				<Login />
			</div>
		</div>
	);
}

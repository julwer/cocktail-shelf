import Welcome from '../components/Welcome';
import Login from '../components/Login';
import logoImg from '../../images/logo.png';

export default function LandingPage() {
	return (
		<div className='flex flex-col h-full w-full md:flex-row'>
			<div className='md:w-1/2 md:h-full hidden md:inline-block'>
				<Welcome />
			</div>
			<div className='md:w-1/2 h-[100vh] flex flex-col justify-center'>
				<div>
					<div className='items-center w-full flex flex-col'>
						<img src={logoImg} alt='logo' className='w-1/2 h-fit pb-6' />
					</div>
					<Login />
				</div>
			</div>
		</div>
	);
}

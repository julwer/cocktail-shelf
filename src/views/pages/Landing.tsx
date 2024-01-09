import MainWelcome from '../components/Welcome';
import Login from '../components/Login';

export default function LandingPage() {
	return (
		<div className='grid grid-cols-2 items-center'>
			<div className='col-span-1'>
				<MainWelcome />
			</div>
			<div className='col-span-1 h-fit w-full'>
				<Login />
			</div>
		</div>
	);
}

import { useState } from 'react';
import MainText from '../../../components/MainText';
import { Snackbar } from '../../../components/Snackbar';
import { LoginForm } from './LoginForm';


export default function LoginFormSection() {
	const [isLoginError, setIsLoginError] = useState(false);

	return (
		<>
			<section className='flex flex-col w-full'>
				<MainText
					h1Txt='Welcome Back!'
					h2Txt='Please enter your account here'
					h2ClassName='pb-4'
					className='my-3'
				/>
				{isLoginError && (
					<Snackbar
						message='Invalid email or password, try again!'
						iconName='error'
						className='left-[50%] -translate-x-[50%] top-32 bg-red/90 w-[80%] md:left-[85%] md:-translate-x-[85%]'
						duration={4000}
					/>
				)}
				<LoginForm setIsLoginError={setIsLoginError} />
			</section>
		</>
	);
}

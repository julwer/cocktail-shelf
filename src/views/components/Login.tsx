import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../../app/api/apiSlice';
import { LoginRequest as LoginDataType } from '../../types/apiDataTypes';
import {
	passwordChanged,
	emailChanged,
	setCredentials,
} from '../../app/state/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../UI/Button';
import { setTokens } from '../../authService';
import IconInput from '../UI/IconInput';
import MainText from '../UI/MainText';
import { Snackbar } from '../UI/Snackbar';

export default function Login() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [login, { data, isLoading, isError }] = useLoginMutation();

	const emailInputValue = useSelector((state: any) => state.auth.user.email);
	const passwordInputValue = useSelector(
		(state: any) => state.auth.user.password
	);
	const isAuthenticated = useSelector(
		(state: any) => state.auth.isAuthenticated
	);
	const credentials = useSelector((state: any) => state.auth.credentials);

	const loginData = {
		email: emailInputValue,
		password: passwordInputValue,
	} as LoginDataType;

	const handleEmailChange = (email: string) => {
		dispatch(emailChanged(email));
	};

	const handlePasswordChange = (password: string) => {
		dispatch(passwordChanged(password));
	};

	useEffect(() => {
		if (data) {
			dispatch(setCredentials(data));
		}
	}, [data, dispatch]);

	useEffect(() => {
		if (credentials.accessToken !== '') {
			setTokens(credentials);
		}
	}, [credentials]);

	useEffect(() => {
		if (isAuthenticated) {
			navigate('/home');
		}
	}, [isAuthenticated, navigate]);

	const loginHandler = async (event: any) => {
		event.preventDefault();
		try {
			await login(loginData).unwrap();
		} catch (error) {
			console.error('Login failed:', error);
		}
	};

	const inputClasses =
		'outline outline-form focus:outline-primary focus:outline-3 w-full py-2 px-12';

	return (
		<section className='flex flex-col w-full h-full'>
			<MainText
				h1Txt='Welcome Back!'
				h2Txt='Please enter your account here'
				h2ClassName='pb-4'
			/>
			{isError && (
				<Snackbar
					message='Invalid email or password, try again!'
					iconName='error'
					className='left-[50%] -translate-x-[50%] top-10 bg-red/70 w-[80%]'
					duration={4000}
				/>
			)}
			<form className='flex flex-col items-center' name='loginForm'>
				<IconInput
					placeholder='Email'
					leadingIcon='mail'
					inputClassName={inputClasses}
					leadingSpanClass='top-2 pl-4'
					name='email'
					onChange={handleEmailChange}
					value={emailInputValue}
					inputWidth='[80%]'
					autocomplete='email'
				/>
				<IconInput
					placeholder='Password'
					inputClassName={`${inputClasses} my-5`}
					leadingIcon='lock'
					leadingSpanClass='top-7 pl-4'
					name='password'
					onChange={handlePasswordChange}
					value={passwordInputValue}
					inputWidth='[80%]'
					autocomplete='current-password'
					type='password'
				/>
				<Button
					type='button'
					onClick={loginHandler}
					className='border-none text-white bg-primary w-[80%] py-2 rounded-full cursor-pointer transition ease-in-out delay-150 hover:scale-105'>
					{isLoading ? 'Logging in...' : 'Login'}
				</Button>
				<div className='flex flex-row m-2 text-l'>
					<span className='px-3 text-main-txt'>Don't have any account? </span>
					<Link
						to='/signup'
						className='text-primary font-bold transition ease-in-out delay-150 hover:scale-105'>
						Sign up
					</Link>
				</div>
			</form>
		</section>
	);
}

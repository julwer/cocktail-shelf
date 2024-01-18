import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../../app/api/apiSlice';
import { LoginRequest as LoginDataType } from '../../types/apiDataTypes';
import {
	passwordChanged,
	emailChanged,
	setCredentials,
} from '../../app/state/auth/authSlice';
import { useDispatch, useSelector, connect } from 'react-redux';

import Header from '../UI/MainText';
import Button from '../UI/Button';
import { setTokens } from '../../authService';
import IconInput from '../UI/IconInput';

export default function Login() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [login, { data, isLoading }] = useLoginMutation();

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
		'outline outline-form focus:outline-primary focus:outline-3 w-full py-2 px-12 ';

	return (
		<section className='flex flex-col w-full h-full items-center px-4'>
			<Header
				h1Txt='Welcome Back!'
				h2Txt='Please enter your account here'
				h2ClassName='mb-4'
			/>
			<form
				className='flex flex-col w-full h-fit items-center'
				name='loginForm'>
				<IconInput
					placeholder='Email'
					leadingIcon='mail'
					inputClassName={inputClasses}
					leadingSpanClass='top-2 pl-4'
					name='email'
					onChange={handleEmailChange}
					value={emailInputValue}
					inputWidth='full'
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
					inputWidth='full'
					autocomplete='current-password'
					type='password'
				/>
				<Button
					type='button'
					onClick={loginHandler}
					className='border-none text-white bg-primary w-full py-2 rounded-full cursor-pointer'>
					{isLoading ? 'Logging in...' : 'Login'}
				</Button>
				<div className='flex flex-row m-2 text-l'>
					<span className='px-3'>Don't have any account? </span>
					<Link to='/signup' className='text-primary font-bold'>
						Sign up
					</Link>
				</div>
			</form>
		</section>
	);

	connect()(Login);
}

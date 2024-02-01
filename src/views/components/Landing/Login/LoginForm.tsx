import { useEffect } from 'react';
import Button from '../../../UI/Universal/Button';
import IconInput from '../../../UI/Universal/IconInput';
import { FormToggler } from '../FormToggler';
import { setTokens } from '../../../../utils/authService';
import {
	emailChanged,
	passwordChanged,
	setCredentials,
} from '../../../../app/state/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useLoginMutation } from '../../../../app/api/apiSlice';
import { useNavigate } from 'react-router-dom';
import { LoginRequest as LoginDataType } from '../../../../types/apiDataTypes';

interface LoginFormProps {
    setIsLoginError: (value: boolean) => void; 
}

export function LoginForm({setIsLoginError}: LoginFormProps) {
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

	const loginHandler = async (event: React.SyntheticEvent) => {
		event.preventDefault();
		try {
			await login(loginData).unwrap();
		} catch (error) {
			console.error('Login failed:', error);
		}
	};

	useEffect(() => {
		if (isError) {
			setIsLoginError(true);
		}
	}, [isError, setIsLoginError]);

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

	const inputClasses =
		'outline outline-form focus:outline-primary focus:outline-3 w-full py-2 px-12 ';

	return (
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
			<FormToggler
				question="Don't have any account?"
				linkTo='/signup'
				linkText='Sign up'
			/>
		</form>
	);
}

import { Link, useNavigate } from 'react-router-dom';
import Button from '../UI/Button';
import IconInput from '../UI/IconInput';
import MainText from '../UI/MainText';
import { useDispatch, useSelector } from 'react-redux';
import { useLoginMutation, useRegisterMutation } from '../../app/api/apiSlice';
import {
	emailChanged,
	passwordChanged,
	setCredentials,
} from '../../app/state/auth/authSlice';
import { LoginRequest as SignupDataType } from '../../types/apiDataTypes';
import { useEffect } from 'react';
import { setTokens } from '../../authService';

export function Signup() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [register, { isLoading, isSuccess }] = useRegisterMutation();
	const [login, { data }] = useLoginMutation();

	const emailInputValue = useSelector((state: any) => state.auth.user.email);
	const passwordInputValue = useSelector(
		(state: any) => state.auth.user.password
	);
	const isAuthenticated = useSelector(
		(state: any) => state.auth.isAuthenticated
	);
	const credentials = useSelector((state: any) => state.auth.credentials);

	const signupData = {
		email: emailInputValue,
		password: passwordInputValue,
	} as SignupDataType;

	const handleEmailChange = (email: string) => {
		dispatch(emailChanged(email));
		console.log('email' + email);
	};

	const handlePasswordChange = (password: string) => {
		dispatch(passwordChanged(password));
		console.log('password' + password);
	};

	async function signupHandler(event: React.SyntheticEvent) {
		event.preventDefault();
		await register(signupData);
	}

	useEffect(() => {
		if (isSuccess) {
			login(signupData);
		}
	}, [isSuccess]);

	useEffect(() => {
		if (data) {
			dispatch(setCredentials(data));
			console.log('server response' + data);
		}
	}, [data, dispatch]);

	useEffect(() => {
		if (credentials.accessToken !== '') {
			setTokens(credentials);
		}
		console.log(credentials);
	}, [credentials, setTokens]);

	useEffect(() => {
		if (isAuthenticated) {
			navigate('/home');
		}
	}, [isAuthenticated, navigate]);

	const inputClasses =
		'outline outline-form focus:outline-primary focus:outline-3 w-full py-2 px-12 ';

	return (
		<section className='flex flex-col w-full h-full items-center px-4'>
			<MainText
				h1Txt='Welcome!'
				h2Txt='Please enter your account here'
				h2ClassName='mb-4'
			/>
			<form className='flex flex-col w-1/2 h-fit items-center' name='loginForm'>
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
				<div className='text-main-txt mb-4'>
					<p className='text-l font-bold'>Your password must contain:</p>
					<span className='material-symbols-outlined bg-form text-second-txt font-bold rounded-full text-m flex items-center justify-center w-fit'>
						check
					</span>
					<p className='ml-2 inline'>At least 8 characters.</p>
				</div>
				<Button
					type='button'
					onClick={signupHandler}
					className='border-none text-white bg-primary w-full py-2 rounded-full cursor-pointer'>
					{isLoading ? 'Signing up...' : 'Sign up'}
				</Button>
				<div className='flex flex-row m-2 text-l'>
					<span className='px-3 text-main-txt'>You already have acount? </span>
					<Link to='/' className='text-primary font-bold'>
						Log in
					</Link>
				</div>
			</form>
		</section>
	);
}

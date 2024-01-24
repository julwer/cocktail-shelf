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
import logoImg from '../../images/logo.png';

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

	function passwordValidation(): boolean {
		if (passwordInputValue.length > 7) {
			return true;
		} else {
			return false;
		}
	}

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
		<section className='flex flex-col w-full h-[100vh] justify-center'>
			<div className='flex flex-col items-center w-full'>
				<img src={logoImg} alt='logo' className='w-1/2 md:w-1/4 pb-6' />
			</div>
			<MainText
				h1Txt='Welcome!'
				h2Txt='Please enter your account here'
				h2ClassName='mb-4'
			/>
			<form
				className='flex flex-col self-center items-center md:w-1/2 w-full'
				name='loginForm'>
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
					required={true}
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
					required={true}
				/>
				<div className='text-main-txt mb-4'>
					<p className='text-l font-bold'>Your password must contain:</p>
					<div className='flex m-2'>
						<span
							className={`material-symbols-outlined font-bold rounded-full text-sm w-5 h-5 flex items-center justify-center ${
								passwordValidation()
									? 'bg-primary text-white'
									: 'bg-form text-second-txt'
							}`}>
							check
						</span>
						<p className='ml-2 inline'>At least 8 characters.</p>
					</div>
				</div>
				<Button
					type='button'
					onClick={signupHandler}
					className='border-none text-white bg-primary w-[80%] py-2 rounded-full cursor-pointer transition ease-in-out delay-150 hover:scale-105'>
					{isLoading ? 'Signing up...' : 'Sign up'}
				</Button>
				<div className='flex flex-row m-2 text-l'>
					<span className='px-3 text-main-txt'>Already have an acount? </span>
					<Link
						to='/'
						className='text-primary font-bold transition ease-in-out delay-150 hover:scale-105'>
						Log in
					</Link>
				</div>
			</form>
		</section>
	);
}

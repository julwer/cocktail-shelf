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
import { Snackbar } from '../UI/Snackbar';

export function Signup() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [register, { isLoading, isSuccess, isError }] = useRegisterMutation();
	const [login, { data }] = useLoginMutation();

	const emailInputValue = useSelector((state: any) => state.auth.user.email);
	const passwordInputValue = useSelector(
		(state: any) => state.auth.user.password
	);
	const isAuthenticated = useSelector(
		(state: any) => state.auth.isAuthenticated
	);
	const credentials = useSelector((state: any) => state.auth.credentials);
	const emailRegExp: RegExp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

	const signupData = {
		email: emailInputValue,
		password: passwordInputValue,
	} as SignupDataType;

	const handleEmailChange = (email: string) => {
		dispatch(emailChanged(email));
	};

	const handlePasswordChange = (password: string) => {
		dispatch(passwordChanged(password));
	};

	function passwordIsValid(): boolean {
		if (passwordInputValue.length > 7) {
			return true;
		} else {
			return false;
		}
	}

	const emailIsValid = emailRegExp.test(emailInputValue);

	const signInDataAreValid = passwordIsValid() && emailIsValid;

	async function signupHandler(event: React.SyntheticEvent) {
		event.preventDefault();
		if (signInDataAreValid) {
			await register(signupData);
		}
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
	}, [credentials, setTokens]);

	useEffect(() => {
		if (isAuthenticated) {
			navigate('/home');
		}
	}, [isAuthenticated, navigate]);

	function clearInputs() {
		dispatch(emailChanged(''));
		dispatch(passwordChanged(''));
	}
	const inputClasses =
		'outline outline-form focus:outline-primary focus:outline-3 w-full py-2 px-12 ';

	return (
		<>
			{isError && (
				<Snackbar
					message='Invalid email or password, try again!'
					iconName='error'
					className='left-[50%] -translate-x-[50%] top-24 md:left-[85%] md:-translate-x-[85%] md:top-32 bg-red/70 w-[80%]'
					duration={4000}
				/>
			)}
			<div className='absolute md:mt-8 flex flex-col items-center w-full mt-20'>
				<div className='w-2/3 md:w-1/4 h-fit'>
					<img src={logoImg} alt='logo' className='w-full md:w-full pb-6' />
				</div>
			</div>
			<section className='flex flex-col w-full h-[100vh] justify-center'>
				<MainText
					h1Txt='Welcome!'
					h2Txt='Please enter your account here'
					h2ClassName='mb-4'
					className='my-3'
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
					<div className='text-main-txt'>
						<p className='text-l font-bold inline'>
							Your password must contain:
						</p>
						<div className='flex flex-row'>
							<span
								className={`material-symbols-outlined font-bold rounded-full text-sm w-5 h-5 flex items-center justify-center mb-4 ${
									passwordIsValid()
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
						className='border-none text-white bg-primary w-[80%] py-2 rounded-full cursor-pointer transition ease-in-out delay-150 hover:scale-105 '>
						{isLoading ? 'Signing up...' : 'Sign up'}
					</Button>
					<div className='flex flex-row m-2 text-l'>
						<span className='px-3 text-main-txt'>Already have an acount? </span>
						<Link
							to='/'
							onClick={clearInputs}
							className='text-primary font-bold transition ease-in-out delay-150 hover:scale-105'>
							Log in
						</Link>
					</div>
				</form>
			</section>
		</>
	);
}

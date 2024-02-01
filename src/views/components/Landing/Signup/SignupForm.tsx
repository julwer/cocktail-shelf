import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
	useLoginMutation,
	useRegisterMutation,
} from '../../../../app/api/apiSlice';
import { useEffect, useMemo, useState } from 'react';
import {
	emailChanged,
	passwordChanged,
	setCredentials,
} from '../../../../app/state/auth/authSlice';
import { setTokens } from '../../../../utils/authService';
import IconInput from '../../../UI/Universal/IconInput';
import { ValidateSignupForm } from './ValidateSignupDiv';
import Button from '../../../UI/Universal/Button';
import { FormToggler } from '../FormToggler';

export function SignupForm() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [register, { isLoading, isSuccess }] = useRegisterMutation();
	const [login, { data }] = useLoginMutation();
	const [emailErrorAfterSub, setEmailErrorAfterSub] = useState<boolean>(false);
	const [passwordErrorAfterSub, setPasswordErrorAfterSub] =
		useState<boolean>(false);

	const emailInputValue = useSelector((state: any) => state.auth.user.email);
	const passwordInputValue = useSelector(
		(state: any) => state.auth.user.password
	);
	const isAuthenticated = useSelector(
		(state: any) => state.auth.isAuthenticated
	);
	const credentials = useSelector((state: any) => state.auth.credentials);

	const signupData = useMemo(
		() => ({
			email: emailInputValue,
			password: passwordInputValue,
		}),
		[emailInputValue, passwordInputValue]
	);

	const emailRegExp: RegExp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
	const emailIsInvalid: boolean = !emailRegExp.test(emailInputValue);
	const passwordIsInvalid: boolean = passwordInputValue.length < 8;

	const handleEmailChange = (email: string) => {
		dispatch(emailChanged(email));
	};

	const handlePasswordChange = (password: string) => {
		dispatch(passwordChanged(password));
	};

	async function signupHandler(event: React.SyntheticEvent) {
		event.preventDefault();
		if (!emailIsInvalid && !passwordIsInvalid) {
			return await register(signupData);
		}
		if (emailIsInvalid) {
			setEmailErrorAfterSub(true);
		}
		if (passwordIsInvalid) {
			setPasswordErrorAfterSub(true);
		}
	}

	useEffect(() => {
		if (isSuccess) {
			login(signupData);
		}
	}, [isSuccess, login, signupData]);

	useEffect(() => {
		if (data) {
			dispatch(setCredentials(data));
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

	const inputClasses =
		'outline outline-form focus:outline-primary focus:outline-3 w-full py-2 px-12 ';
	return (
		<form
			className='flex flex-col self-center items-center md:w-1/2 w-full'
			name='signupForm'>
			<IconInput
				placeholder='Email'
				leadingIcon='mail'
				inputClassName={`${inputClasses} ${
					emailErrorAfterSub && emailIsInvalid && 'focus:outline-red outline-red'
				}`}
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
				inputClassName={`${inputClasses} ${
					passwordErrorAfterSub &&
					passwordIsInvalid &&
					'focus:outline-red outline-red'
				} my-5`}
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
			<ValidateSignupForm
				emailErrorAfterSub={emailErrorAfterSub}
				passwordErrorAfterSub={passwordErrorAfterSub}
				emailIsInvalid={emailIsInvalid}
				passwordIsInvalid={passwordIsInvalid}
			/>
			<Button
				type='button'
				onClick={signupHandler}
				className='border-none text-white bg-primary w-[80%] py-2 rounded-full cursor-pointer transition ease-in-out delay-150 hover:scale-105'>
				{isLoading ? 'Signing up...' : 'Sign up'}
			</Button>
			<FormToggler
				question='Already have an account?'
				linkTo='/'
				linkText='Log in'
			/>
		</form>
	);
}

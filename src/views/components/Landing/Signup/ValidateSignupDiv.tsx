import { ValidateSignupElement } from './ValidateSugnupElement';

type ValidateSignupFormProps = {
	emailIsInvalid: boolean;
	passwordIsInvalid: boolean;
	emailErrorAfterSub: boolean;
	passwordErrorAfterSub: boolean;
};

export function ValidateSignupForm({
	emailIsInvalid,
	emailErrorAfterSub,
	passwordErrorAfterSub,
	passwordIsInvalid,
}: ValidateSignupFormProps) {
	return (
		<>
			<ValidateSignupElement
				invalid={emailIsInvalid}
				errorAfterSub={emailErrorAfterSub}
				infoIfCorrect='You have correct email'
				infoIfWrong='Your email is invalid'
			/>
			<ValidateSignupElement
				invalid={passwordIsInvalid}
				errorAfterSub={passwordErrorAfterSub}
				infoIfCorrect='Your password contains at least 8 characters'
				infoIfWrong='Your password contains less than 8 characters'
			/>
		</>
	);
}

import { SignupValidationField } from './ValidateSugnupElement';

type SignupValidationFieldsProps = {
	emailIsInvalid: boolean;
	passwordIsInvalid: boolean;
	emailErrorAfterSub: boolean;
	passwordErrorAfterSub: boolean;
};

export function SignupValidationFields({
	emailIsInvalid,
	emailErrorAfterSub,
	passwordErrorAfterSub,
	passwordIsInvalid,
}: SignupValidationFieldsProps) {
	return (
		<>
			<SignupValidationField
				invalid={emailIsInvalid}
				errorAfterSub={emailErrorAfterSub}
				infoIfCorrect='You have correct email'
				infoIfWrong='Your email is invalid'
			/>
			<SignupValidationField
				invalid={passwordIsInvalid}
				errorAfterSub={passwordErrorAfterSub}
				infoIfCorrect='Your password contains at least 8 characters'
				infoIfWrong='Your password contains less than 8 characters'
			/>
		</>
	);
}

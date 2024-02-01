import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { emailChanged, passwordChanged } from '../../redux/state/authSlice';

type FormToggleProps = {
	question: string;
	linkTo: string;
	linkText: string;
};

export function FormToggler({ question, linkTo, linkText }: FormToggleProps) {
	const dispatch = useDispatch();

	function clearInputs() {
		dispatch(emailChanged(''));
		dispatch(passwordChanged(''));
	}
	return (
		<div className='flex flex-row m-2 text-l'>
			<span className='px-3 text-main-txt'>{question}</span>
			<Link
				to={linkTo}
				className='text-primary font-bold transition ease-in-out delay-150 hover:scale-105'
				onClick={clearInputs}>
				{linkText}
			</Link>
		</div>
	);
}

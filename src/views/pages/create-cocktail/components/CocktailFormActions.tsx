import Button from '../../../components/Button';

export function CocktailFormActions({
	resetInputs,
}: {
	resetInputs: () => void;
}) {
	const buttonClasses: string =
		'p-3 w-32 font-semibold transition delay-120 ease-in-out rounded-full hover:scale-105 ';
	return (
		<div className='flex flex-row'>
			<Button
				type='submit'
				className={`bg-primary text-white m-5 border-none ${buttonClasses}`}>
				Save
			</Button>
			<Button
				type='reset'
				onClick={resetInputs}
				className={`bg-form text-main-txt m-5 border-none ${buttonClasses}`}>
				Reset
			</Button>
		</div>
	);
}

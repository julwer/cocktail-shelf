import { useEffect, useState } from 'react';
import { Input } from '../../UI/Universal/Input';
import { useCreateCocktailMutation } from '../../../app/api/apiSlice';
import { CreateCocktailRequest } from '../../../types/apiDataTypes';
import { HandleIngredients } from './HandleIngredients';
import { useNavigate } from 'react-router-dom';
import { InputErrorInfo } from './InputErrorInfo';
import { ImgFileInput } from './ImgFileInput';
import { CocktailFormActions } from './CocktailFormActions';

type imgState = { imgFile?: File | null; imgPreview: string };

export function CocktailForm() {
	const navigate = useNavigate();
	const [createCocktail, { isSuccess, data }] = useCreateCocktailMutation();
	const [img, setImg] = useState<imgState>({
		imgFile: null as File | null,
		imgPreview: '',
	});
	const [name, setName] = useState<string>('');
	const [description, setDescription] = useState<string>('');
	const [inputArray, setInputArray] = useState<string[]>([]);
	const [instructions, setInstructions] = useState<string>('');

	const [emptyNameError, setEmptyNameError] = useState<boolean>(false);
	const [emptyDescriptionError, setEmptyDescriptionError] =
		useState<boolean>(false);
	const [emptyIngredientArrayError, setEmptyIngredientArrayError] =
		useState<boolean>(false);
	const [emptyInstructionsError, setEmptyInstructionsError] =
		useState<boolean>(false);

	const newCocktail: CreateCocktailRequest = {
		img: img.imgFile!,
		name: name,
		description: description,
		ingredients: inputArray,
		instructions: instructions,
	};

	function setIngredientInput(index: number, text: string) {
		inputArray[index] = text;
	}

	function addIngredientInput() {
		setInputArray([...inputArray, '']);
	}

	function removeIngredientInput(index: number) {
		const newArray = [...inputArray];
		newArray.splice(index, 1);
		setInputArray(newArray);
	}

	function handleSubmit(event: React.SyntheticEvent) {
		event.preventDefault();
		if (
			name.length !== 0 &&
			name !== '' &&
			description.length !== 0 &&
			description !== '' &&
			inputArray.length !== 0 &&
			// inputArray[0].length !== 0 &&
			// inputArray[0] !== '' &&
			instructions.length !== 0 &&
			instructions !== ''
		) {
			return createCocktail(newCocktail);
		}
		if (name.length === 0 || name === '') {
			setEmptyNameError(true);
		}
		if (description.length === 0 || description === '') {
			setEmptyDescriptionError(true);
		}
		if (inputArray.length === 0) {
			setEmptyIngredientArrayError(true);
		}
		// if(inputArray.length !== 0){
		// 	if(inputArray[0].length === 0 || inputArray[0] === ''){
		// 		setEmptyIngredientArrayError(true)
		// 	}
		// }
		if (instructions.length === 0 && instructions === '') {
			setEmptyInstructionsError(true);
		}
	}

	function resetInputs() {
		setInputArray([]);
		setImg({ ...img, imgFile: null as File | null, imgPreview: '' });
		setEmptyDescriptionError(false);
		setEmptyNameError(false);
		setEmptyInstructionsError(false);
		setEmptyIngredientArrayError(false);
	}

	useEffect(() => {
		if (isSuccess) {
			navigate(`../${data!.id}`);
		}
	}, [data, navigate, isSuccess]);

	const cocktailFormInputClasses: string =
		'p-4 placeholder:text-second-txt text-main-txt cursor-pointer border border-2 border-outline border-solid m-4 focus:outline-primary w-full rounded-full';
	const labelClasses: string = 'text-main-txt font-bold text-xl self-start';

	return (
		<form
			className='flex flex-col items-center w-full m-4'
			name='cocktailForm'
			onSubmit={handleSubmit}>
			<ImgFileInput img={img} setImg={setImg} />
			<label htmlFor='name' className={labelClasses}>
				Name of cocktail
			</label>
			{emptyNameError && (name.length === 0 || name === '') && (
				<InputErrorInfo />
			)}
			<Input
				placeholder='Name'
				className={`${cocktailFormInputClasses} ${
					emptyNameError &&
					(name.length === 0 || name === '') &&
					'border-red focus:outline-red'
				}`}
				id='name'
				autocomplete='off'
				name='name'
				onChange={(event) => setName(event.target.value)}
			/>
			<label htmlFor='descriprion' className={labelClasses}>
				Description
			</label>
			{emptyDescriptionError &&
				(description.length === 0 || description === '') && <InputErrorInfo />}
			<textarea
				placeholder='Tell a little about your cocktail.'
				className={`${cocktailFormInputClasses} ${
					emptyDescriptionError &&
					(description.length === 0 || description === '') &&
					'border-red focus:outline-red'
				}`}
				id='description'
				name='description'
				onChange={(event) => setDescription(event.target.value)}
			/>
			<HandleIngredients
				inputArray={inputArray}
				addIngredientInput={addIngredientInput}
				removeIngredientInput={removeIngredientInput}
				setIngredientInput={setIngredientInput}
				emptyIngredientArrayError={emptyIngredientArrayError}
			/>
			<label htmlFor='instructions' className={`${labelClasses}`}>
				Instructions
			</label>
			{emptyInstructionsError &&
				(instructions.length === 0 || instructions === '') && (
					<InputErrorInfo />
				)}
			<textarea
				placeholder='Describe how to make your cocktail.'
				className={`${cocktailFormInputClasses} ${
					emptyInstructionsError &&
					(instructions.length === 0 || instructions === '') &&
					'border-red focus:outline-red'
				}`}
				id='instructions'
				name='instructions'
				onChange={(event) => setInstructions(event.target.value)}
			/>
			<CocktailFormActions resetInputs={resetInputs} />
		</form>
	);
}

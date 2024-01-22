import { useEffect, useState } from 'react';
import Button from '../UI/Button';
import { Input } from '../UI/Input';
import { useCreateCocktailMutation } from '../../app/api/apiSlice';
import { CreateCocktailRequest } from '../../types/apiDataTypes';
import { HandleIngredients } from './HandleIngredients';
import { useNavigate } from 'react-router-dom';

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

	const newCocktail: CreateCocktailRequest = {
		img: img.imgFile!,
		name: name,
		description: description,
		ingredients: inputArray,
		instructions: instructions,
	};

	const handleFileInputChange = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		const file = event.target.files && event.target.files[0];

		if (file) {
			setImg({
				...img,
				imgFile: file,
				imgPreview: URL.createObjectURL(file),
			});
		}
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
		createCocktail(newCocktail);
	}

	useEffect(() => {
		if (isSuccess) {
			navigate(`../${data!.id}`);
		}
	}, [data, navigate]);

	function resetInputs() {
		setName('');
		setDescription('');
		setInputArray([]);
		setInstructions('');
		setImg({ ...img, imgFile: null as File | null, imgPreview: '' });
		//robi się pusty obiekt ale nie robi się puste pola w formie (nie usuwa się wcześniej wpisany kod; tylko w przypadku img input oraz ingredients); najlepiej żeby po tym odświeżył się komponent
	}

	const formClasses: string =
		'p-4 placeholder:text-second-txt text-main-txt cursor-pointer border border-2 border-outline border-solid p-3 m-4 focus:outline-primary w-full rounded-full';
	const buttonClasses: string =
		'border-none p-3 m-5 w-32 font-bold hover:text-xl rounded-full';
	const labelClasses: string = 'text-main-txt font-bold text-xl self-start';
	const iconStyle: object = { fontSize: '70px' };
	return (
		<>
			<form
				className='flex flex-col items-center w-full m-4'
				name='cocktailForm'
				onSubmit={handleSubmit}>
				<label
					htmlFor='fileInput'
					className='flex flex-col items-center border-2  border-dashed rounded-md py-10 px-16 cursor-pointer border-outline  hover:border-secondary w-1/2 mb-4'>
					<div className='w-32 h-32 overflow-hidden flex items-center justify-center rounded-md'>
						{img.imgPreview !== '' ? (
							<img
								src={img.imgPreview}
								alt='Selected Image'
								className='w-full h-full object-cover'
							/>
						) : (
							<span
								className='material-symbols-outlined text-secondary'
								style={iconStyle}>
								image
							</span>
						)}
					</div>

					<p className='text-main-txt font-bold mt-4 text-center text-l text-nowrap'>
						{img.imgPreview !== ''
							? 'Your photo has been added!'
							: 'Add Cover Photo'}
					</p>
					<Input
						type='file'
						className='hidden'
						id='fileInput'
						autocomplete='off'
						name='img'
						onChange={(event) => handleFileInputChange(event)}
						accept='image/png, image/jpeg'
					/>
				</label>

				<Input
					placeholder='Name'
					className={formClasses}
					id='name'
					labelText='Name of cocktail'
					autocomplete='off'
					name='name'
					onChange={(event) => setName(event.target.value)}
				/>
				<label htmlFor='descriprion' className={labelClasses}>
					Description
				</label>
				<textarea
					placeholder='Tell a little about your cocktail.'
					className={formClasses}
					id='description'
					name='description'
					onChange={(event) => setDescription(event.target.value)}
				/>
				<HandleIngredients
					inputArray={inputArray}
					addIngredientInput={addIngredientInput}
					removeIngredientInput={removeIngredientInput}
					setIngredientInput={setIngredientInput}
				/>
				<label htmlFor='instructions' className={labelClasses}>
					Instructions
				</label>
				<textarea
					placeholder='Describe how to make your cocktail.'
					className={formClasses}
					id='instructions'
					name='instructions'
					onChange={(event) => setInstructions(event.target.value)}
				/>
				<div className='flex flex-row'>
					<Button
						type='submitt'
						className={`bg-primary text-white ${buttonClasses}`}>
						Save
					</Button>
					<Button
						type='button'
						onClick={resetInputs}
						className={`bg-form text-main-txt ${buttonClasses}`}>
						Reset
					</Button>
				</div>
			</form>
		</>
	);
}

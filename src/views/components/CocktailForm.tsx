import { useState } from 'react';
import Button from '../UI/Button';
import { Input } from '../UI/Input';
import { useCreateCocktailMutation } from '../../app/api/apiSlice';

export function CocktailForm() {
	const initialInputsState = {
		img: null,
		name: '',
		description: '',
		ingredients: [],
		instructions: '',
	};
	const [inputValue, setInputValue] = useState(initialInputsState);
	const [createCocktail, { isLoading }] = useCreateCocktailMutation();

	const handleInputChange = (
		event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = event.target;
		setInputValue({ ...inputValue, [name]: value });
	};

	//ogarnąć dodawanie plików za pomocą dragOver

	const resetInputs = () => setInputValue(initialInputsState);

	const handleSubmit = (event: React.SyntheticEvent) => {
		event.preventDefault();
		createCocktail(inputValue);

		//przekazać inputValue na backend
		//po zapisaniu przekazac info że git i wyjść z tej strony na details cocktailu kt został stworzony
	};

	const formClasses: string =
		'p-4 placeholder:text-second-txt text-main-txt cursor-pointer border border-2 border-outline border-solid p-3 m-4 focus:outline-primary w-full rounded-full';
	const buttonClasses: string = 'border-none p-3 m-4 w-32 font-bold';
	const labelClasses: string = 'text-main-txt font-bold text-xl self-start';
	const iconStyle: object = { fontSize: '70px' };
	return (
		<form
			className='flex flex-col items-center w-full m-4'
			name='cocktailForm'
			onSubmit={handleSubmit}>
			<label
				htmlFor='fileInput'
				className='flex flex-col items-center border-2  border-dashed rounded-md py-10 px-16 cursor-pointer border-outline  hover:border-secondary w-1/2 mb-4'>
				<span
					className='material-symbols-outlined text-secondary'
					style={iconStyle}>
					image
				</span>
				<p className='text-main-txt font-bold mt-4'>Add Cover Photo</p>
				<Input
					type='file'
					className='hidden'
					id='fileInput'
					autocomplete='off'
					name='img'
					onChange={handleInputChange}
					value={inputValue.img}
				/>
			</label>

			<Input
				placeholder='Name'
				className={formClasses}
				id='name'
				labelText='Name of cocktail'
				autocomplete='off'
				name='name'
				onChange={handleInputChange}
				value={inputValue.name}
			/>
			<label htmlFor='descriprion' className={labelClasses}>
				Description
			</label>
			<textarea
				placeholder='Tell a little about your cocktail.'
				className={formClasses}
				id='description'
				name='description'
				onChange={handleInputChange}
				value={inputValue.description}
			/>
			<Input
				placeholder='Ingredients'
				className={formClasses}
				id='ingredients'
				labelText='Ingredients'
				autocomplete='off'
				name='ingredients'
				onChange={handleInputChange}
				value={inputValue.ingredients}
			/>
			<label htmlFor='instructions' className={labelClasses}>
				Instructions
			</label>
			<textarea
				placeholder='Describe how to make your cocktail.'
				className={formClasses}
				id='instructions'
				name='instructions'
				onChange={handleInputChange}
				value={inputValue.instructions}
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
	);
}

import { useEffect, useState } from 'react';
import Button from '../../../components/Button';
import IconInput from '../../../components/IconInput';
import { InputErrorInfo } from './InputErrorInfo';

type IngredientsInputProps = {
	inputArray: string[];
	addIngredientInput: () => void;
	removeIngredientInput: (index: number) => void;
	setIngredientInput: (index: number, text: string) => void;
	emptyIngredientArrayError: boolean;
};

export function IngredientsInput({
	inputArray,
	addIngredientInput,
	removeIngredientInput,
	setIngredientInput,
	emptyIngredientArrayError,
}: IngredientsInputProps) {
	const formClasses: string =
		'p-4 placeholder:text-second-txt text-main-txt cursor-pointer border border-2 border-outline border-solid p-3 mt-4 focus:outline-primary w-full rounded-full';

	return (
		<div className='flex flex-col w-full'>
			<p className='text-main-txt text-xl font-bold'>Ingredients</p>
			{emptyIngredientArrayError && (
				<InputErrorInfo className='w-full flex justify-center' />
			)}
			{inputArray.map((ingredient: string, index: number) => (
				<IconInput
					key={index}
					placeholder='Enter Ingredient'
					inputClassName={`${formClasses} ${
						emptyIngredientArrayError && 'border-red focus:outline-red'
					})
					}`}
					autocomplete='off'
					name='ingredient'
					trailingIcon='delete_outline'
					button
					trailingSpanClass='py-8 px-5 text-second-txt hover:text-primary '
					onChange={(text) => setIngredientInput(index, text)}
					onTrailingIconClick={() => removeIngredientInput(index)}
				/>
			))}
			<Button
				className={`border-2 border-outline border-solid p-3 w-32 mt-6 mb-4 text-main-txt cursor-pointer font-semibold self-center rounded-full transition delay-120 focus:border-primary focus:border-solid hover:border-primary hover:border-solid ease-in-out hover:scale-105 ${
					emptyIngredientArrayError && 'border-red focus:border-red'
				}`}
				onClick={addIngredientInput}>
				+ Ingredient
			</Button>
		</div>
	);
}

export function validateIngredientInput(
	inputArray: string[],
	setError: React.Dispatch<React.SetStateAction<boolean>>
) {
	if (
		inputArray.length === 0
		// inputArray.length === 0
		//  inputArray[0] === undefined ||
		// inputArray[0].length === 0 ||
		// inputArray[0] === ''
	) {
		setError(true);
	}
}

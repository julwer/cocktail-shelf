import Button from '../UI/Button';
import IconInput from '../UI/IconInput';

type HandleIndegrientsProps = {
	inputArray: string[];
	addIngredientInput: () => void;
	removeIngredientInput: (index: number) => void;
	setIngredientInput: (index: number, text: string) => void;
};

export function HandleIngredients({
	inputArray,
	addIngredientInput,
	removeIngredientInput,
	setIngredientInput,
}: HandleIndegrientsProps) {
	const formClasses: string =
		'p-4 placeholder:text-second-txt text-main-txt cursor-pointer border border-2 border-outline border-solid p-3 mt-4 focus:outline-primary w-full rounded-full';

	return (
		<div className='flex flex-col w-full'>
			<p className='text-main-txt text-xl font-bold'>Ingredients</p>
			{inputArray.map((ingredient: string, index: number) => (
				<IconInput
					key={index}
					placeholder='Enter Ingredient'
					inputClassName={formClasses}
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
				className='border-2 border-outline border-solid p-4 mt-6 mb-4 w-fit text-main-txt cursor-pointer font-semibold self-center rounded-full transition delay-120 focus:border-primary focus:border-solid hover:border-primary hover:border-solid '
				onClick={addIngredientInput}>
				+ Ingredient
			</Button>
		</div>
	);
}

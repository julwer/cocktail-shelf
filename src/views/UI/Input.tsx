import { ChangeEvent } from 'react';

export type InputProps = {
	id?: string;
	placeholder?: string;
	value?: any;
	name?: string;
	onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
	labelText?: string;
	type?: string;
	className?: string;
	autocomplete?: string;
	accept?: string;
};

export function Input({
	id,
	placeholder,
	value,
	name,
	onChange,
	labelText,
	type,
	className,
	autocomplete,
	accept,
}: InputProps) {
	const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		onChange && onChange(event);
	};
	return (
		<>
			<label
				htmlFor={id}
				className='text-main-txt font-bold text-xl self-start'>
				{labelText}
			</label>
			<input
				id={id}
				placeholder={placeholder}
				name={name}
				onChange={onInputChange}
				type={type}
				className={className}
				value={value}
				autoComplete={autocomplete}
				accept={accept}
			/>
		</>
	);
}

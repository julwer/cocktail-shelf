import { ChangeEventHandler } from 'react';

type IconInputProps = {
	leadingIcon?: string;
	trailingIcon?: string;
	leadingSpanClass?: string;
	trailingSpanClass?: string;
	type?: string;
	name?: string;
	id?: string;
	onChange?: ChangeEventHandler<HTMLInputElement>;
	placeholder?: string;
	inputClassName?: string;
	value?: any;
	inputWidth?: string;
};

export default function IconInput({
	leadingIcon,
	trailingIcon,
	leadingSpanClass,
	trailingSpanClass,
	type,
	name,
	id,
	onChange,
	placeholder,
	inputClassName,
	value,
	inputWidth,
}: IconInputProps) {
	const inputClasses = 'rounded-full text-main-txt cursor-pointer ';

	return (
		<div className={`flex flex-row relative w-${inputWidth}`}>
			{leadingIcon && (
				<span
					className={`material-symbols-outlined absolute inset-y-0 left-0  ${leadingSpanClass}`}>
					{leadingIcon}
				</span>
			)}
			<input
				className={inputClasses + inputClassName}
				type={type}
				name={name}
				id={id}
				onChange={onChange}
				placeholder={placeholder}
				value={value}
			/>
			{trailingIcon && (
				<span className={`material-symbols-outlined ${trailingSpanClass}`}>
					{trailingIcon}
				</span>
			)}
		</div>
	);
}

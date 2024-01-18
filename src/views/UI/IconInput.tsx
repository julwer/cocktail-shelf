import { ChangeEvent } from 'react';

type IconInputProps = {
	leadingIcon?: string;
	trailingIcon?: string;
	leadingSpanClass?: string;
	trailingSpanClass?: string;
	type?: string;
	name?: string;
	id?: string;
	onChangeEvent?: (event: ChangeEvent<HTMLInputElement>) => void;
	onChange?: (text: string) => void;
	placeholder?: string;
	inputClassName?: string;
	value?: string;
	inputWidth?: string;
	button?: boolean;
	onTrailingIconClick?: () => void;
	onSubmit?: () => void;
	autocomplete?: string;
};

export default function IconInput({
	leadingIcon,
	trailingIcon,
	leadingSpanClass,
	trailingSpanClass,
	type,
	name,
	id,
	onChangeEvent,
	placeholder,
	inputClassName,
	value,
	inputWidth,
	button,
	onTrailingIconClick,
	onSubmit,
	autocomplete,
	onChange,
}: IconInputProps) {
	const inputClasses = 'rounded-full text-main-txt cursor-pointer ';
	const onInputChangeEvent = (event: ChangeEvent<HTMLInputElement>) => {
		onChangeEvent && onChangeEvent(event);
		onChange && onChange(event.target.value);
	};
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
				onChange={onInputChangeEvent}
				placeholder={placeholder}
				value={value}
				autoComplete={autocomplete}
				onKeyDown={(event) => {
					if (event.key === 'Enter' && onSubmit) onSubmit();
				}}
				onSubmit={onSubmit}
			/>
			{trailingIcon && (
				<span
					className={`material-symbols-outlined absolute inset-y-0 right-0 ${trailingSpanClass}`}>
					{trailingIcon}
				</span>
			)}
			{button && trailingIcon && (
				<button onClick={onTrailingIconClick} tabIndex={0}>
					<span
						className={`material-symbols-outlined absolute inset-y-0 right-0 ${trailingSpanClass}`}>
						{trailingIcon}
					</span>
				</button>
			)}
		</div>
	);
}

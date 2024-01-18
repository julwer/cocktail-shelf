type ButtonProps = {
	props?: any;
	className?: string;
	children?: any;
	type?: any;
	onClick?: any;
	disabled?: any;
};

export default function Button({
	onClick,
	className,
	children,
	type = 'button',
	disabled,
}: ButtonProps) {
	let classes = 'rounded-full cursor-pointer ' + className;
	return (
		<>
			<button
				type={type}
				className={className}
				onClick={onClick}
				disabled={disabled}>
				{children}
			</button>
		</>
	);
}

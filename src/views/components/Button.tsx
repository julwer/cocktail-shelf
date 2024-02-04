type ButtonProps = {
	props?: any;
	className?: string;
	children?: any;
	type?: 'submit' | 'reset' | 'button' | undefined;
	onClick?: any;
	disabled?: boolean | undefined;
};

export default function Button({
	onClick,
	className,
	children,
	type = 'button',
	disabled,
}: ButtonProps) {
	return (
		<button
			type={type}
			className={className}
			onClick={onClick}
			disabled={disabled}>
			{children}
		</button>
	);
}

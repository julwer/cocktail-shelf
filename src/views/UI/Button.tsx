type ButtonProps = {
	props?: any;
	className?: string;
	buttonIcon?: string;
    children ?: any; 
	type ?: any;
	onClick ?: any; 
	disabled ?: any; 
};

export default function Button({onClick, className, buttonIcon, children, type, disabled }: ButtonProps) {
	let classes = 'rounded-full cursor-pointer ' + className;
	return (
		<>
			{buttonIcon && <span>{buttonIcon}</span>}
			<button type={type} className={classes} onClick={onClick} disabled={disabled}>{children}</button>
		</>
	);
}

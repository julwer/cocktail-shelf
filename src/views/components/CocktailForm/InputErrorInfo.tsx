type InputErrorInfoProps = {
    className?: string; 
}

export function InputErrorInfo({className}: InputErrorInfoProps) {
	return (
		<div className={`flex flex-row text-red pt-4 ${className}` }>
			<span className='material-symbols-outlined pr-1'>error</span>
			<p className='inline text-red'>This input can't be empty</p>
		</div>
	);
}

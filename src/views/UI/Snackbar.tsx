import { useEffect, useState } from 'react';

type SnackbarProps = {
	message?: string;
	iconName?: string;
	className?: string;
	duration?: number;
};

export function Snackbar({
	message,
	iconName = 'done',
	className,
	duration = 2500,
}: SnackbarProps) {
	const [isVisible, setIsVisible] = useState(true);

	useEffect(() => {
		const timer = setTimeout(() => {
			setIsVisible(false);
		}, duration);

		return () => clearTimeout(timer);
	}, []);

	return (
		<div
			className={`text-main-txt bg-primary flex flex-row md:w-1/4 p-4 text-l font-bold justify-center z-20 rounded-md fixed shadow-md items-center ${
				!isVisible && 'hidden'
			} ${className}`}>
			<span className='material-symbols-outlined text-main-txt mr-2'>
				{iconName}
			</span>
			<div>{message}</div>
		</div>
	);
}

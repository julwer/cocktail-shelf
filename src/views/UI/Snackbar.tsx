import { useEffect, useState } from 'react';

type SnackbarProps = {
	message?: string;
	iconName?: string;
};

export function Snackbar({ message, iconName = 'done' }: SnackbarProps) {
	const [isVisible, setIsVisible] = useState(true);

	useEffect(() => {
		const timer = setTimeout(() => {
			setIsVisible(false);
		}, 2500);

		return () => clearTimeout(timer);
	}, []);

	return (
		<div
			className={`text-main-txt bg-primary flex flex-row w-1/4 p-4 text-l font-bold justify-center z-20 rounded-md fixed t-[5%] translate-x-[145%] shadow-md ${
				!isVisible && 'hidden'
			}`}>
			<span className='material-symbols-outlined text-main-txt'>
				{iconName}
			</span>
			<div>{message}</div>
		</div>
	);
}

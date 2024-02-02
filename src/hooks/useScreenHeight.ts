import { useState, useEffect } from 'react';

export function useScreenHeight(): number {
	const [screenHeight, setScreenHeight] = useState(window.innerHeight);

	useEffect(() => {
		function handleResize() {
			setScreenHeight(window.innerHeight);
		}

		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	return screenHeight;
}

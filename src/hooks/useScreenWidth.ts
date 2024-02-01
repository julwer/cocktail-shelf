import { useState, useEffect } from 'react';

export function useScreenWidth(): number {
	const [screenWidth, setScreenWidth] = useState(window.innerWidth);

	useEffect(() => {
		function handleResize() {
			setScreenWidth(window.innerWidth);
		}

		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	return screenWidth;
}



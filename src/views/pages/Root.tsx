import { Outlet } from 'react-router-dom';
import { SearchHeader } from '../UI/SearchHeader';

export function RootLayout() {
	return (
		<>
			<Outlet />
		</>
	);
}

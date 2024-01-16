import { Outlet } from 'react-router-dom';
import { SearchHeader } from '../components/SearchHeader';

export function RootLayout() {
	return (
		<>
			<Outlet />
		</>
	);
}

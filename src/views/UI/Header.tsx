import { Nav } from './Nav';

export function Header() {
	return (
		<header className='flex flex-row items-center py-4 px-4 min-h-14'>
			<Nav />
		</header>
	);
}

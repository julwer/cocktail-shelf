import { Link } from 'react-router-dom';
import { clearTokens } from '../../authService';
import { logout } from '../../app/state/auth/authSlice';
import { useDispatch } from 'react-redux';

type MobileNavProps = {
	handleToggle: () => void;
	searchInput: boolean;
};

export function MobileNav({ handleToggle, searchInput }: MobileNavProps) {
	const dispatch = useDispatch();

	function handleLogout() {
		clearTokens();
		dispatch(logout());
	}

	const linkClasses: string = 'py-2 px-4 text-main-txt text-xl';

	return (
		<nav
			className={`absolute flex flex-col ml-2 bg-white rounded-md ${
				!searchInput && 'top-16'
			}`}>
			<Link
				to={'/home/createCocktail'}
				onClick={handleToggle}
				className={linkClasses}>
				Create cocktail
			</Link>
			<Link
				to={'/home/yourCocktails'}
				onClick={handleToggle}
				className={linkClasses}>
				Your cocktails
			</Link>
			<Link to={'/home/profile'} onClick={handleToggle} className={linkClasses}>
				Profile
			</Link>
			<Link to={'/'} onClick={handleLogout} className={linkClasses}>
				Log out
			</Link>
		</nav>
	);
}

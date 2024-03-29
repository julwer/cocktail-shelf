import { Link } from 'react-router-dom';
import { clearTokens } from '../../../utils/authService';
import { logout } from '../../../redux/state/authSlice';
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

	const linkClasses: string = 'py-2 px-4 text-main-txt text-xl z-10';

	return (
		<nav
			className={`absolute flex flex-col ml-2 bg-white rounded-md ${
				!searchInput && 'top-16'
			}`}>
			<Link to={'/home'} onClick={handleToggle} className={linkClasses}>
				Home
			</Link>
			<Link
				to={'/createCocktail'}
				onClick={handleToggle}
				className={linkClasses}>
				Create cocktail
			</Link>
			<Link
				to={'/yourCocktails'}
				onClick={handleToggle}
				className={linkClasses}>
				Your cocktails
			</Link>
			<Link to={'/'} onClick={handleLogout} className={linkClasses}>
				Log out
			</Link>
		</nav>
	);
}

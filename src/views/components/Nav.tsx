import { Link } from 'react-router-dom';
import logoPng from '../../images/logo.png';
import { clearTokens } from '../../utils/authService';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/state/authSlice';

type NavProps = { children?: any };

export function Nav({ children }: NavProps) {
	const dispatch = useDispatch();

	function handleLogout() {
		clearTokens();
		dispatch(logout());
	}
	const linkClasses: string =
		'text-main-txt font-bold tracking-wide cursor-pointer text-nowrap transition delay-100  active:text-primary active:underline hover:text-primary';
	return (
		<>
			<Link to='/home'>
				<div className='h-fit w-52'>
					<img
						src={logoPng}
						className='w-full h-full'
						alt='cocktail shelf logo'
					/>
				</div>
			</Link>
			{children}
			<div className='w-full' />
			<nav className='flex flex-row gap-6'>
				<Link to={'/createCocktail'} className={linkClasses}>
					Create cocktail
				</Link>
				<Link to={'/yourCocktails'} className={linkClasses}>
					Your cocktails
				</Link>
				<Link to={'/'} className={linkClasses} onClick={handleLogout}>
					Log out
				</Link>
			</nav>
		</>
	);
}

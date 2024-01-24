import { Link } from 'react-router-dom';
import logoPng from '../../images/logo.png';
import { clearTokens } from '../../authService';
import { useDispatch } from 'react-redux';
import { logout } from '../../app/state/auth/authSlice';

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
					<img src={logoPng} className='w-full h-full' />
				</div>
			</Link>
			{children}
			<div className='w-full' />
			<nav className='flex flex-row gap-6'>
				<Link to={'/home/createCocktail'} className={linkClasses}>
					Create cocktail
				</Link>
				<Link to={'/home/yourCocktails'} className={linkClasses}>
					Your coktails
				</Link>
				<Link to={'/home/profile'} className={linkClasses}>
					Profile
				</Link>
				<Link to={'/'} className={linkClasses} onClick={handleLogout}>
					Log out
				</Link>
			</nav>
		</>
	);
}

import { Link } from 'react-router-dom';
import logoPng from '../../img/logo.png';

type NavProps = { children?: any };

export function Nav({ children }: NavProps) {
	const linkClasses: string =
		'text-main-txt font-bold tracking-wide cursor-pointer text-nowrap hover:tracking-wider active:text-primary active:underline hover:text-primary';
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
				<Link to={''} className={linkClasses}>
					Profile
				</Link>
				<Link to={'/'} className={linkClasses}>
					Log out
				</Link>
			</nav>
		</>
	);
}

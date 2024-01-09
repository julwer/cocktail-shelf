import { Link } from 'react-router-dom';
import IconInput from '../UI/IconInput';

export function MainHeader() {
	const linkClasses: string =
		'text-main-txt font-bold tracking-wide cursor-pointer text-nowrap hover:tracking-wider active:text-primary active:underline';

	return (
		<header className='flex flex-row items-center justify-between m-4'>
			<Link
				to='/home'
				className={`hover:tracking-widest tracking-wider font-bold w-fit ${linkClasses}`}>
				COCKTAIL SHELF
			</Link>
			<IconInput
				placeholder='Search...'
				inputClassName='bg-form hover: outline-none py-2 px-9 ml-4'
				inputWidth='auto'
				leadingIcon='Search'
				leadingSpanClass='pl-6 pt-2'
			/>
			<nav className='grid grid-cols-4 gap-4 justify-items-end w-full pr-1'>
				<Link to={''} className={linkClasses}>
					Create cocktail
				</Link>
				<Link to={''} className={linkClasses}>
					Your coktails
				</Link>
				<Link to={''} className={linkClasses}>
					Profile
				</Link>
				<Link to={'/'} className={linkClasses}>
					Log out
				</Link>
			</nav>
		</header>
	);
}

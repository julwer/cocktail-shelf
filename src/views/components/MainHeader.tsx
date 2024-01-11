import { Link } from 'react-router-dom';
import IconInput from '../UI/IconInput';

export function MainHeader() {
	const linkClasses: string =
		'text-main-txt font-bold tracking-wide cursor-pointer text-nowrap hover:tracking-wider active:text-primary active:underline hover:text-primary';

	return (
		<header className='flex flex-row items-center my-4'>
			<Link
				to='/home'
				className={`hover:tracking-widest tracking-wider font-bold w-fit ${linkClasses} px-5`}>
				COCKTAIL SHELF
			</Link>
			<IconInput
				placeholder='Search...'
				inputClassName='bg-form focus:outline-none focus:border-2 focus:border-primary  py-2 px-9 ml-4'
				inputWidth='auto'
				leadingIcon='Search'
				leadingSpanClass='pl-6 pt-2'
			/>
			<div className='w-full' />
			<nav className='flex flex-row gap-6 pr-5'>
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

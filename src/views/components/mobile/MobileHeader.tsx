import Button from '../Button';
import smallLogoImg from '../../../images/small-logo.png';
import { useEffect, useState } from 'react';
import { MobileNav } from './MobileNav'
import IconInput from '../IconInput';
import { Link } from 'react-router-dom';

type MobileHeaderProps = {
	onSearch?: (query: string) => void;
	searchInput: boolean;
};

export function MobileHeader({ onSearch, searchInput }: MobileHeaderProps) {
	const [toggleMenu, setToggleMenu] = useState(false);
	const [searchInputValue, setSearchInputValue] = useState('');
	const [debouncedValue, setDebouncedValue] = useState('');

	function handleToggle() {
		setToggleMenu(!toggleMenu);
	}

	const handleSearch = () => {
		if (onSearch) {
			onSearch(searchInputValue);
		}
	};

	useEffect(() => {
		const timer = setTimeout(() => {
			setDebouncedValue(searchInputValue);
		}, 500);
		return () => clearTimeout(timer);
	}, [searchInputValue, debouncedValue]);

	useEffect(() => {
		if (onSearch) {
			onSearch(debouncedValue);
		}
	}, [debouncedValue, onSearch]);

	return (
		<>
			{!searchInput && (
				<div className='absolute w-screen flex justify-center z-10'>
					<Link className='h-[50px] w-[60px] overflow-hidden my-2' to={'/home'}>
						<img
							src={smallLogoImg}
							alt='logo'
							className='w-full h-full object-cover'
						/>
					</Link>
				</div>
			)}
			<div className={`flex items-center h-[66px]`}>
				<Button className='m-2 z-20' onClick={handleToggle}>
					<span className='material-symbols-outlined text-main-txt font-bold flex items-center justify-center text-3xl'>
						menu
					</span>
				</Button>
				{searchInput && (
					<IconInput
						placeholder='Search...'
						inputClassName='bg-white border border-outline border-solid placeholder:text-second-txt transition delay-150 focus:outline-none focus:border-2 focus:border-primary mx-4 py-1 pl-4 text-m'
						inputWidth='auto'
						trailingIcon='Search'
						trailingSpanClass='py-1 pr-6 hover:text-primary'
						button={true}
						onSubmit={handleSearch}
						onTrailingIconClick={handleSearch}
						onChangeEvent={(event) => setSearchInputValue(event.target.value)}
					/>
				)}
			</div>
			{toggleMenu && (
				<MobileNav handleToggle={handleToggle} searchInput={searchInput} />
			)}
		</>
	);
}

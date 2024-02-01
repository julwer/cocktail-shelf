import { useState } from 'react';
import { useGetCocktailsQuery } from '../../app/api/apiSlice';
import { SearchHeader } from '../UI/Universal/SearchHeader';
import { CocktailList } from '../components/DisplayCocktail/CocktailList';
import { LoadingIndicator } from '../UI/Universal/LoadingIndicator';
import { MobileHeader } from '../UI/Mobile/MobileHeader';
import { isMobile } from '../../utils/checkWindowWidth';
import { useScreenWidth } from '../../hooks/useScreenWidth';

export function HomePage() {
	const [query, setQuery] = useState<string>('');
	const { data, isLoading } = useGetCocktailsQuery({ query });
	const windowWidth: number = useScreenWidth();

	const onSearch = (query: string) => {
		setQuery(query);
	};

	return (
		<>
			{isLoading && <LoadingIndicator />}
			<div>
				{isMobile(windowWidth) ? (
					<MobileHeader searchInput={true} onSearch={onSearch} />
				) : (
					<SearchHeader onSearch={onSearch} />
				)}
				<main className='flex flex-col items-center w-[100vw] h-[100vh] md:w-full '>
					<CocktailList cocktails={data} btns={false} />
				</main>
			</div>
		</>
	);
}

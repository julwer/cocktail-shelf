import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import LandingPage from './views/pages/Landing';
import { HomePage } from './views/pages/Home';
import { CocktailDetailPage } from './views/pages/CocktailDetail';
import { RootLayout } from './views/pages/Root';
import { ErrorPage } from './views/pages/Error';
import { CreateCocktail } from './views/pages/CreateCocktail';
import { YourCocktails } from './views/pages/YourCocktails';
import {
	getAccessToken,
	getRefreshToken,
	isAccessTokenExpired,
} from './authService';
import { useGetNewAccessTokenMutation } from './app/api/apiSlice';

const router = createBrowserRouter([
	{ path: '/', element: <LandingPage />, errorElement: <ErrorPage /> },
	{
		path: '/home',
		element: <RootLayout />,
		children: [
			{ path: '', element: <HomePage /> },
			{ path: ':cocktailId', element: <CocktailDetailPage /> },
			{ path: 'createCocktail', element: <CreateCocktail /> },
			{ path: 'yourCocktails', element: <YourCocktails /> },
		],
	},
]);

function App() {
	const refreshToken = getRefreshToken();
	const accessToken = getAccessToken();
	const isExpired = isAccessTokenExpired(accessToken!);

	const [getNewAccessToken] = useGetNewAccessTokenMutation();

	if (isExpired) {
		getNewAccessToken(refreshToken!);
	}

	return <RouterProvider router={router} />;
}

export default App;

import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import LandingPage from './views/pages/Landing';
import { HomePage } from './views/pages/Home';
import { CocktailDetailPage } from './views/pages/CocktailDetail';
import { RootLayout } from './views/pages/Root';
import { ErrorPage } from './views/pages/Error';
import { CreateCocktailPage } from './views/pages/CreateCocktail';
import { YourCocktailsPage } from './views/pages/YourCocktails';
import { SignupPage } from './views/pages/Signup';
import { ProfilePage } from './views/pages/Profile';

const router = createBrowserRouter([
	{ path: '/', element: <LandingPage />, errorElement: <ErrorPage /> },
	{ path: 'signup', element: <SignupPage /> },
	{
		path: '/home',
		element: <RootLayout />,
		children: [
			{ path: '', element: <HomePage /> },
			{ path: ':cocktailId', element: <CocktailDetailPage /> },
			{ path: 'createCocktail', element: <CreateCocktailPage /> },
			{ path: 'yourCocktails', element: <YourCocktailsPage /> },
			{ path: 'profile', element: <ProfilePage /> },
		],
	},
]);

function App() {
	return <RouterProvider router={router} />;
}

export default App;

import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import LandingPage from './views/pages/Landing';
import { HomePage } from './views/pages/Home';
import { CocktailDetailPage } from './views/pages/CocktailDetail';

import { ErrorPage } from './views/pages/Error';
import { CreateCocktailPage } from './views/pages/CreateCocktail';
import { YourCocktailsPage } from './views/pages/YourCocktails';
import { SignupPage } from './views/pages/Signup';
import { EditCocktailPage } from './views/pages/EditCocktail';

const router = createBrowserRouter([
	{ path: '/', element: <LandingPage />, errorElement: <ErrorPage /> },
	{ path: 'signup', element: <SignupPage /> },
	{ path: '/home', element: <HomePage /> },
	{ path: ':cocktailId', element: <CocktailDetailPage /> },
	{ path: 'createCocktail', element: <CreateCocktailPage /> },
	{ path: 'yourCocktails', element: <YourCocktailsPage /> },
	{ path: 'edit/:cocktail', element: <EditCocktailPage /> },
]);

function App() {
	return <RouterProvider router={router} />;
}

export default App;

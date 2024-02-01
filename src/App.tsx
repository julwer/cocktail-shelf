import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import LandingPage from './views/pages/login/Login';
import { HomePage } from './views/pages/home/Home';
import { CocktailDetailPage } from './views/pages/cocktail-detail/CocktailDetail';

import { ErrorPage } from './views/pages/error/Error';
import { CreateCocktailPage } from './views/pages/create-cocktail/CreateCocktail';
import { YourCocktailsPage } from './views/pages/your-cocktails/YourCocktails';
import { SignupPage } from './views/pages/signup/Signup';
import { EditCocktailPage } from './views/pages/edit-cocktail/EditCocktail';

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

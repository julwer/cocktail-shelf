import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import LandingPage from './views/pages/Landing';
import { HomePage } from './views/pages/Home';
import { CocktailDetailPage } from './views/pages/CocktailDetail';
import { RootLayout } from './views/pages/Root';
import { ErrorPage } from './views/pages/Error';
import { CreateCocktail } from './views/pages/CreateCocktail';

const router = createBrowserRouter([
	{ path: '/', element: <LandingPage />, errorElement: <ErrorPage /> },
	{
		path: '/home',
		element: <RootLayout />,
		children: [
			{ path: '', element: <HomePage /> },
			{ path: ':cocktailId', element: <CocktailDetailPage /> },
			{ path: 'createCocktail', element: <CreateCocktail /> },
		],
	},
]);

function App() {
	return <RouterProvider router={router} />;
}

export default App;

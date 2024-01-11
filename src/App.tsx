import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import LandingPage from './views/pages/Landing';
import { HomePage } from './views/pages/Home';
import { CocktailDetailPage } from './views/pages/CocktailDetail';
import { RootLayout } from './views/pages/Root';
import { ErrorPage } from './views/pages/Error';
// import { ProtectedRoute } from './views/routes/ProtectedRoute';

const router = createBrowserRouter([
	{ path: '/', element: <LandingPage />, errorElement: <ErrorPage /> },
	{
		path: '/home',
		element: (
			// <ProtectedRoute>
			<RootLayout />
		),
		// </ProtectedRoute>,
		children: [
			{ path: '', element: <HomePage /> },
			{ path: ':cocktailId', element: <CocktailDetailPage /> },
		],
	},
]);

function App() {
	return <RouterProvider router={router} />;
}

export default App;

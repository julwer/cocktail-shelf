// import { useSelector } from 'react-redux';
// import { Navigate } from 'react-router-dom';

// type ProtectedRouteProps = {
// 	children: React.ReactNode;
// 	redirectPath?: string;
// };

// export function ProtectedRoute({
// 	children,
// 	redirectPath = '/',
// }: ProtectedRouteProps) {
// 	const isAuthenticated = useSelector(
// 		(state: any) => state.auth.isAuthenticated
// 	);

// 	return isAuthenticated ? (
// 		<>{children}</>
// 	) : (
// 		<Navigate to={redirectPath} replace={true} />
// 	);

// LUB if(!token){<Navigate to={redirectPath} replace={true} />}
// }

export function ProtectedRoute(){}; 
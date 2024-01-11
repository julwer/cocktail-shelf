import { Cookies } from 'typescript-cookie';
import { LoginResponse } from './types/apiDataTypes';
import { jwtDecode } from 'jwt-decode';

export const setTokens = (credentials: LoginResponse) => {
	Cookies.set('accessToken', credentials.accessToken, {
		expires: credentials.expiresIn / 86.4,
	});
	Cookies.set('refreshToken', credentials.refreshToken);
};

export const getAccessToken = (): string | undefined => {
	return Cookies.get('accessToken') as string | undefined;
};

export const getRefreshToken = (): string | undefined => {
	return Cookies.get('refreshToken') as string | undefined;
};

export const clearTokens = () => {
	Cookies.remove('refreshToken');
	Cookies.remove('accessToken');
};

export const isAccesTokenExpired = (accessToken: string): boolean => {
	const decoded: { exp: number } = jwtDecode(accessToken);
	if (decoded.exp < Date.now()) {
		return false;
	} else {
		return true;
	}
};

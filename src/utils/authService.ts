import { Cookies } from 'typescript-cookie';
import { LoginResponse } from '../types/apiDataTypes';
import { jwtDecode } from 'jwt-decode';

const accessToken: string = 'accessToken';
const refreshToken: string = 'refreshToken';

export const setTokens = (credentials: LoginResponse | any) => {
	const decoded: { exp: number } = jwtDecode(credentials.accessToken);
	Cookies.set(accessToken, credentials.accessToken, {
		expires: decoded.exp,
	});
	Cookies.set(refreshToken, credentials.refreshToken);
};

export const getAccessToken = (): string | undefined => {
	return Cookies.get(accessToken) as string | undefined;
};

export const getRefreshToken = (): string | undefined => {
	return Cookies.get(refreshToken) as string | undefined;
};

export const clearTokens = () => {
	Cookies.remove(refreshToken);
	Cookies.remove(accessToken);
};

export const isAccessTokenExpired = (accessToken: string): boolean => {
	const decoded: { exp: number } = jwtDecode(accessToken);
	if (decoded.exp < Date.now()) {
		return false;
	} else {
		return true;
	}
};

export const getOwnerId = () => {
	const accessToken = getAccessToken();
	if (accessToken) {
		const ownerId: { sub: string } = jwtDecode(accessToken);
		return ownerId.sub;
	}
};

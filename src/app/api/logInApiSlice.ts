import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { LoginRequest, LoginResponse } from '../../types/apiDataTypes';
import { CocktailModel } from '../../types/cocktailModel';
import { getAccessToken } from '../../authService';

export const api = createApi({
	reducerPath: 'api',
	baseQuery: fetchBaseQuery({
		baseUrl: 'https://drink-bar-408108.lm.r.appspot.com',
	}),
	endpoints: (build) => ({
		login: build.mutation<LoginResponse, LoginRequest>({
			query: (user) => ({
				url: '/user/login',
				method: 'POST',
				body: user,
				return: {
					url: '/user/login',
					method: 'GET',
					responseType: 'json',
				},
			}),
		}),
		getCocktails: build.query<Array<CocktailModel>, void>({
			query: () => ({
				url: '/drink',
				headers: {
					Authorization: `Bearer ${getAccessToken()}`,
				},
			}),
		}),
		getCocktailDetails: build.query<CocktailModel, string>({
			query: (cocktailId) => ({
				url: `drink/${cocktailId}`,
				headers: {
					Authorization: `Bearer ${getAccessToken()}`,
				},
			}),
		}),
		refreshToken: build.mutation<string, string>({
			query: (refreshToken) => ({
				url: '',
				body: {
					refreshToken: refreshToken,
				},
				return: {
					url: '',
					method: 'GET',
					responseType: 'json',
				},
			}),
		}),
	}),
});

export const {
	useLoginMutation,
	useGetCocktailsQuery,
	useGetCocktailDetailsQuery,
	useRefreshTokenMutation,
} = api;

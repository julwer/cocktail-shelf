import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { LoginRequest, LoginResponse } from '../../model/apiDataTypes';
import { CocktailModel } from '../../model/cocktailModel';

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
		authorize: build.mutation<null, string>({
			query: (accessToken) => ({
				url: '',
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			}),
		}),
		getCocktails: build.query<Array<CocktailModel>, void>({
			query: () => ({
				url: '/drink',
			}),
		}),
	}),
});

export const { useLoginMutation, useGetCocktailsQuery } = api;

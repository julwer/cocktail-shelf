import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
	CreateCocktailRequest,
	LoginRequest,
	LoginResponse,
} from '../../types/apiDataTypes';
import { CocktailModel } from '../../types/cocktailModel';
import { getAccessToken } from '../../authService';
import { stringify } from 'querystring';

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
			}),
		}),
		getCocktails: build.query<
			Array<CocktailModel>,
			{ query?: string; ownerId?: string }
		>({
			query: ({ query, ownerId }) => ({
				url: '/drink',
				headers: {
					Authorization: `Bearer ${getAccessToken()}`,
				},
				params: {
					query,
					ownerId,
				},
			}),
		}),
		getCocktailDetails: build.query<CocktailModel, string>({
			query: (cocktailId: string) => ({
				url: `drink/${cocktailId}`,
				headers: {
					Authorization: `Bearer ${getAccessToken()}`,
				},
			}),
		}),
		createCocktail: build.mutation<null, CreateCocktailRequest>({
			query: (newCocktail: CreateCocktailRequest) => ({
				url: 'drink',
				method: 'POST',
				headers: {
					Authorization: `Bearer ${getAccessToken()}`,
				},
				body: createCocktailRequestToFormData(newCocktail),
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
	useCreateCocktailMutation,
} = api;

function createCocktailRequestToFormData(
	newCocktail: CreateCocktailRequest
): FormData {
	const formData = new FormData();
	formData.append('image', newCocktail.img);
	//znależć typ danych dawanych do inputa img
	formData.append('name', newCocktail.name);
	formData.append('description', newCocktail.description);
	formData.append('instructions', newCocktail.instructions);
	formData.append('ingredients[]', newCocktail.ingredients[0]);
	console.log(newCocktail.ingredients);
	newCocktail.ingredients.forEach((ingredient) => {
		formData.append('ingredients[]', ingredient);
	});

	// for (const entry of formData.entries()) {
	// 	console.log('FormData entry:', entry);
	// }

	return formData;
}

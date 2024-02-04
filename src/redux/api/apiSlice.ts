import {
	BaseQueryFn,
	FetchArgs,
	FetchBaseQueryError,
	createApi,
	fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import {
	CreateCocktailRequest,
	LoginRequest,
	LoginResponse,
} from '../../types/apiDataTypes';
import { CocktailModel } from '../../types/cocktailModel';
import { getAccessToken, setTokens } from '../../utils/authService';
import { QueryReturnValue } from '@reduxjs/toolkit/dist/query/baseQueryTypes';

const baseQuery = fetchBaseQuery({
	baseUrl: 'https://drink-bar-408108.lm.r.appspot.com',
	prepareHeaders: (headers) => {
		const token = getAccessToken();
		if (token) {
			headers.set('Authorizarion', `Bearer ${token}`);
		}
		return headers;
	},
});

const baseQueryWithReauth: BaseQueryFn<
	string | FetchArgs,
	unknown,
	FetchBaseQueryError
> = async (args, api, extraOptions) => {
	let result: QueryReturnValue<unknown, FetchBaseQueryError, {}> =
		await baseQuery(args, api, extraOptions);

	if (result.error && result.error.status === 401) {
		const refreshResult = await baseQuery('/user/refresh', api, extraOptions);

		if (refreshResult.data) {
			setTokens(refreshResult.data);
			result = await baseQuery(args, api, extraOptions);
		} else {
			console.log('logged out because refresh token expired!');
		}
	}
	return result;
};

export const api = createApi({
	reducerPath: 'api',
	baseQuery: baseQueryWithReauth,
	endpoints: (builder) => ({
		login: builder.mutation<LoginResponse, LoginRequest>({
			query: (user: LoginRequest) => ({
				url: '/user/login',
				method: 'POST',
				body: user,
			}),
		}),
		register: builder.mutation<void, LoginRequest>({
			query: (newUser: LoginRequest) => ({
				url: '/user/register',
				method: 'POST',
				body: newUser,
			}),
		}),
		getCocktails: builder.query<
			Array<CocktailModel>,
			{ query?: string; ownerId?: string }
		>({
			query: ({ query, ownerId }) => ({
				url: '/drink',
				// headers: {
				// 	Authorization: `Bearer ${getAccessToken()}`,
				// },
				params: {
					query,
					userId: ownerId,
				},
			}),
		}),
		getCocktailDetails: builder.query<CocktailModel, string>({
			query: (cocktailId: string) => ({
				url: `drink/${cocktailId}`,
				headers: {
					Authorization: `Bearer ${getAccessToken()}`,
				},
			}),
		}),
		createCocktail: builder.mutation<CocktailModel, CreateCocktailRequest>({
			query: (newCocktail: CreateCocktailRequest) => ({
				url: 'drink',
				method: 'POST',
				// headers: {
				// 	Authorization: `Bearer ${getAccessToken()}`,
				// },
				body: createCocktailRequestToFormData(newCocktail),
			}),
		}),
		deleteCocktail: builder.mutation<null, string>({
			query: (id: string) => ({
				url: `drink/${id}`,
				method: 'DELETE',
				// headers: {
				// 	Authorization: `Bearer ${getAccessToken()}`,
				// },
			}),
		}),

		// getNewAccessToken: builder.mutation<LoginResponse, string>({
		// 	query: (refreshToken: string) => ({
		// 		url: '/user/refresh',
		// 		method: 'POST',
		// 		body: {
		// 			refreshToken,
		// 		},
		// 	}),
		// }),
	}),
});

export const {
	useLoginMutation,
	useGetCocktailsQuery,
	useGetCocktailDetailsQuery,
	// useGetNewAccessTokenMutation,
	useCreateCocktailMutation,
	useDeleteCocktailMutation,
	useRegisterMutation,
} = api;

function createCocktailRequestToFormData(
	newCocktail: CreateCocktailRequest
): FormData {
	const formData = new FormData();
	formData.append('image', newCocktail.img);
	formData.append('name', newCocktail.name);
	formData.append('description', newCocktail.description);
	formData.append('instructions', newCocktail.instructions);
	formData.append('ingredients[]', newCocktail.ingredients[0]);
	console.log(newCocktail.ingredients);
	newCocktail.ingredients.forEach((ingredient) => {
		formData.append('ingredients[]', ingredient);
	});

	return formData;
}

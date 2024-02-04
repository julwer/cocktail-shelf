import {
	BaseQueryFn,
	FetchArgs,
	FetchBaseQueryError,
	FetchBaseQueryMeta,
	createApi,
	fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import {
	CreateCocktailRequest,
	LoginRequest,
	LoginResponse,
} from '../../types/apiDataTypes';
import { CocktailModel } from '../../types/cocktailModel';
import {
	getAccessToken,
	getRefreshToken,
	setTokens,
} from '../../utils/authService';
import { QueryReturnValue } from '@reduxjs/toolkit/dist/query/baseQueryTypes';

const baseQuery = fetchBaseQuery({
	baseUrl: 'https://drink-bar-408108.lm.r.appspot.com',
	prepareHeaders: (headers) => {
		const token = getAccessToken();
		if (token) {
			headers.set('Authorization', `Bearer ${token}`);
		}
		return headers;
	},
});

function createRefreshBaseQuery(refreshToken: string): BaseQueryFn {
return fetchBaseQuery({
	baseUrl: 'https://drink-bar-408108.lm.r.appspot.com',
	method: 'POST',
	body: JSON.stringify({
		refreshToken: refreshToken,
	}),
	headers: {
		'Content-Type': 'application/json',
	},
});
}

const baseQueryWithReauth: BaseQueryFn<
	string | FetchArgs,
	unknown,
	FetchBaseQueryError
> = async (args, api, extraOptions) => {
	let result: QueryReturnValue<
		unknown,
		FetchBaseQueryError,
		FetchBaseQueryMeta
	> = await baseQuery(args, api, extraOptions);
	if (result.error && (result.error.data as any)?.message === 'token_expired') {
		const refreshToken = getRefreshToken();
		if (refreshToken) {
			const refreshBaseQuery = createRefreshBaseQuery(refreshToken);
			const refreshResult = await refreshBaseQuery(
				'/user/refresh',
				api,
				extraOptions
			);

			if (refreshResult.data) {
				setTokens(refreshResult.data);
				result = await baseQuery(args, api, extraOptions);
			}
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
				params: {
					query,
					userId: ownerId,
				},
			}),
		}),
		getCocktailDetails: builder.query<CocktailModel, string>({
			query: (cocktailId: string) => ({
				url: `drink/${cocktailId}`,
			}),
		}),
		createCocktail: builder.mutation<CocktailModel, CreateCocktailRequest>({
			query: (newCocktail: CreateCocktailRequest) => ({
				url: 'drink',
				method: 'POST',
				body: createCocktailRequestToFormData(newCocktail),
			}),
		}),
		deleteCocktail: builder.mutation<null, string>({
			query: (id: string) => ({
				url: `drink/${id}`,
				method: 'DELETE',
	
			}),
		}),
	}),
});

export const {
	useLoginMutation,
	useGetCocktailsQuery,
	useGetCocktailDetailsQuery,
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

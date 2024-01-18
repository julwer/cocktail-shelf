export type LoginRequest = {
	email: string;
	password: string;
};

export type LoginResponse = {
	accessToken: string;
	refreshToken: string;
	expiresIn: number;
};

export type CreateCocktailRequest = {
	img: Blob | string;
	name: string;
	description: string;
	ingredients: string[];
	instructions: string;
};

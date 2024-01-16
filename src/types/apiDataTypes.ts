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
	img: File | null;
	name: string;
	description: string;
	ingredients: Array<string>;
	instructions: string;
};

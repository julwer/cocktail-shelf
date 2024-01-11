import { Url } from "url";

export type CocktailModel = {
	id?: string;
	imageUrl?: Url;
	name?: string;
	description?: string;
	ingredients?: Array<string>;
	ownerId?: string;
};

export interface Categorie {
	uuid: string;
	code: string;
	name: string;
	status: boolean;
}

export interface GetCategoriesPayload {
	page: number;
	limit: number;
}

export interface GetCategoriesResponse {
	categories: Categorie[];
	total: number;
}

export interface CreateCategoriePayload {
	code: string;
	name: string;
	status: boolean;
}

export interface UpdateCategoriePayload {
	uuid: string;
	code: string;
	name: string;
	status: boolean;
}

// API Response types
export interface ApiResponse<T> {
	success: boolean;
	message: string;
	data: T;
}

export interface ApiResponseNoData {
	success: boolean;
	message: string;
}

export type ToolStatus = 'active' | 'inactive';

export interface Tool {
	uuid: string;
	code: string;
	name: string;
	categoryId: string;
	status: ToolStatus;
	image: string | null;
	garageId: string;
	createdAt: string;
	updatedAt: string;
	categoryCode?: string;
	categoryName?: string;
	garageCode?: string;
	garageName?: string;
}

export interface CreateToolPayload {
	code: string;
	name: string;
	categoryId: string;
	status: ToolStatus;
	image: string;
	garageId: string;
}

export interface UpdateToolPayload {
	uuid: string;
	code: string;
	name: string;
	categoryId: string;
	status: ToolStatus;
	image: string;
	garageId: string;
}

export interface GetToolsPayload {
	page: number;
	limit: number;
}

export interface GetToolsResponse {
	toolTypes: Tool[];
	total: number;
}

// API Response types (reutilizando el patrón de categorie)
export interface ApiResponse<T> {
	success: boolean;
	message: string;
	data: T;
}

export interface ApiResponseNoData {
	success: boolean;
	message: string;
}

export interface ApiDeleteResponse {
	success: boolean;
	message: string;
	data: boolean;
}
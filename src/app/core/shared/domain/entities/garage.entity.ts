export interface Garage {
	uuid: string;
	code: string;
	name: string;
	status: boolean;
}

export interface ParamsGetGarages {
	page?: number;
	limit?: number;
}

export interface ApiGetGaragesSuccessResponse {
	success: true;
	message: string;
	data: ApiGetGarageData;
}

export interface ApiGetGarageData {
	garages: Garage[];
	total: number;
	page: number;
	limit: number;
}

export interface ApiErrorResponse {
	success: false;
	statusCode: number;
	message: string | string[];
	timestamp: string;
}

export interface ApiCreateGarageResponse {
	success: boolean;
	message: string;
	data: Garage;
}

export interface ApiFetchGarageUuidSuccessResponse {
	success: true;
	message: string;
	data: Garage;
}

export interface ApiUpdateGarageResponse {
	success: boolean;
	message: string;
	data: Garage;
}

export interface ApiDeleteGarageResponse {
	success: boolean;
	message: string;
}

export type ApiGetGaragesResponse = ApiGetGaragesSuccessResponse | ApiErrorResponse;

export interface CreateGarageRequest {
	code: string;
	name: string;
	status: boolean;
}

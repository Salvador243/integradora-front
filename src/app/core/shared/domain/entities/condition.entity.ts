export interface Condition {
	uuid: string;
	code: string;
	description: string;
	status: boolean;
}

export interface ParamsGetConditions {
	page?: number;
	limit?: number;
}

export interface ApiGetConditionsSuccessResponse {
	success: true;
	message: string;
	data: {
		conditions: Condition[];
		total: number;
	};
}

export interface ApiErrorResponse {
	success: false;
	statusCode: number;
	message: string | string[];
	timestamp: string;
}

export type ApiGetConditionsResponse = ApiGetConditionsSuccessResponse | ApiErrorResponse;

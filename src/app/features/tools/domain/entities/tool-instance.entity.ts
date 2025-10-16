export type ToolInstanceStatus = 'available' | 'assigned' | 'maintenance' | 'lost';

export interface ToolInstance {
	uuid: string;
	toolTypeId: string;
	serialCode: string;
	garageId: string;
	conditionId: string;
	status: ToolInstanceStatus;
	lastAssignedUser: string | null;
	createdAt: string;
	updatedAt: string;
	// Campos opcionales para mostrar en la UI
	toolTypeName?: string;
	garageName?: string;
	conditionDescription?: string;
}

export interface CreateToolInstancePayload {
	toolTypeId: string;
	serialCode: string;
	garageId: string;
	conditionId: string;
	status: ToolInstanceStatus;
	lastAssignedUser?: string;
}

export interface UpdateToolInstancePayload extends CreateToolInstancePayload {
	uuid: string;
}

export interface GetToolInstancesPayload {
	toolTypeId: string;
}

// API Responses
export interface ApiGetToolInstancesSuccessResponse {
	success: true;
	message: string;
	data: {
		toolInstances: ToolInstance[];
		total: number;
	};
}

export interface ApiCreateToolInstanceResponse {
	success: boolean;
	message: string;
	data: ToolInstance;
}

export interface ApiUpdateToolInstanceResponse {
	success: boolean;
	message: string;
	data: ToolInstance;
}

export interface ApiDeleteToolInstanceResponse {
	success: boolean;
	message: string;
}

export interface ApiGetToolInstanceByUuidResponse {
	success: boolean;
	message: string;
	data: ToolInstance;
}

export interface ApiErrorResponse {
	success: false;
	statusCode: number;
	message: string | string[];
	timestamp: string;
}

export type ApiGetToolInstancesResponse = ApiGetToolInstancesSuccessResponse | ApiErrorResponse;

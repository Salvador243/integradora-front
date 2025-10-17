export type AssignmentStatus = 'open' | 'closed';
export type TipoEvento = 'assigned' | 'returned' | 'maintenance' | 'transferred';

export interface Assignment {
	uuid: string;
	toolInstance: {
		uuid: string;
		serialCode: string;
		status: string;
		tooltype: {
			uuid: string;
			code: string;
			name: string;
			status: string;
			image: string;
		}
	}
	userAssigned: string;
	fechaSalida: string;
	fechaRegreso: string | null;
	conditionSalida: {
		uuid: string;
		code: string;
		description: string;
		status: boolean
	}
	conditionRegreso: {
		uuid: string;
		code: string;
		description: string;
		status: boolean
	} | null;
	status: AssignmentStatus;
	tipo_evento?: TipoEvento | null;
	createdAt: string;
}

export interface CreateAssignmentPayload {
	toolInstanceId: string;
	userAssigned: string;
	fechaSalida: string;
	conditionIdSalida: string;
	fechaRegreso?: string | null;
	conditionIdRegreso?: string | null;
	status: AssignmentStatus;
	tipo_evento?: TipoEvento | null;
}

export interface UpdateAssignmentPayload {
	toolInstanceId: string;
	userAssigned: string;
	fechaSalida: string;
	fechaRegreso: string | null;
	conditionIdSalida: string;
	conditionIdRegreso: string | null;
	status: AssignmentStatus;
	tipo_evento?: TipoEvento | null;
}

// API Responses
export interface ApiGetAssignmentsSuccessResponse {
	success: true;
	message: string;
	data: {
		assignments: Assignment[];
		total: number;
	};
}

export interface ApiCreateAssignmentResponse {
	success: boolean;
	message: string;
	data: Assignment;
}

export interface ApiUpdateAssignmentResponse {
	success: boolean;
	message: string;
	data: Assignment;
}

export interface ApiDeleteAssignmentResponse {
	success: boolean;
	message: string;
}

export interface ApiGetAssignmentByUuidResponse {
	success: boolean;
	message: string;
	data: Assignment;
}

export interface ApiErrorResponse {
	success: false;
	statusCode: number;
	message: string | string[];
	timestamp: string;
}

export type ApiGetAssignmentsResponse = ApiGetAssignmentsSuccessResponse | ApiErrorResponse;

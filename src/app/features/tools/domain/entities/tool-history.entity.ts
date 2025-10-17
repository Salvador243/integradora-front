export type TipoEvento = 'assigned' | 'returned' | 'maintenance' | 'transferred';

export interface ToolHistory {
	uuid: string;
	toolInstanceId: string;
	garageId: string;
	userAssigned: string;
	conditionId: string;
	fechaEvento: string;
	tipoEvento: TipoEvento;
	// Campos expandidos del backend
	toolInstanceUuid: string;
	toolInstanceSerialCode: string;
	toolInstanceStatus: string;
	toolTypeCode: string;
	toolTypeName: string;
	garageUuid: string;
	garageCode: string;
	garageName: string;
	conditionUuid: string;
	conditionCode: string;
	conditionDescription: string;
}

export interface ApiGetToolHistoryResponse {
	success: boolean;
	message: string;
	data: ToolHistory[];
}

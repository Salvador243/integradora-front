import {
	ToolInstance,
	CreateToolInstancePayload,
	UpdateToolInstancePayload,
	GetToolInstancesPayload
} from '../entities/tool-instance.entity';

export abstract class HttpToolInstanceRepository {
	abstract getToolInstancesByToolType(payload: GetToolInstancesPayload): Promise<{ toolInstances: ToolInstance[]; total: number }>;
	abstract createToolInstance(payload: CreateToolInstancePayload): Promise<ToolInstance>;
	abstract getToolInstanceByUuid(uuid: string): Promise<ToolInstance>;
	abstract updateToolInstance(payload: UpdateToolInstancePayload): Promise<ToolInstance>;
	abstract deleteToolInstance(uuid: string): Promise<void>;
}

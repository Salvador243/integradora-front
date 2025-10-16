import { Tool, CreateToolPayload, UpdateToolPayload, GetToolsPayload, GetToolsResponse } from '../entities/tool.entity';

export abstract class HttpToolRepository {
	abstract getTools(payload: GetToolsPayload): Promise<GetToolsResponse>;
	abstract createTool(payload: CreateToolPayload): Promise<Tool>;
	abstract updateTool(payload: UpdateToolPayload): Promise<Tool>;
	abstract deleteTool(uuid: string): Promise<void>;
	abstract getToolByUuid(uuid: string): Promise<Tool>;
}

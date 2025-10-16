import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { HttpToolRepository } from "@tools/domain/repositories/http-tool.repository";
import { Tool, CreateToolPayload, UpdateToolPayload, GetToolsPayload, GetToolsResponse, ApiResponse, ApiDeleteResponse } from "@tools/domain/entities/tool.entity";
import { firstValueFrom } from "rxjs";
import { environment } from '../../../../../environments/environment';

@Injectable()
export class ApiToolsRepository implements HttpToolRepository {
	private readonly baseUrl: string = `${environment.apiUrlTools}/tool-types`;

	constructor(private http: HttpClient) {}

	public async getTools(payload: GetToolsPayload): Promise<GetToolsResponse> {
		const url = `${this.baseUrl}/get-all`;
		const response = await firstValueFrom(this.http.get<ApiResponse<GetToolsResponse>>(url, {
			params: {
				page: payload.page,
				limit: payload.limit
			}
		}));
		if (!response.success) {
			throw new Error(Array.isArray(response.message) ? response.message.join(', ') : response.message);
		}
		return response.data;
	}

	public async createTool(payload: CreateToolPayload): Promise<Tool> {
		const url = `${this.baseUrl}/create`;
		const response = await firstValueFrom(this.http.post<ApiResponse<Tool>>(url, payload));
		if (!response.success) {
			throw new Error(Array.isArray(response.message) ? response.message.join(', ') : response.message);
		}
		return response.data;
	}

	public async updateTool(payload: UpdateToolPayload): Promise<Tool> {
		const url = `${this.baseUrl}/update-tool-types/${payload.uuid}`;
		const { uuid, ...form } = payload;
		const response = await firstValueFrom(this.http.put<ApiResponse<Tool>>(url, form));
		if (!response.success) {
			throw new Error(Array.isArray(response.message) ? response.message.join(', ') : response.message);
		}
		return response.data;
	}

	public async deleteTool(uuid: string): Promise<void> {
		const url = `${this.baseUrl}/delete-tool-types/${uuid}`;
		const response = await firstValueFrom(this.http.delete<ApiDeleteResponse>(url));
		if (!response.success) {
			throw new Error(Array.isArray(response.message) ? response.message.join(', ') : response.message);
		}
		return;
	}

	public async getToolByUuid(uuid: string): Promise<Tool> {
		const url = `${this.baseUrl}/get-by-uuid/${uuid}`;
		const response = await firstValueFrom(this.http.get<ApiResponse<Tool>>(url));
		if (!response.success) {
			throw new Error(Array.isArray(response.message) ? response.message.join(', ') : response.message);
		}
		return response.data;
	}
}

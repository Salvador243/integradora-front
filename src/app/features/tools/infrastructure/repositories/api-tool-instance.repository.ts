import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import {
	ToolInstance,
	CreateToolInstancePayload,
	UpdateToolInstancePayload,
	GetToolInstancesPayload,
	ApiGetToolInstancesResponse,
	ApiCreateToolInstanceResponse,
	ApiUpdateToolInstanceResponse,
	ApiDeleteToolInstanceResponse,
	ApiGetToolInstanceByUuidResponse
} from '../../domain/entities/tool-instance.entity';
import { HttpToolInstanceRepository } from '../../domain/repositories/http-tool-instance.repository';

@Injectable()
export class ApiToolInstanceRepository implements HttpToolInstanceRepository {
	private readonly baseUrl: string = `${environment.apiUrlTools}/tool-instances`;

	constructor(private http: HttpClient) {}

	async getAllToolInstances(): Promise<{ toolInstances: ToolInstance[]; total: number }> {
		const url = `${this.baseUrl}/get-all`;
		const response = await firstValueFrom(this.http.get<ApiGetToolInstancesResponse>(url));
		if (!response.success) {
			throw new Error(Array.isArray(response.message) ? response.message.join(', ') : response.message);
		}
		return response.data;
	}

	async getToolInstancesByToolType(payload: GetToolInstancesPayload): Promise<{ toolInstances: ToolInstance[]; total: number }> {
		const url = `${this.baseUrl}/get-by-tool-type/${payload.toolTypeId}`;
		const response = await firstValueFrom(this.http.get<ApiGetToolInstancesResponse>(url));
		if (!response.success) {
			throw new Error(Array.isArray(response.message) ? response.message.join(', ') : response.message);
		}
		return response.data;
	}

	async createToolInstance(payload: CreateToolInstancePayload): Promise<ToolInstance> {
		const url = `${this.baseUrl}/create`;
		const response = await firstValueFrom(this.http.post<ApiCreateToolInstanceResponse>(url, payload));
		if (!response.success) {
			throw new Error(Array.isArray(response.message) ? response.message.join(', ') : response.message);
		}
		return response.data;
	}

	async getToolInstanceByUuid(uuid: string): Promise<ToolInstance> {
		const url = `${this.baseUrl}/get-by-uuid/${uuid}`;
		const response = await firstValueFrom(this.http.get<ApiGetToolInstanceByUuidResponse>(url));
		if (!response.success) {
			throw new Error(Array.isArray(response.message) ? response.message.join(', ') : response.message);
		}
		return response.data;
	}

	async updateToolInstance(payload: UpdateToolInstancePayload): Promise<ToolInstance> {
		const url = `${this.baseUrl}/update-tool-instances/${payload.uuid}`;
		const { uuid, ...body } = payload;
		const response = await firstValueFrom(this.http.put<ApiUpdateToolInstanceResponse>(url, body));
		if (!response.success) {
			throw new Error(Array.isArray(response.message) ? response.message.join(', ') : response.message);
		}
		return response.data;
	}

	async deleteToolInstance(uuid: string): Promise<void> {
		const url = `${this.baseUrl}/delete-tool-instances/${uuid}`;
		const response = await firstValueFrom(this.http.delete<ApiDeleteToolInstanceResponse>(url));
		if (!response.success) {
			throw new Error(Array.isArray(response.message) ? response.message.join(', ') : response.message);
		}
	}
}

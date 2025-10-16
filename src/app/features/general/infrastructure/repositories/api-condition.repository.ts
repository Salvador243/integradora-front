import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import {
	Condition,
	ParamsGetConditions,
	ApiGetConditionsResponse
} from '../../domain/entities/condition.entity';
import { HttpConditionRepository } from '../../domain/repositories/http-condition.repository';

@Injectable()
export class ApiConditionRepository implements HttpConditionRepository {
	private readonly baseUrl: string = `${environment.apiUrlGeneral}/condition`;

	constructor(private http: HttpClient) {}

	async getConditions(params?: ParamsGetConditions): Promise<{ conditions: Condition[]; total: number }> {
		const url = `${this.baseUrl}/get-all`;
		const response = await firstValueFrom(this.http.get<ApiGetConditionsResponse>(url, {
			params: {
				page: params?.page ?? 1,
				limit: params?.limit ?? 100
			}
		}));
		if (!response.success) {
			throw new Error(Array.isArray(response.message) ? response.message.join(', ') : response.message);
		}
		return response.data;
	}
}

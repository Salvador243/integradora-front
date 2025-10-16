import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import {
	ApiCreateGarageResponse,
	ApiDeleteGarageResponse,
	ApiFetchGarageUuidSuccessResponse,
	ApiGetGarageData,
	ApiGetGaragesResponse,
	ApiUpdateGarageResponse,
	CreateGarageRequest,
	Garage,
	ParamsGetGarages
} from '../../domain/entities/garages.entity';
import {
	HttpGarageRepository,
} from '../../domain/repositories/http-garage.repository';


@Injectable()
export class ApiGarageRepository implements HttpGarageRepository{
	private readonly baseUrl: string = `${environment.apiUrlGeneral}/garage`;

	constructor(
		private http: HttpClient
	) {
	}

	public async getGarages(params?: ParamsGetGarages): Promise<ApiGetGarageData>{
		const url = `${this.baseUrl}/get-all`;
		const reponse = await firstValueFrom(this.http.get<ApiGetGaragesResponse>(url, {
			params: {
				page: params?.page ?? 1,
				limit: params?.limit ?? 20
			}
		}))
		if(!reponse.success) {
			throw new Error(Array.isArray(reponse.message) ? reponse.message.join(', ') : reponse.message);
		}
		return reponse.data;
	}

	public async createGarage(payload: CreateGarageRequest): Promise<Garage> {
		const url = `${this.baseUrl}/create`;
		const reponse = await firstValueFrom(this.http.post<ApiCreateGarageResponse>(url, payload));
		if(!reponse.success) {
			throw new Error(Array.isArray(reponse.message) ? reponse.message.join(', ') : reponse.message);
		}
		return reponse.data;
	}

	public async getGarageByUuid(uuid: string): Promise<Garage> {
		const url = `${this.baseUrl}/get-by-uuid/${uuid}`;
		const reponse = await firstValueFrom(this.http.get<ApiFetchGarageUuidSuccessResponse>(url));
		if(!reponse.success) {
			throw new Error(Array.isArray(reponse.message) ? reponse.message.join(', ') : reponse.message);
		}
		return reponse.data;
	}

	public async updateGarage(garage: Garage): Promise<Garage> {
		const url = `${this.baseUrl}/update-garage/${garage.uuid}`;
		const { uuid, ...payload } = garage
		const reponse = await firstValueFrom(this.http.put<ApiUpdateGarageResponse>(url, payload));
		if(!reponse.success) {
			throw new Error(Array.isArray(reponse.message) ? reponse.message.join(', ') : reponse.message);
		}
		return reponse.data;
	}

	public async deleteGarage(uuid: string): Promise<void> {
		const url = `${this.baseUrl}/delete-garage/${uuid}`;
		const reponse = await firstValueFrom(this.http.delete<ApiDeleteGarageResponse>(url));
		if(!reponse.success) {
			throw new Error(Array.isArray(reponse.message) ? reponse.message.join(', ') : reponse.message);
		}
		return;
	}
}

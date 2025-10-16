import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { HttpCategorieRepository } from "@tools/domain/repositories/http-categorie.repository";
import { Categorie, GetCategoriesPayload, GetCategoriesResponse, CreateCategoriePayload, UpdateCategoriePayload, ApiResponse, ApiResponseNoData } from "@tools/domain/entities/categorie.entity";

@Injectable()
export class ApiCategoriesRepository implements HttpCategorieRepository{
	private readonly baseUrl: string = `${environment.apiUrlGeneral}/categorie`;

	constructor(
		private http: HttpClient
	) {
	}

	public async getCategories(payload: GetCategoriesPayload): Promise<GetCategoriesResponse> {
		const url = `${this.baseUrl}/get-all`;
		const reponse = await firstValueFrom(this.http.get<ApiResponse<GetCategoriesResponse>>(url, {
			params: {
				page: payload.page,
				limit: payload.limit
			}
		}));
		if(!reponse.success) {
			throw new Error(Array.isArray(reponse.message) ? reponse.message.join(', ') : reponse.message);
		}
		return reponse.data;
	}

	public async createCategory(payload: CreateCategoriePayload): Promise<Categorie> {
		const url = `${this.baseUrl}/create`;
		const reponse = await firstValueFrom(this.http.post<ApiResponse<Categorie>>(url, payload));
		if(!reponse.success) {
			throw new Error(Array.isArray(reponse.message) ? reponse.message.join(', ') : reponse.message);
		}
		return reponse.data;
	}

	public async updateCategory(payload: UpdateCategoriePayload): Promise<Categorie> {
		const url = `${this.baseUrl}/update-categorie/${payload.uuid}`;
		const { uuid, ...form } = payload;
		const reponse = await firstValueFrom(this.http.put<ApiResponse<Categorie>>(url, form));
		if(!reponse.success) {
			throw new Error(Array.isArray(reponse.message) ? reponse.message.join(', ') : reponse.message);
		}
		return reponse.data;
	}

	public async deleteCategory(uuid: string): Promise<void> {
		const url = `${this.baseUrl}/delete-categorie/${uuid}`;
		const reponse = await firstValueFrom(this.http.delete<ApiResponseNoData>(url));
		if(!reponse.success) {
			throw new Error(Array.isArray(reponse.message) ? reponse.message.join(', ') : reponse.message);
		}
		return;
	}

	public async getCategoryByUuid(uuid: string): Promise<Categorie> {
		const url = `${this.baseUrl}/get-by-uuid/${uuid}`;
		const reponse = await firstValueFrom(this.http.get<ApiResponse<Categorie>>(url));
		if(!reponse.success) {
			throw new Error(Array.isArray(reponse.message) ? reponse.message.join(', ') : reponse.message);
		}
		return reponse.data;
	}
}

import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import {
	ApiCreateAssignmentResponse,
	ApiDeleteAssignmentResponse,
	ApiGetAssignmentByUuidResponse,
	ApiGetAssignmentsResponse,
	ApiUpdateAssignmentResponse,
	CreateAssignmentPayload,
	UpdateAssignmentPayload,
} from '../../domain/entities/assignment.entity';

@Injectable({
	providedIn: 'root',
})
export class AssignmentDatasource {
	private readonly http = inject(HttpClient);
	private readonly baseUrl = `${environment.apiUrlTools}/assignments`;

	getAll(): Observable<ApiGetAssignmentsResponse> {
		return this.http.get<ApiGetAssignmentsResponse>(`${this.baseUrl}/get-all`);
	}

	create(payload: CreateAssignmentPayload): Observable<ApiCreateAssignmentResponse> {
		return this.http.post<ApiCreateAssignmentResponse>(`${this.baseUrl}/create`, payload);
	}

	update(uuid: string, payload: UpdateAssignmentPayload): Observable<ApiUpdateAssignmentResponse> {
		return this.http.put<ApiUpdateAssignmentResponse>(
			`${this.baseUrl}/update-assignments/${uuid}`,
			payload
		);
	}

	delete(uuid: string): Observable<ApiDeleteAssignmentResponse> {
		return this.http.delete<ApiDeleteAssignmentResponse>(
			`${this.baseUrl}/delete-assignments/${uuid}`
		);
	}

	getByUuid(uuid: string): Observable<ApiGetAssignmentByUuidResponse> {
		return this.http.get<ApiGetAssignmentByUuidResponse>(`${this.baseUrl}/get-by-uuid/${uuid}`);
	}
}

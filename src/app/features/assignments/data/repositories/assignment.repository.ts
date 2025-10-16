import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
	ApiCreateAssignmentResponse,
	ApiDeleteAssignmentResponse,
	ApiGetAssignmentByUuidResponse,
	ApiGetAssignmentsResponse,
	ApiUpdateAssignmentResponse,
	CreateAssignmentPayload,
	UpdateAssignmentPayload,
} from '../../domain/entities/assignment.entity';
import { AssignmentDatasource } from '../datasources/assignment.datasource';

@Injectable({
	providedIn: 'root',
})
export class AssignmentRepository {
	private readonly datasource = inject(AssignmentDatasource);

	getAll(): Observable<ApiGetAssignmentsResponse> {
		return this.datasource.getAll();
	}

	create(payload: CreateAssignmentPayload): Observable<ApiCreateAssignmentResponse> {
		return this.datasource.create(payload);
	}

	update(uuid: string, payload: UpdateAssignmentPayload): Observable<ApiUpdateAssignmentResponse> {
		return this.datasource.update(uuid, payload);
	}

	delete(uuid: string): Observable<ApiDeleteAssignmentResponse> {
		return this.datasource.delete(uuid);
	}

	getByUuid(uuid: string): Observable<ApiGetAssignmentByUuidResponse> {
		return this.datasource.getByUuid(uuid);
	}
}

import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AssignmentRepository } from '../../data/repositories/assignment.repository';
import { ApiUpdateAssignmentResponse, UpdateAssignmentPayload } from '../entities/assignment.entity';

@Injectable({
	providedIn: 'root',
})
export class UpdateAssignmentUseCase {
	private readonly repository = inject(AssignmentRepository);

	execute(uuid: string, payload: UpdateAssignmentPayload): Observable<ApiUpdateAssignmentResponse> {
		return this.repository.update(uuid, payload);
	}
}

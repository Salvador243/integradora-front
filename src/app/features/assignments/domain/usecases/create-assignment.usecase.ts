import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AssignmentRepository } from '../../data/repositories/assignment.repository';
import { ApiCreateAssignmentResponse, CreateAssignmentPayload } from '../entities/assignment.entity';

@Injectable({
	providedIn: 'root',
})
export class CreateAssignmentUseCase {
	private readonly repository = inject(AssignmentRepository);

	execute(payload: CreateAssignmentPayload): Observable<ApiCreateAssignmentResponse> {
		return this.repository.create(payload);
	}
}

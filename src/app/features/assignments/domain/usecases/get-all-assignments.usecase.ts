import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AssignmentRepository } from '../../data/repositories/assignment.repository';
import { ApiGetAssignmentsResponse } from '../entities/assignment.entity';

@Injectable({
	providedIn: 'root',
})
export class GetAllAssignmentsUseCase {
	private readonly repository = inject(AssignmentRepository);

	execute(): Observable<ApiGetAssignmentsResponse> {
		return this.repository.getAll();
	}
}

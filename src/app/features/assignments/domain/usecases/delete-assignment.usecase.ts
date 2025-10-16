import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AssignmentRepository } from '../../data/repositories/assignment.repository';
import { ApiDeleteAssignmentResponse } from '../entities/assignment.entity';

@Injectable({
	providedIn: 'root',
})
export class DeleteAssignmentUseCase {
	private readonly repository = inject(AssignmentRepository);

	execute(uuid: string): Observable<ApiDeleteAssignmentResponse> {
		return this.repository.delete(uuid);
	}
}

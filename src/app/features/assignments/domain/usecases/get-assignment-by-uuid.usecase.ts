import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AssignmentRepository } from '../../data/repositories/assignment.repository';
import { ApiGetAssignmentByUuidResponse } from '../entities/assignment.entity';

@Injectable({
	providedIn: 'root',
})
export class GetAssignmentByUuidUseCase {
	private readonly repository = inject(AssignmentRepository);

	execute(uuid: string): Observable<ApiGetAssignmentByUuidResponse> {
		return this.repository.getByUuid(uuid);
	}
}

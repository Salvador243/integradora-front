import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpToolHistoryRepository } from '../../../domain/repositories/http-tool-history.repository';
import { ApiGetToolHistoryResponse } from '../../../domain/entities/tool-history.entity';

@Injectable({
	providedIn: 'root',
})
export class GetToolHistoryUseCase {
	private readonly toolHistoryRepository = inject(HttpToolHistoryRepository);

	execute(toolInstanceId: string): Observable<ApiGetToolHistoryResponse> {
		return this.toolHistoryRepository.getByToolInstance(toolInstanceId);
	}
}

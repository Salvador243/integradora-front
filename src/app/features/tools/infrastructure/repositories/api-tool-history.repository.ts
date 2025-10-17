import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { HttpToolHistoryRepository } from '../../domain/repositories/http-tool-history.repository';
import { ApiGetToolHistoryResponse } from '../../domain/entities/tool-history.entity';

@Injectable({
	providedIn: 'root',
})
export class ApiToolHistoryRepository extends HttpToolHistoryRepository {
	private readonly apiUrl = `${environment.apiUrlTools}/tool-history`;

	constructor(private readonly http: HttpClient) {
		super();
	}

	getByToolInstance(toolInstanceId: string): Observable<ApiGetToolHistoryResponse> {
		return this.http.get<ApiGetToolHistoryResponse>(
			`${this.apiUrl}/get-by-tool-instance/${toolInstanceId}`
		);
	}
}

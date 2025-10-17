import { Observable } from 'rxjs';
import { ApiGetToolHistoryResponse } from '../entities/tool-history.entity';

export abstract class HttpToolHistoryRepository {
	abstract getByToolInstance(toolInstanceId: string): Observable<ApiGetToolHistoryResponse>;
}

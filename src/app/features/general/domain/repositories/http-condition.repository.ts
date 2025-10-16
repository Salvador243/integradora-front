import { Condition, ParamsGetConditions } from '../entities/condition.entity';

export abstract class HttpConditionRepository {
	abstract getConditions(params?: ParamsGetConditions): Promise<{ conditions: Condition[]; total: number }>;
}

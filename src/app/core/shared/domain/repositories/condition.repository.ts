import { Condition, ParamsGetConditions } from '../entities/condition.entity';

export abstract class ConditionRepository {
	abstract getConditions(params?: ParamsGetConditions): Promise<{ conditions: Condition[]; total: number }>;
}

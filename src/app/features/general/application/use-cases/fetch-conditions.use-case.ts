import { Injectable } from "@angular/core";
import { HttpConditionRepository } from "../../domain/repositories/http-condition.repository";
import { Condition } from "../../domain/entities/condition.entity";

@Injectable()
export class FetchConditionsUseCase {
	constructor(private readonly conditionRepository: HttpConditionRepository) {}

	async execute(): Promise<{ conditions: Condition[]; total: number }> {
		return await this.conditionRepository.getConditions();
	}
}

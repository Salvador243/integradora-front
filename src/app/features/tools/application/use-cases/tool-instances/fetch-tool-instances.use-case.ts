import { Injectable } from "@angular/core";
import { HttpToolInstanceRepository } from "../../../domain/repositories/http-tool-instance.repository";
import { ToolInstance, GetToolInstancesPayload } from "../../../domain/entities/tool-instance.entity";

@Injectable()
export class FetchToolInstancesUseCase {
	constructor(private readonly toolInstanceRepository: HttpToolInstanceRepository) {}

	async execute(payload: GetToolInstancesPayload): Promise<{ toolInstances: ToolInstance[]; total: number }> {
		return await this.toolInstanceRepository.getToolInstancesByToolType(payload);
	}
}

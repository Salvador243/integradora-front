import { Injectable } from "@angular/core";
import { HttpToolInstanceRepository } from "../../../domain/repositories/http-tool-instance.repository";
import { ToolInstance } from "../../../domain/entities/tool-instance.entity";

@Injectable()
export class FetchAllToolInstancesUseCase {
	constructor(private readonly toolInstanceRepository: HttpToolInstanceRepository) {}

	async execute(): Promise<{ toolInstances: ToolInstance[]; total: number }> {
		return await this.toolInstanceRepository.getAllToolInstances();
	}
}

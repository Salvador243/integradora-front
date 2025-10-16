import { Injectable } from "@angular/core";
import { HttpToolInstanceRepository } from "../../../domain/repositories/http-tool-instance.repository";
import { ToolInstance } from "../../../domain/entities/tool-instance.entity";

@Injectable()
export class GetToolInstanceByUuidUseCase {
	constructor(private readonly toolInstanceRepository: HttpToolInstanceRepository) {}

	async execute(uuid: string): Promise<ToolInstance> {
		return await this.toolInstanceRepository.getToolInstanceByUuid(uuid);
	}
}

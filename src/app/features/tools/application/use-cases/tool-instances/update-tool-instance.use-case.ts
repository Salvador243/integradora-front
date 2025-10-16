import { Injectable } from "@angular/core";
import { HttpToolInstanceRepository } from "../../../domain/repositories/http-tool-instance.repository";
import { ToolInstance, UpdateToolInstancePayload } from "../../../domain/entities/tool-instance.entity";

@Injectable()
export class UpdateToolInstanceUseCase {
	constructor(private readonly toolInstanceRepository: HttpToolInstanceRepository) {}

	async execute(payload: UpdateToolInstancePayload): Promise<ToolInstance> {
		return await this.toolInstanceRepository.updateToolInstance(payload);
	}
}

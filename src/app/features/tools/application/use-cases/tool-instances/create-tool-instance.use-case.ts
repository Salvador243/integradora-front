import { Injectable } from "@angular/core";
import { HttpToolInstanceRepository } from "../../../domain/repositories/http-tool-instance.repository";
import { ToolInstance, CreateToolInstancePayload } from "../../../domain/entities/tool-instance.entity";

@Injectable()
export class CreateToolInstanceUseCase {
	constructor(private readonly toolInstanceRepository: HttpToolInstanceRepository) {}

	async execute(payload: CreateToolInstancePayload): Promise<ToolInstance> {
		return await this.toolInstanceRepository.createToolInstance(payload);
	}
}

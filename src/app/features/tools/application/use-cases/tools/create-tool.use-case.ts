import { Injectable } from "@angular/core";
import { HttpToolRepository } from "@tools/domain/repositories/http-tool.repository";
import { Tool, CreateToolPayload } from "@tools/domain/entities/tool.entity";

@Injectable()
export class CreateToolUseCase {
	constructor(private readonly toolRepository: HttpToolRepository) {}

	public async execute(payload: CreateToolPayload): Promise<Tool> {
		return await this.toolRepository.createTool(payload);
	}
}

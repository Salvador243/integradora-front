import { Injectable } from "@angular/core";
import { HttpToolRepository } from "@tools/domain/repositories/http-tool.repository";
import { Tool, UpdateToolPayload } from "@tools/domain/entities/tool.entity";

@Injectable()
export class UpdateToolUseCase {
	constructor(private readonly toolRepository: HttpToolRepository) {}

	public async execute(payload: UpdateToolPayload): Promise<Tool> {
		return await this.toolRepository.updateTool(payload);
	}
}

import { Injectable } from "@angular/core";
import { HttpToolRepository } from "@tools/domain/repositories/http-tool.repository";
import { Tool } from "@tools/domain/entities/tool.entity";

@Injectable()
export class GetToolByUuidUseCase {
	constructor(private readonly toolRepository: HttpToolRepository) {}

	public async execute(uuid: string): Promise<Tool> {
		return await this.toolRepository.getToolByUuid(uuid);
	}
}

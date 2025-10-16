import { Injectable } from "@angular/core";
import { HttpToolRepository } from "@tools/domain/repositories/http-tool.repository";
import { GetToolsPayload, GetToolsResponse } from "@tools/domain/entities/tool.entity";

@Injectable()
export class FetchToolsUseCase {
	constructor(private readonly toolRepository: HttpToolRepository) {}

	public async execute(payload: GetToolsPayload): Promise<GetToolsResponse> {
		return await this.toolRepository.getTools(payload);
	}
}

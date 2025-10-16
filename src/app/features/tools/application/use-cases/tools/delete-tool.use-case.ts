import { Injectable } from "@angular/core";
import { HttpToolRepository } from "@tools/domain/repositories/http-tool.repository";

@Injectable()
export class DeleteToolUseCase {
	constructor(private readonly toolRepository: HttpToolRepository) {}

	public async execute(uuid: string): Promise<void> {
		return await this.toolRepository.deleteTool(uuid);
	}
}

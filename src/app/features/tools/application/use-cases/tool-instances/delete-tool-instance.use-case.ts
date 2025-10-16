import { Injectable } from "@angular/core";
import { HttpToolInstanceRepository } from "../../../domain/repositories/http-tool-instance.repository";

@Injectable()
export class DeleteToolInstanceUseCase {
	constructor(private readonly toolInstanceRepository: HttpToolInstanceRepository) {}

	async execute(uuid: string): Promise<void> {
		return await this.toolInstanceRepository.deleteToolInstance(uuid);
	}
}

import {Injectable} from '@angular/core';
import {HttpGarageRepository} from "../../domain/repositories/http-garage.repository";

@Injectable()
export class DeleteGarageUseCase {
	constructor(private readonly garageRepository: HttpGarageRepository) {}

	public async execute(uuid: string): Promise<void> {
		await this.garageRepository.deleteGarage(uuid);
		return;
	}
}

import { Injectable } from "@angular/core";
import { HttpGarageRepository } from "../../domain/repositories/http-garage.repository";
import { Garage } from "../../domain/entities/garages.entity";

@Injectable()
export class UpdateGarageUseCase {
	constructor(private readonly garageRepository: HttpGarageRepository) {}

	public async execute(garage: Garage): Promise<void> {
		await this.garageRepository.updateGarage(garage);
	}
}

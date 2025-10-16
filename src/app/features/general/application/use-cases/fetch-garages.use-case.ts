import { Injectable } from "@angular/core";
import { HttpGarageRepository } from "../../domain/repositories/http-garage.repository";
import { ApiGetGarageData } from "../../domain/entities/garages.entity";

@Injectable()
export class FetchGaragesUseCase {
	constructor(private readonly garageRepository: HttpGarageRepository) {}

	public async execute(): Promise<ApiGetGarageData> {
		// Sin paginación, traer todos los garages
		return await this.garageRepository.getGarages();
	}
}

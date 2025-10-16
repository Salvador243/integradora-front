import {Injectable} from "@angular/core";
import {Garage} from "../../domain/entities/garages.entity";
import {HttpGarageRepository} from "../../domain/repositories/http-garage.repository";

@Injectable()
export class FetchGarageUuidUseCase {
	constructor(private readonly garageRepository: HttpGarageRepository) {
	}

	public async execute(uuid: string): Promise<Garage> {
		return await this.garageRepository.getGarageByUuid(uuid);
	}
}

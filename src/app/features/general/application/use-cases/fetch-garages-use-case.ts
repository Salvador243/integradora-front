import { Injectable } from '@angular/core';
import { HttpGarageRepository } from '../../domain/repositories/http-garage.repository';
import { ApiGetGarageData, ParamsGetGarages } from '../../domain/entities/garages.entity';

@Injectable()
export class FetchGaragesUseCase {
	constructor(private readonly garageRepository: HttpGarageRepository) {}

	public async execute(params: ParamsGetGarages): Promise<ApiGetGarageData> {
		return await this.garageRepository.getGarages(params);
	}
}

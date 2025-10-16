import { Injectable } from '@angular/core';
import { CreateGarageRequest, Garage } from '../../domain/entities/garages.entity';
import { HttpGarageRepository } from '../../domain/repositories/http-garage.repository';

@Injectable()
export class CreateGarageUseCase {
	constructor(
		private readonly garageRepository: HttpGarageRepository
	) {}
	public async execute(payload: CreateGarageRequest): Promise<Garage> {
		return await this.garageRepository.createGarage(payload);
	}
}

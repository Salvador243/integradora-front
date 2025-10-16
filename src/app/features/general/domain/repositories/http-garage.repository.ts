import { ApiGetGarageData, CreateGarageRequest, Garage, ParamsGetGarages } from '../entities/garages.entity';

export abstract class HttpGarageRepository {
	abstract getGarages(params?: ParamsGetGarages): Promise<ApiGetGarageData>;
	abstract createGarage(payload: CreateGarageRequest): Promise<Garage>;
	abstract getGarageByUuid(uuid: string): Promise<Garage>;
	abstract updateGarage(garage: Garage): Promise<Garage>;
	abstract deleteGarage(uuid: string): Promise<void>;
}

import { Injectable, signal, computed, inject } from '@angular/core';
import { Garage } from '../../domain/entities/garages.entity';
import { CreateGarageUseCase } from '../../application/use-cases/create-garage.use-case';
import { UpdateGarageUseCase } from '../../application/use-cases/update-garage.use-case';
import { DeleteGarageUseCase } from '../../application/use-cases/delete-garage.use-case';

@Injectable()
export class GarageStateService {
	private readonly _garages = signal<Garage[]>([]);
	private readonly _shouldReload = signal<boolean>(false);
	private readonly _garageSelected = signal<Garage | undefined>(undefined);

	private readonly createGarageUseCase = inject(CreateGarageUseCase);
	private readonly updateGarageUseCase = inject(UpdateGarageUseCase);
	private readonly deleteGarageUseCase = inject(DeleteGarageUseCase);

	public readonly garages = computed(() => this._garages());
	public readonly shouldReload = computed(() => this._shouldReload());
	public readonly garageSelected = computed(() => this._garageSelected());

	selectGarage(garage: Garage | undefined): void {
		this._garageSelected.set(garage);
	}

	updateGarages(garages: Garage[]): void {
		this._garages.set(garages);
	}

	triggerReload(): void {
		this._shouldReload.set(true);
	}

	resetReloadFlag(): void {
		this._shouldReload.set(false);
	}

	async createGarage(garageData: Omit<Garage, 'uuid'>): Promise<void> {
		await this.createGarageUseCase.execute(garageData);
		this.triggerReload();
	}

	async updateGarage(garageData: Garage): Promise<void> {
		await this.updateGarageUseCase.execute(garageData);
		this.triggerReload();
	}

	async saveGarage(garageData: Omit<Garage, 'uuid'>, uuid?: string): Promise<void> {
		if (uuid) {
			await this.updateGarage({ ...garageData, uuid });
		} else {
			await this.createGarage(garageData);
		}
	}

	async deleteGarage(uuid: string): Promise<void> {
		if (!uuid) return;
		console.log('paso por el servicio :', uuid);
		await this.deleteGarageUseCase.execute(uuid);
		this.triggerReload();
	}

	clearSelection(): void {
		this._garageSelected.set(undefined);
	}
}

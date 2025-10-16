import { CommonModule } from '@angular/common';
import { Component, effect, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FetchGarageUuidUseCase } from '../../../application/use-cases/fetch-garage-uuid.use-case';
import { FetchGaragesUseCase } from '../../../application/use-cases/fetch-garages-use-case';
import { Garage } from '../../../domain/entities/garages.entity';
import PRIMENG_IMPORTS from '../../provider/primeng.components';
import { GarageStateService } from '../../services/garage-state.service';

@Component({
	selector: 'general-garage-list',
	standalone: true,
	templateUrl: './garage-list.component.html',
	imports: [...PRIMENG_IMPORTS, CommonModule, FormsModule],
})

export class GarageListComponent implements OnInit {
	private readonly getGaragesUseCase = inject(FetchGaragesUseCase);
	private readonly garageStateService = inject(GarageStateService);
	private readonly fetchGarageUuidUseCase = inject(FetchGarageUuidUseCase);

	public garages: Garage[] = []
	public page: number = 1;
	public limit: number = 20
	@Output()
	changeTab: EventEmitter<string> = new EventEmitter<string>();

	constructor() {
		effect(() => {
			if (this.garageStateService.shouldReload()) {
				this.loadGarages();
				this.garageStateService.resetReloadFlag();
			}
		});
	}

	async ngOnInit(): Promise<void> {
		await this.loadGarages()
	}

	private async loadGarages(): Promise<void> {
		const response = await this.getGaragesUseCase.execute({
			page: this.page,
			limit: this.limit
		})
		this.garages = response.garages ?? [];
		this.garageStateService.updateGarages(this.garages);
	}

	public async fetchGarageByUuid(uuid: string): Promise<void>{
		const response = await this.fetchGarageUuidUseCase.execute(uuid);
		if (response) {
			this.garageStateService.selectGarage(response);
			this.changeTab.emit('form');
		}
	}

	public async onDeleteGarage(uuid: string): Promise<void>{
		await this.garageStateService.deleteGarage(uuid);
	}
}

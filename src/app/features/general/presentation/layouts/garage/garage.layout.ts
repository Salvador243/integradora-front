import { Component, inject } from '@angular/core';
import { CreateGarageUseCase } from '../../../application/use-cases/create-garage.use-case';
import { DeleteGarageUseCase } from '../../../application/use-cases/delete-garage.use-case';
import { FetchGarageUuidUseCase } from '../../../application/use-cases/fetch-garage-uuid.use-case';
import { FetchGaragesUseCase } from '../../../application/use-cases/fetch-garages-use-case';
import { UpdateGarageUseCase } from '../../../application/use-cases/update-garage.use-case';
import { infrastructureProviders } from '../../../infrastructure/di/provider';
import { GarageFormComponent } from '../../components/garage-form/garage-form.component';
import { GarageListComponent } from '../../components/garages-list/garage-list.component';
import PRIMENG_IMPORTS from '../../provider/primeng.components';
import { GarageStateService } from '../../services/garage-state.service';

@Component({
	selector: 'general-garage-layout',
	standalone: true,
	templateUrl: './garage.layout.html',
	imports: [PRIMENG_IMPORTS, GarageListComponent, GarageFormComponent],
	providers: [
		...infrastructureProviders,
		CreateGarageUseCase,
		UpdateGarageUseCase,
		DeleteGarageUseCase,
		FetchGaragesUseCase,
		FetchGarageUuidUseCase,
		GarageStateService,
	]
})
export class GarageLayoutComponent {
	public activeTab: string = 'list';
	private readonly garageStateService = inject(GarageStateService);

	public tabs = [
		{ value: 'list', label: 'Listado', icon: 'pi pi-list' },
		{ value: 'form', label: 'Taller', icon: 'pi pi-wrench' },
	];

	public onChangeTab(tab: string): void {
		this.activeTab = tab;
		if(tab === 'list'){
			this.garageStateService.selectGarage(undefined);
		}
	}
}

import { Component, inject, OnInit } from '@angular/core';
import PRIMENG_IMPORTS from '../../provider/primeng.components';
import { ToolInstanceListComponent } from '../../components/tool-instance-list/tool-instance-list.component';
import { ToolInstanceFormComponent } from '../../components/tool-instance-form/tool-instance-form.component';
import { ToolInstanceStateService } from '@tools/presentation/services/tool-instance-state.service';
import { CreateToolInstanceUseCase } from '@tools/application/use-cases/tool-instances/create-tool-instance.use-case';
import { UpdateToolInstanceUseCase } from '@tools/application/use-cases/tool-instances/update-tool-instance.use-case';
import { DeleteToolInstanceUseCase } from '@tools/application/use-cases/tool-instances/delete-tool-instance.use-case';
import { FetchToolInstancesUseCase } from '@tools/application/use-cases/tool-instances/fetch-tool-instances.use-case';
import { GetToolInstanceByUuidUseCase } from '@tools/application/use-cases/tool-instances/get-tool-instance-by-uuid.use-case';
import { FetchConditionsUseCase } from '@general/application/use-cases/fetch-conditions.use-case';
import { FetchGaragesUseCase } from '@general/application/use-cases/fetch-garages.use-case';
import { infrastructureProviders } from '@tools/infrastructure/di/provider';
import { infrastructureProviders as generalInfrastructureProviders } from '@general/infrastructure/di/provider';

@Component({
	selector: 'tools-tool-instances-layout',
	standalone: true,
	templateUrl: './tool-instances.layout.html',
	providers: [
		// Service centralizado (usa todos los use-cases)
		ToolInstanceStateService,
		
		// Use cases de Tool Instances
		CreateToolInstanceUseCase,
		UpdateToolInstanceUseCase,
		DeleteToolInstanceUseCase,
		FetchToolInstancesUseCase,
		GetToolInstanceByUuidUseCase,
		
		// Use cases de Conditions (cross-project para el form)
		FetchConditionsUseCase,
		
		// Use cases de Garages (cross-project para el form)
		FetchGaragesUseCase,
		
		// Repositorios
		...infrastructureProviders,
		...generalInfrastructureProviders,
	],
	imports: [PRIMENG_IMPORTS, ToolInstanceListComponent, ToolInstanceFormComponent],
})
export class ToolInstancesLayoutComponent implements OnInit {
	public activeTab: string = 'list';
	private readonly toolInstanceStateService = inject(ToolInstanceStateService);

	public tabs = [
		{ value: 'list', label: 'Listado', icon: 'pi pi-list' },
		{ value: 'form', label: 'Instancia', icon: 'pi pi-box' },
	];

	ngOnInit(): void {
		this.toolInstanceStateService.clearSelection();
	}

	public onChangeTab(tab: string): void {
		this.activeTab = tab;
		if (tab === 'list') {
			this.toolInstanceStateService.clearSelection();
		}
	}
}

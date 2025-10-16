import { Component, inject } from '@angular/core';
import PRIMENG_IMPORTS from '../../provider/primeng.components';
import { ToolListComponent } from '../../components/tool-list/tool-list.component';
import { ToolFormComponent } from '../../components/tool-form/tool-form.component';
import { ToolStateService } from '@tools/presentation/services/tool-state.service';
import { CreateToolUseCase } from '@tools/application/use-cases/tools/create-tool.use-case';
import { UpdateToolUseCase } from '@tools/application/use-cases/tools/update-tool.use-case';
import { DeleteToolUseCase } from '@tools/application/use-cases/tools/delete-tool.use-case';
import { FetchToolsUseCase } from '@tools/application/use-cases/tools/fetch-tools.use-case';
import { GetToolByUuidUseCase } from '@tools/application/use-cases/tools/get-tool-by-uuid.use-case';
import { FetchCategorieUseCase } from '@tools/application/use-cases/fetch-categorie.use-case';
import { FetchGaragesUseCase } from '@general/application/use-cases/fetch-garages.use-case';
import { infrastructureProviders } from '@tools/infrastructure/di/provider';
import { infrastructureProviders as generalInfrastructureProviders } from '@general/infrastructure/di/provider';

@Component({
	selector: 'tools-tools-layout',
	standalone: true,
	templateUrl: './tools.layout.html',
	providers: [
		// Service centralizado (usa todos los use-cases)
		ToolStateService,
		
		// Use cases de Tools
		CreateToolUseCase,
		UpdateToolUseCase,
		DeleteToolUseCase,
		FetchToolsUseCase,
		GetToolByUuidUseCase,
		
		// Use cases de Categories (para el form)
		FetchCategorieUseCase,
		
		// Use cases de Garages (cross-project para el form)
		FetchGaragesUseCase,
		
		// Repositorios
		...infrastructureProviders,
		...generalInfrastructureProviders,
	],
	imports: [PRIMENG_IMPORTS, ToolListComponent, ToolFormComponent],
})
export class ToolsLayoutComponent {
	public activeTab: string = 'list';
	private readonly toolStateService = inject(ToolStateService);

	public tabs = [
		{ value: 'list', label: 'Listado', icon: 'pi pi-list' },
		{ value: 'form', label: 'Herramienta', icon: 'pi pi-wrench' },
	];

	public onChangeTab(tab: string): void {
		this.activeTab = tab;
		if (tab === 'list') {
			this.toolStateService.clearSelection();
		}
	}
}

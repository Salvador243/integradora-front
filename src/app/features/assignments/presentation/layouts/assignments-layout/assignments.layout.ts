import { Component, inject } from '@angular/core';
import PRIMENG_IMPORTS from '../../provider/primeng.components';
import { AssignmentListComponent } from '../../components/assignment-list/assignment-list.component';
import { AssignmentFormComponent } from '../../components/assignment-form/assignment-form.component';
import { FetchConditionsUseCase } from '@general/application/use-cases/fetch-conditions.use-case';
import { infrastructureProviders } from '@general/infrastructure/di/provider';
import { FetchToolInstancesUseCase } from '@tools/application/use-cases/tool-instances/fetch-tool-instances.use-case';
import { FetchAllToolInstancesUseCase } from '@tools/application/use-cases/tool-instances/fetch-all-tool-instances.use-case';
import { infrastructureProviders as toolInfrastructureProviders } from '@tools/infrastructure/di/provider';
import { AssignmentStateService } from '../../services/assignment-state.service';

@Component({
	selector: 'assignments-layout',
	standalone: true,
	templateUrl: './assignments.layout.html',
	imports: [PRIMENG_IMPORTS, AssignmentListComponent, AssignmentFormComponent],
	providers: [
		FetchToolInstancesUseCase,
		FetchAllToolInstancesUseCase,
		FetchConditionsUseCase,
		...infrastructureProviders,
		...toolInfrastructureProviders
	],
})
export class AssignmentsLayoutComponent {
	public readonly assignmentStateService = inject(AssignmentStateService);
	public activeTab: string = 'list';

	public tabs = [
		{ value: 'list', label: 'Listado', icon: 'pi pi-list' },
		{ value: 'form', label: 'Asignación', icon: 'pi pi-user-plus' },
	];

	public onChangeTab(tab: string): void {
		this.activeTab = tab;
		if (tab === 'list') {
			// Trigger reload when returning to list
			this.assignmentStateService.triggerReload();
		}
	}
}

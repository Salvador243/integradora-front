import { Component, inject } from '@angular/core';
import PRIMENG_IMPORTS from '../../provider/primeng.components';
import { CategorieListComponent } from '../../components/categorie-list/categorie-list.component';
import { CategorieFormComponent } from '../../components/categorie-form/categorie-form.component';
import { CategorieStateService } from '@tools/presentation/services/categorie-state.service';
import { CreateCategorieUseCase } from '@tools/application/use-cases/create-categorie.use-case';
import { UpdateCategorieUseCase } from '@tools/application/use-cases/update-categorie.use.case';
import { DeleteUseCase } from '@tools/application/use-cases/delete.use-case';
import { FetchCategorieUseCase } from '@tools/application/use-cases/fetch-categorie.use-case';
import { GetByUuidUseCase } from '@tools/application/use-cases/get-by-uuid.use-case';
import { infrastructureProviders } from '@tools/infrastructure/di/provider';

@Component({
	selector: 'general-categories-layout',
	standalone: true,
	templateUrl: './categories.layout.html',
	providers: [
		CategorieStateService,
		CreateCategorieUseCase,
		UpdateCategorieUseCase,
		DeleteUseCase,
		FetchCategorieUseCase,
		GetByUuidUseCase,
		...infrastructureProviders,
	],
	imports: [PRIMENG_IMPORTS, CategorieListComponent, CategorieFormComponent],

})
export class CategoriesLayoutComponent {
	public activeTab: string = 'list';
	private readonly categorieStateService = inject(CategorieStateService);

	public tabs = [
		{ value: 'list', label: 'Listado', icon: 'pi pi-list' },
		{ value: 'form', label: 'Categoria', icon: 'pi pi-th-large' },
	];

	public onChangeTab(tab: string): void {
		this.activeTab = tab;
		if(tab === 'list'){
			this.categorieStateService.selectCategorie(undefined);
		}
	}
}

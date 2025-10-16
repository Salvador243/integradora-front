import { Component, effect, EventEmitter, inject, OnInit, Output } from '@angular/core';
import PRIMENG_IMPORTS from '../../provider/primeng.components';
import { Categorie } from '../../../domain/entities/categorie.entity';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FetchCategorieUseCase } from '@tools/application/use-cases/fetch-categorie.use-case';
import { CategorieStateService } from '../../services/categorie-state.service';
import { GetByUuidUseCase } from '@tools/application/use-cases/get-by-uuid.use-case';

@Component({
	selector: 'tools-categorie-list',
	standalone: true,
	templateUrl: './categorie-list.component.html',
	imports: [...PRIMENG_IMPORTS, CommonModule, FormsModule],
})

export class CategorieListComponent implements OnInit{
	private readonly fetchCategorieUseCase = inject(FetchCategorieUseCase);
	private readonly categorieStateService = inject(CategorieStateService);
	private readonly fetchCategorieUuidUseCase = inject(GetByUuidUseCase);

	public page: number = 1;
	public limit: number = 20;
	public categories: Categorie[] = [];
	@Output()
	changeTab: EventEmitter<string> = new EventEmitter<string>();


	ngOnInit(): void {
		this.loadCategories();
	}

	constructor() {
		effect(() => {
			if (this.categorieStateService.shouldReload()) {
				this.loadCategories();
				this.categorieStateService.resetReloadFlag();
			}
		});
	}


	private async loadCategories(): Promise<void> {
		const response = await this.fetchCategorieUseCase.execute({
			page: this.page,
			limit: this.limit
		});
		this.categories = response.categories
	}

	public async fetchCategorieByUuid(uuid: string): Promise<void>{
		const response = await this.fetchCategorieUuidUseCase.execute(uuid);
		if (response) {
			this.categorieStateService.selectCategorie(response);
			this.changeTab.emit('form');
		}
	}

	public async onDeleteCategorie(uuid: string): Promise<void>{
		await this.categorieStateService.deleteCategorie(uuid);
	}

}

import { Injectable, computed, inject, signal } from "@angular/core";
import { CreateCategorieUseCase } from "@tools/application/use-cases/create-categorie.use-case";
import { DeleteUseCase } from "@tools/application/use-cases/delete.use-case";
import { UpdateCategorieUseCase } from "@tools/application/use-cases/update-categorie.use.case";
import { Categorie, CreateCategoriePayload, UpdateCategoriePayload } from "@tools/domain/entities/categorie.entity";

@Injectable()
export class CategorieStateService {
	private readonly _categories = signal<Categorie[]>([]);
	private readonly _shouldReload = signal<boolean>(false);
	private readonly _categorieSelected = signal<Categorie | undefined>(undefined);

	private readonly createCategorieUseCase = inject(CreateCategorieUseCase);
	private readonly updateCategorieUseCase = inject(UpdateCategorieUseCase);
	private readonly deleteCategorieUseCase = inject(DeleteUseCase);

	public readonly categories = computed(() => this._categories());
	public readonly shouldReload = computed(() => this._shouldReload());
	public readonly categorieSelected = computed(() => this._categorieSelected());

	selectCategorie(categorie: Categorie | undefined): void {
		this._categorieSelected.set(categorie);
	}

	updateCategories(categories: Categorie[]): void {
		this._categories.set(categories);
	}

	triggerReload(): void {
		this._shouldReload.set(true);
	}

	resetReloadFlag(): void {
		this._shouldReload.set(false);
	}

	async createCategorie(categorieData: CreateCategoriePayload): Promise<Categorie> {
		const result = await this.createCategorieUseCase.execute(categorieData);
		this.triggerReload();
		return result;
	}

	async updateCategorie(categorieData: UpdateCategoriePayload): Promise<Categorie> {
		const result = await this.updateCategorieUseCase.execute(categorieData);
		this.triggerReload();
		return result;
	}

	async deleteCategorie(uuid: string): Promise<void> {
		await this.deleteCategorieUseCase.execute(uuid);
		this.triggerReload();
	}

	async saveCategorie(categorieData: CreateCategoriePayload, uuid?: string): Promise<Categorie> {
		if (uuid) {
			return await this.updateCategorie({ ...categorieData, uuid });
		} else {
			return await this.createCategorie(categorieData);
		}
	}

	clearSelection(): void {
		this._categorieSelected.set(undefined);
	}

}

import { Injectable } from "@angular/core";
import { HttpCategorieRepository } from "@tools/domain/repositories/http-categorie.repository";

@Injectable()
export class DeleteUseCase {
	constructor(private readonly categorieRepository: HttpCategorieRepository) {
	}

	public async execute(uuid: string): Promise<void> {
		return await this.categorieRepository.deleteCategory(uuid);
	}
}
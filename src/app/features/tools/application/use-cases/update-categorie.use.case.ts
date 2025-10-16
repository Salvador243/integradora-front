import { Injectable } from "@angular/core";
import { HttpCategorieRepository } from "@tools/domain/repositories/http-categorie.repository";
import { Categorie, UpdateCategoriePayload } from "@tools/domain/entities/categorie.entity";

@Injectable()
export class UpdateCategorieUseCase {
	constructor(private readonly categorieRepository: HttpCategorieRepository) {
	}

	public async execute(payload: UpdateCategoriePayload): Promise<Categorie> {
		return await this.categorieRepository.updateCategory(payload);
	}
}
import { Injectable } from "@angular/core";
import { HttpCategorieRepository } from "@tools/domain/repositories/http-categorie.repository";
import { Categorie, CreateCategoriePayload } from "@tools/domain/entities/categorie.entity";

@Injectable()
export class CreateCategorieUseCase {
	constructor(private readonly categorieRepository: HttpCategorieRepository) {
	}

	public async execute(payload: CreateCategoriePayload): Promise<Categorie> {
		return await this.categorieRepository.createCategory(payload);
	}
}
import { Injectable } from "@angular/core";
import { HttpCategorieRepository } from "@tools/domain/repositories/http-categorie.repository";
import { GetCategoriesPayload, GetCategoriesResponse } from "@tools/domain/entities/categorie.entity";

@Injectable()
export class FetchCategorieUseCase {
	constructor(private readonly categorieRepository: HttpCategorieRepository) {
	}

	public async execute(payload: GetCategoriesPayload): Promise<GetCategoriesResponse> {
		return await this.categorieRepository.getCategories(payload);
	}
}

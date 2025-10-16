import { Injectable } from "@angular/core";
import { HttpCategorieRepository } from "@tools/domain/repositories/http-categorie.repository";
import { Categorie } from "@tools/domain/entities/categorie.entity";

@Injectable()
export class GetByUuidUseCase {
	constructor(private readonly categorieRepository: HttpCategorieRepository) {
	}

	public async execute(uuid: string): Promise<Categorie> {
		return await this.categorieRepository.getCategoryByUuid(uuid);
	}
}

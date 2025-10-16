import { Categorie, GetCategoriesPayload, GetCategoriesResponse, CreateCategoriePayload, UpdateCategoriePayload } from '../entities/categorie.entity';

export abstract class HttpCategorieRepository {
	abstract getCategories(payload: GetCategoriesPayload): Promise<GetCategoriesResponse>;
	abstract createCategory(payload: CreateCategoriePayload): Promise<Categorie>;
	abstract updateCategory(payload: UpdateCategoriePayload): Promise<Categorie>;
	abstract deleteCategory(uuid: string): Promise<void>;
	abstract getCategoryByUuid(uuid: string): Promise<Categorie>;
}
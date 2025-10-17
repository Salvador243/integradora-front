import { Provider } from "@angular/core";
import { HttpCategorieRepository } from "../../domain/repositories/http-categorie.repository";
import { ApiCategoriesRepository } from "../repositories/api-categories.repository";
import { HttpToolRepository } from "../../domain/repositories/http-tool.repository";
import { ApiToolsRepository } from "../repositories/api-tools.repository";
import { HttpToolInstanceRepository } from "../../domain/repositories/http-tool-instance.repository";
import { ApiToolInstanceRepository } from "../repositories/api-tool-instance.repository";
import { HttpToolHistoryRepository } from "../../domain/repositories/http-tool-history.repository";
import { ApiToolHistoryRepository } from "../repositories/api-tool-history.repository";

export const infrastructureProviders: Provider[] = [
	{ provide: HttpCategorieRepository, useClass: ApiCategoriesRepository },
	{ provide: HttpToolRepository, useClass: ApiToolsRepository },
	{ provide: HttpToolInstanceRepository, useClass: ApiToolInstanceRepository },
	{ provide: HttpToolHistoryRepository, useClass: ApiToolHistoryRepository }
]
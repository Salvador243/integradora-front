import { Injectable, computed, inject, signal } from "@angular/core";
import { CreateToolUseCase } from "@tools/application/use-cases/tools/create-tool.use-case";
import { UpdateToolUseCase } from "@tools/application/use-cases/tools/update-tool.use-case";
import { DeleteToolUseCase } from "@tools/application/use-cases/tools/delete-tool.use-case";
import { FetchToolsUseCase } from "@tools/application/use-cases/tools/fetch-tools.use-case";
import { GetToolByUuidUseCase } from "@tools/application/use-cases/tools/get-tool-by-uuid.use-case";
import { FetchCategorieUseCase } from "@tools/application/use-cases/fetch-categorie.use-case";
import { FetchGaragesUseCase } from "@general/application/use-cases/fetch-garages.use-case";
import { Tool, CreateToolPayload, UpdateToolPayload, GetToolsPayload } from "@tools/domain/entities/tool.entity";
import { Categorie } from "@tools/domain/entities/categorie.entity";
import { Garage } from "@general/domain/entities/garages.entity";

@Injectable()
export class ToolStateService {
	private readonly _tools = signal<Tool[]>([]);
	private readonly _shouldReload = signal<boolean>(false);
	private readonly _toolSelected = signal<Tool | undefined>(undefined);

	private readonly createToolUseCase = inject(CreateToolUseCase);
	private readonly updateToolUseCase = inject(UpdateToolUseCase);
	private readonly deleteToolUseCase = inject(DeleteToolUseCase);
	private readonly fetchToolsUseCase = inject(FetchToolsUseCase);
	private readonly getToolByUuidUseCase = inject(GetToolByUuidUseCase);
	private readonly fetchCategorieUseCase = inject(FetchCategorieUseCase);
	private readonly fetchGaragesUseCase = inject(FetchGaragesUseCase);

	public readonly tools = computed(() => this._tools());
	public readonly shouldReload = computed(() => this._shouldReload());
	public readonly toolSelected = computed(() => this._toolSelected());

	selectTool(tool: Tool | undefined): void {
		this._toolSelected.set(tool);
	}

	updateTools(tools: Tool[]): void {
		this._tools.set(tools);
	}

	triggerReload(): void {
		this._shouldReload.set(true);
	}

	resetReloadFlag(): void {
		this._shouldReload.set(false);
	}

	async fetchTools(payload: GetToolsPayload): Promise<Tool[]> {
		const response = await this.fetchToolsUseCase.execute(payload);
		this._tools.set(response.toolTypes);
		return response.toolTypes;
	}

	async fetchToolByUuid(uuid: string): Promise<Tool> {
		const tool = await this.getToolByUuidUseCase.execute(uuid);
		this.selectTool(tool);
		return tool;
	}

	async createTool(toolData: CreateToolPayload): Promise<Tool> {
		const result = await this.createToolUseCase.execute(toolData);
		this.triggerReload();
		return result;
	}

	async updateTool(toolData: UpdateToolPayload): Promise<Tool> {
		const result = await this.updateToolUseCase.execute(toolData);
		this.triggerReload();
		return result;
	}

	async deleteTool(uuid: string): Promise<void> {
		await this.deleteToolUseCase.execute(uuid);
		this.triggerReload();
	}

	async saveTool(toolData: CreateToolPayload, uuid?: string): Promise<Tool> {
		if (uuid) {
			return await this.updateTool({ ...toolData, uuid });
		} else {
			return await this.createTool(toolData);
		}
	}

	clearSelection(): void {
		this._toolSelected.set(undefined);
	}

	// Métodos para cargar datos del formulario
	async fetchCategories(): Promise<Categorie[]> {
		const response = await this.fetchCategorieUseCase.execute({ page: 1, limit: 100 });
		return response.categories;
	}

	async fetchGarages(): Promise<Garage[]> {
		const response = await this.fetchGaragesUseCase.execute();
		return response.garages;
	}
}

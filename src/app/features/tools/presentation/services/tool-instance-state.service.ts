import { Injectable, computed, inject, signal } from "@angular/core";
import { CreateToolInstanceUseCase } from "@tools/application/use-cases/tool-instances/create-tool-instance.use-case";
import { UpdateToolInstanceUseCase } from "@tools/application/use-cases/tool-instances/update-tool-instance.use-case";
import { DeleteToolInstanceUseCase } from "@tools/application/use-cases/tool-instances/delete-tool-instance.use-case";
import { FetchToolInstancesUseCase } from "@tools/application/use-cases/tool-instances/fetch-tool-instances.use-case";
import { GetToolInstanceByUuidUseCase } from "@tools/application/use-cases/tool-instances/get-tool-instance-by-uuid.use-case";
import { FetchConditionsUseCase } from "@general/application/use-cases/fetch-conditions.use-case";
import { FetchGaragesUseCase } from "@general/application/use-cases/fetch-garages.use-case";
import {
	ToolInstance,
	CreateToolInstancePayload,
	UpdateToolInstancePayload,
	GetToolInstancesPayload
} from "@tools/domain/entities/tool-instance.entity";
import { Condition } from "@general/domain/entities/condition.entity";
import { Garage } from "@general/domain/entities/garages.entity";

@Injectable()
export class ToolInstanceStateService {
	private readonly _toolInstances = signal<ToolInstance[]>([]);
	private readonly _shouldReload = signal<boolean>(false);
	private readonly _toolInstanceSelected = signal<ToolInstance | undefined>(undefined);

	private readonly createToolInstanceUseCase = inject(CreateToolInstanceUseCase);
	private readonly updateToolInstanceUseCase = inject(UpdateToolInstanceUseCase);
	private readonly deleteToolInstanceUseCase = inject(DeleteToolInstanceUseCase);
	private readonly fetchToolInstancesUseCase = inject(FetchToolInstancesUseCase);
	private readonly getToolInstanceByUuidUseCase = inject(GetToolInstanceByUuidUseCase);
	private readonly fetchConditionsUseCase = inject(FetchConditionsUseCase);
	private readonly fetchGaragesUseCase = inject(FetchGaragesUseCase);

	public readonly toolInstances = computed(() => this._toolInstances());
	public readonly shouldReload = computed(() => this._shouldReload());
	public readonly toolInstanceSelected = computed(() => this._toolInstanceSelected());

	selectToolInstance(toolInstance: ToolInstance | undefined): void {
		this._toolInstanceSelected.set(toolInstance);
	}

	updateToolInstances(toolInstances: ToolInstance[]): void {
		this._toolInstances.set(toolInstances);
	}

	triggerReload(): void {
		this._shouldReload.set(true);
	}

	resetReloadFlag(): void {
		this._shouldReload.set(false);
	}

	async fetchToolInstances(payload: GetToolInstancesPayload): Promise<ToolInstance[]> {
		const response = await this.fetchToolInstancesUseCase.execute(payload);
		this._toolInstances.set(response.toolInstances);
		return response.toolInstances;
	}

	async fetchToolInstanceByUuid(uuid: string): Promise<ToolInstance> {
		const toolInstance = await this.getToolInstanceByUuidUseCase.execute(uuid);
		this.selectToolInstance(toolInstance);
		return toolInstance;
	}

	async createToolInstance(toolInstanceData: CreateToolInstancePayload): Promise<ToolInstance> {
		const result = await this.createToolInstanceUseCase.execute(toolInstanceData);
		this.triggerReload();
		return result;
	}

	async updateToolInstance(toolInstanceData: UpdateToolInstancePayload): Promise<ToolInstance> {
		const result = await this.updateToolInstanceUseCase.execute(toolInstanceData);
		this.triggerReload();
		return result;
	}

	async deleteToolInstance(uuid: string): Promise<void> {
		await this.deleteToolInstanceUseCase.execute(uuid);
		this.triggerReload();
	}

	async saveToolInstance(toolInstanceData: CreateToolInstancePayload, uuid?: string): Promise<ToolInstance> {
		if (uuid) {
			return await this.updateToolInstance({ ...toolInstanceData, uuid });
		} else {
			return await this.createToolInstance(toolInstanceData);
		}
	}

	clearSelection(): void {
		this._toolInstanceSelected.set(undefined);
	}

	// Métodos para cargar datos del formulario
	async fetchConditions(): Promise<Condition[]> {
		const response = await this.fetchConditionsUseCase.execute();
		return response.conditions;
	}

	async fetchGarages(): Promise<Garage[]> {
		const response = await this.fetchGaragesUseCase.execute();
		return response.garages;
	}
}

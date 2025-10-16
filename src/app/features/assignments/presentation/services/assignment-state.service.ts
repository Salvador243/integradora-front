import { Injectable, signal, computed, inject } from '@angular/core';
import { Assignment, CreateAssignmentPayload, UpdateAssignmentPayload } from '../../domain/entities/assignment.entity';
import { CreateAssignmentUseCase } from '../../domain/usecases/create-assignment.usecase';
import { UpdateAssignmentUseCase } from '../../domain/usecases/update-assignment.usecase';
import { GetAssignmentByUuidUseCase } from '../../domain/usecases/get-assignment-by-uuid.usecase';

@Injectable({
	providedIn: 'root',
})
export class AssignmentStateService {
	private readonly _activeTab = signal<string>('list');
	private readonly _shouldReloadList = signal<boolean>(false);
	private readonly _assignmentSelected = signal<Assignment | undefined>(undefined);

	private readonly createAssignmentUseCase = inject(CreateAssignmentUseCase);
	private readonly updateAssignmentUseCase = inject(UpdateAssignmentUseCase);
	private readonly getAssignmentByUuidUseCase = inject(GetAssignmentByUuidUseCase);

	public readonly activeTab = computed(() => this._activeTab());
	public readonly shouldReloadList = computed(() => this._shouldReloadList());
	public readonly assignmentSelected = computed(() => this._assignmentSelected());

	public setActiveTab(tab: string): void {
		this._activeTab.set(tab);
	}

	public triggerReload(): void {
		this._shouldReloadList.set(true);
	}

	public resetReload(): void {
		this._shouldReloadList.set(false);
	}

	public selectAssignment(assignment: Assignment | undefined): void {
		this._assignmentSelected.set(assignment);
	}

	public clearSelection(): void {
		this._assignmentSelected.set(undefined);
	}

	public async getAssignmentByUuid(uuid: string): Promise<Assignment> {
		const response = await this.getAssignmentByUuidUseCase.execute(uuid).toPromise();
		if (response && response.success) {
			return response.data;
		}
		throw new Error('No se pudo obtener la asignación');
	}

	public async createAssignment(payload: CreateAssignmentPayload): Promise<void> {
		await this.createAssignmentUseCase.execute(payload).toPromise();
		this.triggerReload();
	}

	public async updateAssignment(uuid: string, payload: UpdateAssignmentPayload): Promise<void> {
		await this.updateAssignmentUseCase.execute(uuid, payload).toPromise();
		this.triggerReload();
	}

	public async saveAssignment(payload: CreateAssignmentPayload, uuid?: string): Promise<void> {
		if (uuid) {
			await this.updateAssignment(uuid, payload as UpdateAssignmentPayload);
		} else {
			await this.createAssignment(payload);
		}
	}
}

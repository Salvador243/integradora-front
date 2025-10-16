import { Component, effect, EventEmitter, inject, OnInit, Output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import PRIMENG_IMPORTS from '../../provider/primeng.components';
import { Assignment } from '../../../domain/entities/assignment.entity';
import { GetAllAssignmentsUseCase } from '../../../domain/usecases/get-all-assignments.usecase';
import { DeleteAssignmentUseCase } from '../../../domain/usecases/delete-assignment.usecase';
import { AssignmentStateService } from '../../services/assignment-state.service';

@Component({
	selector: 'assignments-assignment-list',
	standalone: true,
	templateUrl: './assignment-list.component.html',
	imports: [PRIMENG_IMPORTS, CommonModule, FormsModule],
	providers: [MessageService],
})
export class AssignmentListComponent implements OnInit {
	private readonly getAllAssignmentsUseCase = inject(GetAllAssignmentsUseCase);
	private readonly deleteAssignmentUseCase = inject(DeleteAssignmentUseCase);
	private readonly messageService = inject(MessageService);
	private readonly assignmentStateService = inject(AssignmentStateService);

	public assignments = signal<Assignment[]>([]);
	public isLoading = signal(false);

	@Output()
	changeTab = new EventEmitter<string>();

	constructor() {
		// Listen for reload triggers
		effect(() => {
			if (this.assignmentStateService.shouldReloadList()) {
				this.loadAssignments();
				this.assignmentStateService.resetReload();
			}
		});
	}

	ngOnInit(): void {
		this.loadAssignments();
	}

	public async loadAssignments(): Promise<void> {
		this.isLoading.set(true);
		try {
			const response = await this.getAllAssignmentsUseCase.execute().toPromise();
			if (response && response.success) {
				this.assignments.set(response.data.assignments);
			}
		} catch (error) {
			this.messageService.add({
				severity: 'error',
				summary: 'Error',
				detail: 'No se pudieron cargar las asignaciones',
			});
		} finally {
			this.isLoading.set(false);
		}
	}

	public async deleteAssignment(uuid: string): Promise<void> {
		try {
			await this.deleteAssignmentUseCase.execute(uuid).toPromise();
			this.messageService.add({
				severity: 'success',
				summary: 'Éxito',
				detail: 'Asignación eliminada correctamente',
			});
			await this.loadAssignments();
		} catch (error) {
			this.messageService.add({
				severity: 'error',
				summary: 'Error',
				detail: 'No se pudo eliminar la asignación',
			});
		}
	}

	public getStatusSeverity(status: string): 'success' | 'danger' | 'info' {
		return status === 'closed' ? 'success' : 'info';
	}

	public getStatusLabel(status: string): string {
		return status === 'closed' ? 'Cerrada' : 'Abierta';
	}

	public editAssignment(assignment: Assignment): void {
		this.assignmentStateService.selectAssignment(assignment);
		this.changeTab.emit('form');
	}
}

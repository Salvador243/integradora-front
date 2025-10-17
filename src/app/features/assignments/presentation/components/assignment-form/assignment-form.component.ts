import { CommonModule } from '@angular/common';
import { Component, effect, EventEmitter, inject, OnInit, Output, signal } from '@angular/core';
import {
	FormBuilder,
	FormControl,
	FormGroup,
	FormsModule,
	ReactiveFormsModule,
	Validators,
} from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Condition } from '@general/domain/entities/condition.entity';
import { FetchConditionsUseCase } from '@general/application/use-cases/fetch-conditions.use-case';
import { ToolInstance } from '@tools/domain/entities/tool-instance.entity';
import { FetchToolInstancesUseCase } from '@tools/application/use-cases/tool-instances/fetch-tool-instances.use-case';
import { CreateAssignmentUseCase } from '../../../domain/usecases/create-assignment.usecase';
import PRIMENG_IMPORTS from '../../provider/primeng.components';
import { AssignmentStateService } from '../../services/assignment-state.service';

@Component({
	selector: 'assignments-assignment-form',
	standalone: true,
	templateUrl: './assignment-form.component.html',
	imports: [PRIMENG_IMPORTS, CommonModule, FormsModule, ReactiveFormsModule],
	providers: [MessageService],
})
export class AssignmentFormComponent implements OnInit {
	private readonly fb = inject(FormBuilder);
	private readonly fetchConditionsUseCase = inject(FetchConditionsUseCase);
	private readonly fetchToolInstancesUseCase = inject(FetchToolInstancesUseCase);
	private readonly createAssignmentUseCase = inject(CreateAssignmentUseCase);
	private readonly messageService = inject(MessageService);
	private readonly assignmentStateService = inject(AssignmentStateService);

	public uuid: string | undefined = undefined;
	private isLoadingAssignment = false; // Bandera para evitar recargas durante edición

	public formAssignment!: FormGroup;
	public conditions = signal<Condition[]>([]);
	public toolInstances = signal<ToolInstance[]>([]);
	public filteredToolInstances = signal<ToolInstance[]>([]);
	public isLoading = signal(false);

	// Opciones para tipo_evento
	public tipoEventoOptions = [
		{ label: 'Asignado', value: 'assigned' },
		{ label: 'Devuelto', value: 'returned' },
		{ label: 'Mantenimiento', value: 'maintenance' },
		{ label: 'Transferido', value: 'transferred' },
	];

	@Output()
	changeTab = new EventEmitter<string>();

	constructor() {
		effect(() => {
			const selectedAssignment = this.assignmentStateService.assignmentSelected();
			if (!this.formAssignment) return;
			
			// Si ya estamos cargando una asignación, no hacer nada
			if (this.isLoadingAssignment) return;
			
			if (!selectedAssignment) {
				this.uuid = undefined;
				this.formAssignment.reset({
					toolInstanceId: '',
					userAssigned: '',
					fechaSalida: '',
					conditionIdSalida: '',
					fechaRegreso: null,
					conditionIdRegreso: null,
					status: 'open',
					tipoEvento: null,
				});
				return;
			}

			// Marcar que estamos cargando
			this.isLoadingAssignment = true;
			this.uuid = selectedAssignment.uuid;
			
			// Usar setTimeout para evitar conflictos con el ciclo de detección de cambios
			setTimeout(() => {
				this.formAssignment.patchValue({
					toolInstanceId: selectedAssignment.toolInstance.uuid,
					userAssigned: selectedAssignment.userAssigned,
					fechaSalida: selectedAssignment.fechaSalida ? new Date(selectedAssignment.fechaSalida) : null,
					conditionIdSalida: selectedAssignment.conditionSalida.uuid,
					fechaRegreso: selectedAssignment.fechaRegreso ? new Date(selectedAssignment.fechaRegreso) : null,
					conditionIdRegreso: selectedAssignment.conditionRegreso?.uuid || null,
					status: selectedAssignment.status,
					tipoEvento: (selectedAssignment as any).tipoEvento || null,
				}, { emitEvent: false }); // No emitir eventos para evitar loops
				
				// Desmarcar después de un momento
				setTimeout(() => {
					this.isLoadingAssignment = false;
				}, 100);
			}, 0);
		});
	}

	ngOnInit(): void {
		this.initForm();
		this.loadConditions();
		this.loadToolInstances();
	}

	private initForm(): void {
		this.formAssignment = this.fb.group({
			toolInstanceId: new FormControl('', [Validators.required]),
			userAssigned: new FormControl('', [Validators.required]),
			fechaSalida: new FormControl('', [Validators.required]),
			conditionIdSalida: new FormControl('', [Validators.required]),
			fechaRegreso: new FormControl(null),
			conditionIdRegreso: new FormControl(null),
			status: new FormControl('open', [Validators.required]),
			tipoEvento: new FormControl(null), // Campo opcional
		});
	}

	private async loadConditions(): Promise<void> {
		try {
			const response = await this.fetchConditionsUseCase.execute();
			this.conditions.set(response.conditions);
		} catch (error) {
			this.messageService.add({
				severity: 'error',
				summary: 'Error',
				detail: 'No se pudieron cargar las condiciones',
			});
		}
	}

	private async loadToolInstances(): Promise<void> {
		try {
			const response = await this.fetchToolInstancesUseCase.execute({ toolTypeId: '' });
			this.toolInstances.set(response.toolInstances);
			this.filteredToolInstances.set(response.toolInstances);
		} catch (error) {
			this.messageService.add({
				severity: 'error',
				summary: 'Error',
				detail: 'No se pudieron cargar las herramientas',
			});
		}
	}

	public filterToolInstances(event: any): void {
		const query = event.filter?.toLowerCase() || '';
		if (!query) {
			this.filteredToolInstances.set(this.toolInstances());
			return;
		}
		const filtered = this.toolInstances().filter((tool) =>
			tool.serialCode.toLowerCase().includes(query)
		);
		this.filteredToolInstances.set(filtered);
	}

	public isFieldInvalid(fieldName: string): boolean {
		const field = this.formAssignment.get(fieldName);
		return !!(field && field.invalid && (field.dirty || field.touched));
	}

	public getFieldError(fieldName: string): string | null {
		const field = this.formAssignment.get(fieldName);
		if (field && field.errors && (field.dirty || field.touched)) {
			if (field.errors['required']) {
				const fieldLabels: { [key: string]: string } = {
					toolInstanceId: 'instancia de herramienta',
					userAssigned: 'usuario asignado',
					fechaSalida: 'fecha de salida',
					conditionIdSalida: 'condición de salida',
				};
				return `El campo ${fieldLabels[fieldName] || fieldName} es obligatorio.`;
			}
		}
		return null;
	}

	public async onSubmit(): Promise<void> {
		if (this.formAssignment.invalid) {
			Object.keys(this.formAssignment.controls).forEach((key) => {
				this.formAssignment.get(key)?.markAsTouched();
			});
			return;
		}

		this.isLoading.set(true);
		try {
			const formValue = this.formAssignment.value;
			const payload: any = {
				toolInstanceId: formValue.toolInstanceId,
				userAssigned: formValue.userAssigned,
				fechaSalida: formValue.fechaSalida ? new Date(formValue.fechaSalida).toISOString() : '',
				conditionIdSalida: formValue.conditionIdSalida,
				fechaRegreso: formValue.fechaRegreso ? new Date(formValue.fechaRegreso).toISOString() : null,
				conditionIdRegreso: formValue.conditionIdRegreso || null,
				status: formValue.status,
			};

			// Agregar tipo_evento solo si tiene valor
			if (formValue.tipoEvento) {
				payload.tipo_evento = formValue.tipoEvento;
			}

			await this.assignmentStateService.saveAssignment(payload, this.uuid);

			this.messageService.add({
				severity: 'success',
				summary: 'Éxito',
				detail: this.uuid ? 'Asignación actualizada correctamente' : 'Asignación creada correctamente',
			});

			this.onReset();
			this.changeTab.emit('list');
		} catch (error) {
			this.messageService.add({
				severity: 'error',
				summary: 'Error',
				detail: 'No se pudo crear la asignación',
			});
		} finally {
			this.isLoading.set(false);
		}
	}

	public onReset(): void {
		this.isLoadingAssignment = false; // Resetear bandera
		this.formAssignment.reset({
			toolInstanceId: '',
			userAssigned: '',
			fechaSalida: '',
			conditionIdSalida: '',
			fechaRegreso: null,
			conditionIdRegreso: null,
			status: 'open',
			tipoEvento: null,
		});
		this.assignmentStateService.clearSelection();
		this.uuid = undefined;
	}
}

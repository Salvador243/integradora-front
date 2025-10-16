import { CommonModule } from '@angular/common';
import { Component, effect, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
	FormBuilder,
	FormControl,
	FormGroup,
	FormsModule,
	ReactiveFormsModule,
	Validators,
} from '@angular/forms';
import PRIMENG_IMPORTS from '../../provider/primeng.components';
import { ToolInstanceStateService } from '../../services/tool-instance-state.service';
import { ToolInstanceStatus } from '@tools/domain/entities/tool-instance.entity';
import { Condition } from '@general/domain/entities/condition.entity';
import { Garage } from '@general/domain/entities/garages.entity';

@Component({
	selector: 'tools-tool-instance-form',
	standalone: true,
	templateUrl: './tool-instance-form.component.html',
	imports: [PRIMENG_IMPORTS, CommonModule, FormsModule, ReactiveFormsModule],
})
export class ToolInstanceFormComponent implements OnInit {
	public formToolInstance!: FormGroup;
	private readonly toolInstanceStateService = inject(ToolInstanceStateService);
	private readonly route = inject(ActivatedRoute);
	private readonly fb = inject(FormBuilder);
	private uuid: string | undefined = undefined;
	private toolTypeId: string = '';

	public conditions: Condition[] = [];
	public garages: Garage[] = [];
	public statusOptions = [
		{ label: 'Disponible', value: 'available' },
		{ label: 'Asignado', value: 'assigned' },
		{ label: 'Mantenimiento', value: 'maintenance' },
		{ label: 'Perdido', value: 'lost' }
	];

	@Output()
	changeTab = new EventEmitter<string>();

	constructor() {
		effect(() => {
			this.uuid = undefined;
			const selectedToolInstance = this.toolInstanceStateService.toolInstanceSelected();
			if (!this.formToolInstance) return;
			if (!selectedToolInstance) {
				this.formToolInstance.reset({
					toolTypeId: this.toolTypeId,
					status: 'available'
				});
				return;
			}

			this.uuid = selectedToolInstance.uuid;
			this.formToolInstance.patchValue({
				toolTypeId: selectedToolInstance.toolTypeId,
				serialCode: selectedToolInstance.serialCode,
				garageId: selectedToolInstance.garageId,
				conditionId: selectedToolInstance.conditionId,
				status: selectedToolInstance.status,
				lastAssignedUser: selectedToolInstance.lastAssignedUser || '',
			});
		});
	}

	async ngOnInit(): Promise<void> {
		this.toolTypeId = this.route.snapshot.paramMap.get('toolTypeId') || '';

		this.formToolInstance = this.fb.group({
			toolTypeId: new FormControl(this.toolTypeId, [Validators.required]),
			serialCode: new FormControl('', [Validators.required, Validators.minLength(3)]),
			garageId: new FormControl('', [Validators.required]),
			conditionId: new FormControl('', [Validators.required]),
			status: new FormControl<ToolInstanceStatus>('available', [Validators.required]),
			lastAssignedUser: new FormControl(''),
		});

		// Cargar condiciones y garages
		await this.loadConditions();
		await this.loadGarages();
	}

	private async loadConditions(): Promise<void> {
		this.conditions = await this.toolInstanceStateService.fetchConditions();
	}

	private async loadGarages(): Promise<void> {
		this.garages = await this.toolInstanceStateService.fetchGarages();
	}

	isFieldInvalid(fieldName: string): boolean {
		const field = this.formToolInstance.get(fieldName);
		return !!(field && field.invalid && (field.dirty || field.touched));
	}

	getFieldError(fieldName: string): string | null {
		const field = this.formToolInstance.get(fieldName);
		if (field && field.errors && (field.dirty || field.touched)) {
			if (field.errors['required']) {
				const fieldLabels: { [key: string]: string } = {
					serialCode: 'código serial',
					garageId: 'taller',
					conditionId: 'condición',
					status: 'estado',
				};
				return `El ${fieldLabels[fieldName] || fieldName} es obligatorio.`;
			}
			if (field.errors['minlength']) {
				return `El código serial debe tener al menos 3 caracteres.`;
			}
		}
		return null;
	}

	async onSubmit(): Promise<void> {
		if (!this.formToolInstance.valid) {
			this.formToolInstance.markAllAsTouched();
			return;
		}
		await this.toolInstanceStateService.saveToolInstance(this.formToolInstance.value, this.uuid);
		this.changeTab.emit('list');
		this.onReset();
	}

	onReset(): void {
		this.formToolInstance.reset({
			toolTypeId: this.toolTypeId,
			status: 'available'
		});
		this.toolInstanceStateService.clearSelection();
	}
}

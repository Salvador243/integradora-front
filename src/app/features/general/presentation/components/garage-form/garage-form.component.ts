import { CommonModule } from '@angular/common';
import { Component, effect, EventEmitter, inject, OnInit, Output } from '@angular/core';
import {
	FormBuilder,
	FormControl,
	FormGroup,
	FormsModule,
	ReactiveFormsModule,
	Validators,
} from '@angular/forms';
import PRIMENG_IMPORTS from '../../provider/primeng.components';
import { GarageStateService } from '../../services/garage-state.service';

@Component({
	selector: 'general-garage-form',
	standalone: true,
	templateUrl: './garage-form.component.html',
	imports: [PRIMENG_IMPORTS, CommonModule, FormsModule, ReactiveFormsModule],
})
export class GarageFormComponent implements OnInit {
	public checked: boolean = false;
	public formGarage!: FormGroup;

	private readonly garageStateService = inject(GarageStateService);
	private readonly fb = inject(FormBuilder);

	private uuid: string | undefined = undefined;

	@Output()
	changeTab = new EventEmitter<string>();

	constructor() {
		effect(() => {
			this.uuid = undefined;
			this.formGarage.reset();
			this.checked = true;
			const selectedGarage = this.garageStateService.garageSelected();
			if (!this.formGarage) return;
			if (!selectedGarage) return;

			this.uuid = selectedGarage.uuid;
			this.formGarage.patchValue({
				code: selectedGarage.code,
				name: selectedGarage.name,
				status: selectedGarage.status,
			});
			this.checked = selectedGarage.status;
		});
	}

	ngOnInit(): void {
		this.formGarage = this.fb.group({
			code: new FormControl('', [Validators.required, Validators.minLength(3)]),
			name: new FormControl('', [Validators.required, Validators.minLength(3)]),
			status: new FormControl(true, [Validators.required]),
		});
	}

	isFieldInvalid(fieldName: string): boolean {
		const field = this.formGarage.get(fieldName);
		return !!(field && field.invalid && (field.dirty || field.touched));
	}

	getFieldError(fieldName: string): string | null {
		const field = this.formGarage.get(fieldName);
		if (field && field.errors && (field.dirty || field.touched)) {
			if (field.errors['required']) {
				return `El ${fieldName === 'code' ? 'código' : 'nombre'} es obligatorio.`;
			}
			if (field.errors['minlength']) {
				return `El ${fieldName === 'code' ? 'código' : 'nombre'} debe tener al menos 3 caracteres.`;
			}
		}
		return null;
	}

	async onSubmit(): Promise<void> {
		if (!this.formGarage.valid) return;
		await this.garageStateService.saveGarage(this.formGarage.value, this.uuid);
		this.changeTab.emit('list');
		this.onReset();
	}

	onReset(): void {
		this.formGarage.reset();
		this.garageStateService.clearSelection();
		this.checked = true;
	}
}

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
import { CategorieStateService } from '../../services/categorie-state.service';

@Component({
	selector: 'tools-categorie-form',
	standalone: true,
	templateUrl: './categorie-form.component.html',
	imports: [PRIMENG_IMPORTS, CommonModule, FormsModule, ReactiveFormsModule],
})
export class CategorieFormComponent implements OnInit {
	public checked: boolean = false;
	public formCategorie!: FormGroup;

	private readonly categorieStateService = inject(CategorieStateService);
	private readonly fb = inject(FormBuilder);

	private uuid: string | undefined = undefined;

	@Output()
	changeTab = new EventEmitter<string>();

	constructor() {
		effect(() => {
			this.uuid = undefined;
			this.formCategorie.reset();
			this.checked = true;
			const selectedCategorie = this.categorieStateService.categorieSelected();
			if (!this.formCategorie) return;
			if (!selectedCategorie) return;

			this.uuid = selectedCategorie.uuid;
			this.formCategorie.patchValue({
				code: selectedCategorie.code,
				name: selectedCategorie.name,
				status: selectedCategorie.status,
			});
			this.checked = selectedCategorie.status;
		});
	}

	ngOnInit(): void {
		this.formCategorie = this.fb.group({
			code: new FormControl('', [Validators.required, Validators.minLength(3)]),
			name: new FormControl('', [Validators.required, Validators.minLength(3)]),
			status: new FormControl(true, [Validators.required]),
		});
	}

	isFieldInvalid(fieldName: string): boolean {
		const field = this.formCategorie.get(fieldName);
		return !!(field && field.invalid && (field.dirty || field.touched));
	}

	getFieldError(fieldName: string): string | null {
		const field = this.formCategorie.get(fieldName);
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
		if (!this.formCategorie.valid) return;
		await this.categorieStateService.saveCategorie(this.formCategorie.value, this.uuid);
		this.changeTab.emit('list');
		this.onReset();
	}

	onReset(): void {
		this.formCategorie.reset();
		this.categorieStateService.clearSelection();
		this.checked = true;
	}
}

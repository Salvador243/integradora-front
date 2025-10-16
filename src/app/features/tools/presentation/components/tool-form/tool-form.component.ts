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
import { ToolStateService } from '../../services/tool-state.service';
import { ToolStatus } from '@tools/domain/entities/tool.entity';
import { Categorie } from '@tools/domain/entities/categorie.entity';
import { Garage } from '@general/domain/entities/garages.entity';

@Component({
	selector: 'tools-tool-form',
	standalone: true,
	templateUrl: './tool-form.component.html',
	imports: [PRIMENG_IMPORTS, CommonModule, FormsModule, ReactiveFormsModule],
})
export class ToolFormComponent implements OnInit {
	public formTool!: FormGroup;
	private readonly toolStateService = inject(ToolStateService);
	private readonly fb = inject(FormBuilder);
	private uuid: string | undefined = undefined;

	public categories: Categorie[] = [];
	public garages: Garage[] = [];
	public statusOptions = [
		{ label: 'Activo', value: 'active' },
		{ label: 'Inactivo', value: 'inactive' }
	];

	@Output()
	changeTab = new EventEmitter<string>();

	constructor() {
		effect(() => {
			this.uuid = undefined;
			const selectedTool = this.toolStateService.toolSelected();
			if (!this.formTool) return;
			if (!selectedTool) {
				this.formTool.reset({
					status: 'active'
				});
				return;
			}

			this.uuid = selectedTool.uuid;
			this.formTool.patchValue({
				code: selectedTool.code,
				name: selectedTool.name,
				categoryId: selectedTool.categoryId,
				status: selectedTool.status,
				image: selectedTool.image || '',
				garageId: selectedTool.garageId,
			});
		});
	}

	async ngOnInit(): Promise<void> {
		this.formTool = this.fb.group({
			code: new FormControl('', [Validators.required, Validators.minLength(3)]),
			name: new FormControl('', [Validators.required, Validators.minLength(3)]),
			categoryId: new FormControl('', [Validators.required]),
			status: new FormControl<ToolStatus>('active', [Validators.required]),
			image: new FormControl(''),
			garageId: new FormControl('', [Validators.required]),
		});

		// Cargar categorías y garages
		await this.loadCategories();
		await this.loadGarages();
	}

	private async loadCategories(): Promise<void> {
		this.categories = await this.toolStateService.fetchCategories();
	}

	private async loadGarages(): Promise<void> {
		this.garages = await this.toolStateService.fetchGarages();
	}

	isFieldInvalid(fieldName: string): boolean {
		const field = this.formTool.get(fieldName);
		return !!(field && field.invalid && (field.dirty || field.touched));
	}

	getFieldError(fieldName: string): string | null {
		const field = this.formTool.get(fieldName);
		if (field && field.errors && (field.dirty || field.touched)) {
			if (field.errors['required']) {
				const fieldLabels: { [key: string]: string } = {
					code: 'código',
					name: 'nombre',
					categoryId: 'categoría',
					status: 'estatus',
					image: 'imagen',
					garageId: 'taller',
				};
				return `El ${fieldLabels[fieldName] || fieldName} es obligatorio.`;
			}
			if (field.errors['minlength']) {
				return `El ${fieldName === 'code' ? 'código' : 'nombre'} debe tener al menos 3 caracteres.`;
			}
		}
		return null;
	}

	onFileSelect(event: any): void {
		const file = event.files[0];
		if (file) {
			this.formTool.patchValue({ image: file.name });
			console.log('Archivo seleccionado:', file);
		}
	}

	async onSubmit(): Promise<void> {
		if (!this.formTool.valid) {
			this.formTool.markAllAsTouched();
			return;
		}
		await this.toolStateService.saveTool(this.formTool.value, this.uuid);
		this.changeTab.emit('list');
		this.onReset();
	}

	onReset(): void {
		this.formTool.reset({
			status: 'active'
		});
		this.toolStateService.clearSelection();
	}
}
import {Component, OnInit} from '@angular/core';
import { PRIMENG_IMPORTS } from '../../provider/primeng.components';
import {CommonModule} from '@angular/common';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { RegisterUseCase } from '../../../application/use-cases/register.use-case';
import { Router } from '@angular/router';

@Component({
	selector: 'auth-login-register',
	imports: [...PRIMENG_IMPORTS, CommonModule, ReactiveFormsModule, FormsModule],
	templateUrl: './login-register.component.html',
	styleUrl: './login-register.component.scss',
	standalone: true,
	providers: [RegisterUseCase],
})
export class LoginRegisterComponent implements OnInit {
	registerForm!: FormGroup;
	public isSubmitting = false;
	public serverError?: string;
	public successMessage?: string;

	constructor(
		private formBuilder: FormBuilder,
		private registerUseCase: RegisterUseCase,
		private router?: Router
	) {}

	ngOnInit() {
		this.initializeForm();
	}

	private initializeForm() {
		this.registerForm = this.formBuilder.group({
			name: ['', [Validators.required, Validators.minLength(2)]],
			lastname: ['', [Validators.required, Validators.minLength(2)]],
			email: ['', [Validators.required, Validators.email]],
			password: ['', [Validators.required, Validators.minLength(6)]]
		});
	}

	public async onSubmit() {
		if (!this.registerForm.valid) {
			this.markFormGroupTouched();
			return;
		}

		this.isSubmitting = true;
		this.serverError = undefined;
		this.successMessage = undefined;

		const { name, lastname, email, password } = this.registerForm.value;

		try {
			const result = await this.registerUseCase.execute({ name, lastname, email, password });
			console.log({result})

			this.successMessage = 'Usuario registrado exitosamente';
			this.registerForm.reset();

			if (this.router) {
				this.router.navigate(['/login']);
			}

		} catch (err: any) {
			this.serverError = err?.message ?? 'Error al registrar usuario';
			console.error('Register error:', err);
		} finally {
			this.isSubmitting = false;
		}
	}

	private markFormGroupTouched() {
		Object.keys(this.registerForm.controls).forEach(key => {
			const control = this.registerForm.get(key);
			control?.markAsTouched();
		});
	}

	public getFieldError(fieldName: string): string | null {
		const field = this.registerForm.get(fieldName);
		if (field?.errors && field.touched) {
			if (field.errors['required']) {
				return `${this.getFieldLabel(fieldName)} es requerido`;
			}
			if (field.errors['email']) {
				return 'Ingrese un email válido';
			}
			if (field.errors['minlength']) {
				const requiredLength = field.errors['minlength'].requiredLength;
				return `${this.getFieldLabel(fieldName)} debe tener al menos ${requiredLength} caracteres`;
			}
		}
		return null;
	}

	private getFieldLabel(fieldName: string): string {
		const labels: { [key: string]: string } = {
			name: 'Nombre',
			lastname: 'Apellido',
			email: 'Email',
			password: 'Contraseña'
		};
		return labels[fieldName] || fieldName;
	}
}

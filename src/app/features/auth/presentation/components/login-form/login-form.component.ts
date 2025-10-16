import { Component, OnInit } from '@angular/core';
import {
	FormControl,
	FormGroup,
	FormsModule,
	ReactiveFormsModule,
	Validators,
} from '@angular/forms';
import { PRIMENG_IMPORTS } from '../../provider/primeng.components';
import { Router } from '@angular/router';
import { LoginUseCase } from '../../../application/use-cases/login.use-case';
import { CommonModule } from '@angular/common';

@Component({
	imports: [CommonModule, FormsModule, ReactiveFormsModule, ...PRIMENG_IMPORTS],
	selector: 'auth-login-form',
	templateUrl: './login-form.component.html',
	styleUrl: './login-form.component.scss',
	standalone: true,
	providers: [LoginUseCase],
})
export class LoginFormComponent implements OnInit {
    public formLogin!: FormGroup;
    public isSubmitting = false;
    public serverError?: string;
    constructor(private loginUseCase: LoginUseCase, private router?: Router) {}

	ngOnInit(): void {
		this.initForm();
	}

	public initForm() {
		this.formLogin = new FormGroup({
			email: new FormControl('', [Validators.required, Validators.email]),
			password: new FormControl('', [Validators.required, Validators.minLength(6)]),
		});
	}

    public async onSubmit() {
        if (!this.formLogin.valid) {
            this.markFormGroupTouched();
            return;
        }

        this.isSubmitting = true;
        this.serverError = undefined;
        const { email, password } = this.formLogin.value;

        try {
            const result = await this.loginUseCase.execute({ email, password });
            if (this.router) {
                this.router.navigate(['/admin/general']);
            }

        } catch (err: any) {
            this.serverError = err?.message ?? 'Error al iniciar sesión';
            console.error('Login error:', err);
        } finally {
            this.isSubmitting = false;
        }
    }

	public getFieldError(fieldName: string): string | null {
		const field = this.formLogin.get(fieldName);
		if (field?.errors && field.touched) {
			if (field.errors['required']) {
				return `${this.getFieldLabel(fieldName)} es requerido`;
			}
			if (field.errors['email']) {
				return 'Ingrese un email válido';
			}
		}
		return null;
	}

	private getFieldLabel(fieldName: string): string {
		const labels: { [key: string]: string } = {
			email: 'Email',
			password: 'Contraseña',
		};
		return labels[fieldName] || fieldName;
	}

	private markFormGroupTouched() {
		Object.keys(this.formLogin.controls).forEach((key) => {
			const control = this.formLogin.get(key);
			control?.markAsTouched();
		});
	}
}

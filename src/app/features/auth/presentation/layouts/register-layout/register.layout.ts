import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Router} from '@angular/router';
import {LoginRegisterComponent} from '../../components/login-register/login-register.component';
import {infrastructureProviders} from '../../../infrastructure/di/providers';

@Component({
	selector: 'mfe-authenticator-register-layout',
	standalone: true,
	imports: [CommonModule, FormsModule, ReactiveFormsModule, LoginRegisterComponent],
	templateUrl: './register.layout.html',
	styleUrl: './register.layout.scss',
	providers: [...infrastructureProviders],
})
export class RegisterLayoutComponent {

	constructor(
		private router?: Router
	) {
	}

	public redirectToLogin() {
		this.router?.navigate(['/login']);
	}
}

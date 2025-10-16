import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PRIMENG_IMPORTS } from '../../provider/primeng.components';
import { Router } from '@angular/router';
import { LoginFormComponent } from '../../components/login-form/login-form.component';
import { infrastructureProviders } from '../../../infrastructure/di/providers';

@Component({
	selector: 'mfe-authenticator-login-layout',
	standalone: true,
	imports: [CommonModule, ...PRIMENG_IMPORTS, FormsModule, LoginFormComponent],
	templateUrl: './login.layout.html',
	styleUrl: './login.layout.scss',
	providers: [...infrastructureProviders],
})
export class LoginLayoutComponent implements OnInit {
	constructor(private router?: Router) {}
	ngOnInit() {}

	public async redirectToRegister() {
		this.router?.navigate(['/auth/register']);
	}
}

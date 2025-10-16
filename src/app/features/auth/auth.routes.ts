import { Routes } from '@angular/router';

export const authRoutes: Routes = [
	{
		path: 'login',
		loadComponent: () =>
			import('./presentation/layouts/login-layout/login.layout').then(
				(m) => m.LoginLayoutComponent,
			),
	},
	{
		path: 'register',
		loadComponent: () =>
			import('./presentation/layouts/register-layout/register.layout').then(
				(m) => m.RegisterLayoutComponent,
			),
	},
	{
		path: '',
		redirectTo: 'login',
		pathMatch: 'full',
	},
];

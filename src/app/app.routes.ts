import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { UnauthGuard } from './core/guards/unauth.guard';
import { AdminLayoutComponent } from './core/layouts/admin/admin.layout';

export const routes: Routes = [
	{
		path: 'auth',
		canActivate: [UnauthGuard],
		loadChildren: () => import('./features/auth/auth.routes').then((m) => m.authRoutes),
	},
	{
		path: 'admin',
		canActivate: [AuthGuard],
		component: AdminLayoutComponent,
		children: [
			{
				path: 'tools',
				loadChildren: () => import('./features/tools/tools.routes').then((m) => m.toolsRoutes),
			},
			{
				path: 'general',
				loadChildren: () =>
					import('./features/general/general.routes').then((m) => m.generalRoutes),
			},
			{
				path: 'assignments',
				loadChildren: () =>
					import('./features/assignments/assignments.routes').then((m) => m.assignmentsRoutes),
			},
			{
				path: 'historically',
				loadChildren: () =>
					import('./features/historically/historically.routes').then((m) => m.historicallyRoutes),
			},
			{
				path: '',
				redirectTo: 'general',
				pathMatch: 'full',
			},
		],
	},
	{
		path: '',
		redirectTo: 'auth/login',
		pathMatch: 'full',
	},
	{
		path: '**',
		redirectTo: 'auth/login',
	},
];

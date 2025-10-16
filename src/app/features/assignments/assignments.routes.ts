import { Routes } from '@angular/router';

export const assignmentsRoutes: Routes = [
	{
		path: 'assignments',
		loadComponent: () =>
			import('./presentation/layouts/assignments-layout/assignments.layout').then(
				(m) => m.AssignmentsLayoutComponent,
			),
	},
	{
		path: '',
		redirectTo: 'assignments',
		pathMatch: 'full',
	},
];

import { Routes } from '@angular/router';

export const historicallyRoutes: Routes = [
	{
		path: '',
		loadComponent: () =>
			import('./historically.component').then((m) => m.HistoricallyComponent),
	},
];

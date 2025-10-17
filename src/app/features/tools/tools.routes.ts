import { Routes } from '@angular/router';

export const toolsRoutes: Routes = [
	{
		path: 'tools',
		loadComponent: () =>
			import('./presentation/layouts/tools/tools.layout').then(m => m.ToolsLayoutComponent),
	},
	{
		path: 'instances/:toolTypeId',
		loadComponent: () =>
			import('./presentation/layouts/tool-instances/tool-instances.layout').then(m => m.ToolInstancesLayoutComponent),
	},
	{
		path: 'history/:instanceId/:serialCode',
		loadComponent: () =>
			import('./presentation/components/tool-history/tool-history.component').then(m => m.ToolHistoryComponent),
	},
	{
		path: 'categories',
		loadComponent: () =>
			import('./presentation/layouts/categories/categories.layout').then((m) => m.CategoriesLayoutComponent),
	},
	{
		path: '',
		redirectTo: 'tools',
		pathMatch: 'full',
	}
];

import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';

@Component({
	selector: 'app-admin-layout',
	standalone: true,
	imports: [RouterOutlet, RouterModule, MenubarModule, ButtonModule],
	templateUrl: './admin.layout.html',
	styles: [],
})
export class AdminLayoutComponent implements OnInit {
	constructor(private router: Router) {}
	public items: MenuItem[] = [];

	ngOnInit(): void {
		this.items = [
			{
				label: 'Taller',
				icon: 'pi pi-car',
				command: () => {
					this.router.navigate(['/admin/general/garage']);
				},
			},
			{
				label: 'Categorias',
				icon: 'pi pi-th-large',
				command: () => {
					this.router.navigate(['/admin/tools/categories']);
				},
			},
			{
				label: 'Herramientas',
				icon: 'pi pi-wrench',
				command: () => {
					this.router.navigate(['/admin/tools/tools']);
				},
			},
			{
				label: 'Asignaciones',
				icon: 'pi pi-folder-plus',
				command: () => {
					this.router.navigate(['/admin/assignments/assignments']);
				},
			},
		];
	}

	public onLogOut(): void {
		localStorage.removeItem('auth.token');
		this.router.navigate(['/auth/login']);
	}
}

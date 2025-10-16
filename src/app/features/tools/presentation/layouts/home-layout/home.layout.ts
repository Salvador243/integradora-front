import { Component } from '@angular/core';
import PRIMENG_IMPORTS from '../../provider/primeng.components';
import { ToolListComponent } from '../../components/tool-list/tool-list.component';
import { ToolFormComponent } from '../../components/tool-form/tool-form.component';
import { HttpClientModule } from '@angular/common/http';

@Component({
	selector: 'tools-home-layout',
	standalone: true,
	templateUrl: './home.layout.html',
	imports: [PRIMENG_IMPORTS, ToolListComponent, ToolFormComponent, HttpClientModule],
})
export class HomeLayoutComponent {
	public tabs = [
		{ value: 'list', label: 'Listado', icon: 'pi pi-list' },
		{ value: 'form', label: 'Herramienta', icon: 'pi pi-wrench' },
	];
}

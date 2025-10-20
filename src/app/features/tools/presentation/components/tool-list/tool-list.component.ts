import { Component, effect, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import PRIMENG_IMPORTS from '../../provider/primeng.components';
import { Tool, Category } from '../../../domain/entities/tool.entity';

interface ToolWithCategory extends Tool {
	categoryDisplay: string;
}
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToolStateService } from '../../services/tool-state.service';
import { environment } from '../../../../../../environments/environment';

@Component({
	selector: 'tools-tool-list',
	standalone: true,
	templateUrl: './tool-list.component.html',
	imports: [...PRIMENG_IMPORTS, CommonModule, FormsModule],
})
export class ToolListComponent implements OnInit {
	private readonly toolStateService = inject(ToolStateService);
	private readonly router = inject(Router);

	public page: number = 1;
	public limit: number = 20;
	public tools: ToolWithCategory[] = [];
	public categories: Category[] = [];

	@Output()
	changeTab: EventEmitter<string> = new EventEmitter<string>();

	constructor() {
		effect(() => {
			if (this.toolStateService.shouldReload()) {
				this.loadTools();
				this.toolStateService.resetReloadFlag();
			}
		});
	}

	ngOnInit(): void {
		this.loadTools();
	}

	private async loadTools(): Promise<void> {
		await this.toolStateService.fetchTools({
			page: this.page,
			limit: this.limit
		});

		this.categories = this.toolStateService.categories();

		// Aplanar y agregar el display de categoría a cada tool
		this.tools = this.categories.flatMap(category =>
			category.toolTypes.map(tool => ({
				...tool,
				categoryDisplay: `${category.code} - ${category.name}`
			}))
		);
	}

	public async fetchToolByUuid(uuid: string): Promise<void> {
		await this.toolStateService.fetchToolByUuid(uuid);
		this.changeTab.emit('form');
	}

	public async onDeleteTool(uuid: string): Promise<void> {
		await this.toolStateService.deleteTool(uuid);
	}

	public navigateToInstances(toolTypeId: string): void {
		console.log({toolTypeId})
		this.router.navigate(['admin/tools/instances', toolTypeId]);
	}

	public async downloadExcel(): Promise<void> {
		try {
			const url = `${environment.apiUrlTools}/tool-instances/export-to-excel`;
			const response = await fetch(url);
			
			if (!response.ok) {
				throw new Error('Error al descargar el archivo');
			}
			
			const blob = await response.blob();
			const downloadUrl = window.URL.createObjectURL(blob);
			const a = document.createElement('a');
			a.href = downloadUrl;
			a.download = 'herramientas.xlsx';
			document.body.appendChild(a);
			a.click();
			document.body.removeChild(a);
			window.URL.revokeObjectURL(downloadUrl);
		} catch (error) {
			console.error('Error al descargar Excel:', error);
		}
	}
}

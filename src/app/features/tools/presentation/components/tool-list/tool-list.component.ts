import { Component, effect, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import PRIMENG_IMPORTS from '../../provider/primeng.components';
import { Tool } from '../../../domain/entities/tool.entity';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToolStateService } from '../../services/tool-state.service';

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
	public tools: Tool[] = [];

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
		this.tools = await this.toolStateService.fetchTools({
			page: this.page,
			limit: this.limit
		});
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
}
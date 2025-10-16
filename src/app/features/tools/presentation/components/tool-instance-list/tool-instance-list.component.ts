import { Component, effect, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import PRIMENG_IMPORTS from '../../provider/primeng.components';
import { ToolInstance } from '../../../domain/entities/tool-instance.entity';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToolInstanceStateService } from '../../services/tool-instance-state.service';

@Component({
	selector: 'tools-tool-instance-list',
	standalone: true,
	templateUrl: './tool-instance-list.component.html',
	imports: [...PRIMENG_IMPORTS, CommonModule, FormsModule],
})
export class ToolInstanceListComponent implements OnInit {
	private readonly toolInstanceStateService = inject(ToolInstanceStateService);
	private readonly route = inject(ActivatedRoute);

	public toolTypeId: string = '';
	public toolInstances: ToolInstance[] = [];

	@Output()
	changeTab: EventEmitter<string> = new EventEmitter<string>();

	constructor() {
		effect(() => {
			if (this.toolInstanceStateService.shouldReload()) {
				this.loadToolInstances();
				this.toolInstanceStateService.resetReloadFlag();
			}
		});
	}

	ngOnInit(): void {
		this.toolTypeId = this.route.snapshot.paramMap.get('toolTypeId') || '';
		this.loadToolInstances();
	}

	private async loadToolInstances(): Promise<void> {
		if (!this.toolTypeId) return;
		this.toolInstances = await this.toolInstanceStateService.fetchToolInstances({
			toolTypeId: this.toolTypeId
		});
	}

	public async fetchToolInstanceByUuid(uuid: string): Promise<void> {
		await this.toolInstanceStateService.fetchToolInstanceByUuid(uuid);
		this.changeTab.emit('form');
	}

	public async onDeleteToolInstance(uuid: string): Promise<void> {
		await this.toolInstanceStateService.deleteToolInstance(uuid);
	}

	public onCreateNew(): void {
		this.toolInstanceStateService.clearSelection();
		this.changeTab.emit('form');
	}
}

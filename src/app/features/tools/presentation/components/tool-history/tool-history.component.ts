import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import PRIMENG_IMPORTS from '../../provider/primeng.components';
import { ToolHistory } from '../../../domain/entities/tool-history.entity';
import { GetToolHistoryUseCase } from '../../../application/use-cases/tool-history/get-tool-history.use-case';
import { infrastructureProviders } from '../../../infrastructure/di/provider';

@Component({
	selector: 'app-tool-history',
	standalone: true,
	imports: [PRIMENG_IMPORTS, CommonModule],
	templateUrl: './tool-history.component.html',
	providers: [
		MessageService,
		GetToolHistoryUseCase,
		...infrastructureProviders,
	],
})
export class ToolHistoryComponent implements OnInit {
	private readonly route = inject(ActivatedRoute);
	private readonly router = inject(Router);
	private readonly getToolHistoryUseCase = inject(GetToolHistoryUseCase);
	private readonly messageService = inject(MessageService);

	public toolHistory = signal<ToolHistory[]>([]);
	public isLoading = signal(false);
	public toolInstanceId: string = '';
	public serialCode: string = '';

	ngOnInit(): void {
		this.route.params.subscribe((params) => {
			this.toolInstanceId = params['instanceId'];
			this.serialCode = params['serialCode'] || 'Instancia';
			if (this.toolInstanceId) {
				this.loadHistory();
			}
		});
	}

	private async loadHistory(): Promise<void> {
		this.isLoading.set(true);
		try {
			const response = await this.getToolHistoryUseCase.execute(this.toolInstanceId).toPromise();
			if (response && response.success) {
				this.toolHistory.set(response.data);
			}
		} catch (error) {
			this.messageService.add({
				severity: 'error',
				summary: 'Error',
				detail: 'No se pudo cargar el historial',
			});
		} finally {
			this.isLoading.set(false);
		}
	}

	public getTipoEventoLabel(tipo: string): string {
		const labels: { [key: string]: string } = {
			assigned: 'Asignado',
			returned: 'Devuelto',
			maintenance: 'Mantenimiento',
			transferred: 'Transferido',
		};
		return labels[tipo] || tipo;
	}

	public getTipoEventoSeverity(tipo: string): 'success' | 'info' | 'warn' | 'danger' {
		const severities: { [key: string]: 'success' | 'info' | 'warn' | 'danger' } = {
			assigned: 'info',
			returned: 'success',
			maintenance: 'warn',
			transferred: 'danger',
		};
		return severities[tipo] || 'info';
	}

	public goBack(): void {
		this.router.navigate(['/admin/tools']);
	}
}

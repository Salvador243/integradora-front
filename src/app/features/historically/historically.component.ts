import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'app-historically',
	standalone: true,
	imports: [CommonModule],
	template: `
		<div class="p-4">
			<h1 class="text-2xl font-bold mb-4">Históricos</h1>
			<p class="text-gray-600">Módulo en desarrollo...</p>
		</div>
	`,
})
export class HistoricallyComponent {}

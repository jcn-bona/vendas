import { Component, Input } from '@angular/core';
import { MaterialModule } from '../../../material.module';
import { Fornecedor } from '../../fornecedor.dto'
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-fornecedor-card',
  standalone: true,
  imports: [MaterialModule, RouterLink],
  templateUrl: './fornecedor-card.component.html',
})
export class FornecedorCardComponent {
  @Input({required: true}) fornecedor: Fornecedor
}

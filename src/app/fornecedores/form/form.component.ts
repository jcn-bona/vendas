import { Component, EventEmitter, Input, Output, ViewChild, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators, NgForm } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

import { Fornecedor } from '../fornecedor.dto';

@Component({
  selector: 'fornecedor-form',
  standalone: true,
  imports: [ MatButtonModule, MatInputModule, ReactiveFormsModule, MatCardModule, MatIconModule ],
  templateUrl: './form.component.html',
  styles: ``
})
export class FornecedorFormComponent {
  @ViewChild('form') form : NgForm;

  @Output() save = new EventEmitter<Fornecedor>();

  @Output() back = new EventEmitter();

  private fb = inject(FormBuilder)

  fornecedorForm = this.fb.group({
    id: [null],
    name: ['', [Validators.required, Validators.minLength(3)]],
    description: ['', Validators.required]
  })

  @Input() set fornecedor(fornecedor: Fornecedor) {
    this.fornecedorForm.setValue(fornecedor)
  };

  onSubmit(): void {
    this.save.emit(this.fornecedorForm.value as Fornecedor) // Manda os dados para o form pai
    this.form.resetForm(); // Limpa o form após submissão
    this.back.emit();
  }

  onBack(): void {
    this.back.emit();
  }
}

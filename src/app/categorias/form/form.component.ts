import { Component, EventEmitter, Input, Output, ViewChild, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators, NgForm } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { Categoria } from '../categoria.dto';

@Component({
  selector: 'categoria-form',
  standalone: true,
  imports: [ MatButtonModule, MatInputModule, ReactiveFormsModule, MatCardModule, MatIconModule ],
  templateUrl: './form.component.html',
  styles: ``
})
export class CategoriaFormComponent {
  @ViewChild('form') form : NgForm;
  
  @Output() save = new EventEmitter<Categoria>();
  
  @Output() back = new EventEmitter();
  
  private fb = inject(FormBuilder)

  categoriaForm = this.fb.group({
    id: [null],
    name: ['', [Validators.required, Validators.minLength(3)]],
    description: ['', Validators.required]
  })

  @Input() set categoria(categoria: Categoria) {
    this.categoriaForm.setValue(categoria)
  };

  onSubmit(): void {
    this.save.emit(this.categoriaForm.value as Categoria) // Manda os dados para o form pai
    this.form.resetForm(); // Limpa o form após submissão
    this.back.emit();
  }
  
  onBack(): void {
    this.back.emit();
  }
}

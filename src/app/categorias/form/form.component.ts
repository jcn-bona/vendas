import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'categoria-form',
  standalone: true,
  imports: [
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    MatCardModule
  ],
  templateUrl: './form.component.html',
  styles: ``
})
export class CategoriaFormComponent {

  private fb = inject(FormBuilder)

  categoryForm = this.fb.group({
    id: [null],
    name: ['', Validators.required, Validators.minLength(3)],
    description: ['', Validators.required]
  })

}

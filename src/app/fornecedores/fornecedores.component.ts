import { Component } from '@angular/core';
import { MaterialModule } from '../material.module';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-fornecedores',
  standalone: true,
  imports: [MaterialModule, RouterOutlet],
  templateUrl: './fornecedores.component.html',
})
export class FornecedoresComponent {

}

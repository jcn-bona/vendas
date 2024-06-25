import { Component } from '@angular/core';
import { MatListModule } from '@angular/material/list';

interface MenuItems {
  path: string;
  label: string;
}

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [MatListModule],
  template: `
    @for (item of menuItems; track item.path) {
      <a mat-list-item [href]="item.path">{{ item.label }}</a>
    }
  `,
  styles: ``
})
export class MenuComponent {

  menuItems: Array<MenuItems> = [
    { 
      path: '/',
      label: 'Home' 
    },
    { 
      path: '/categorias',
      label: 'Categorias'
    },
    { 
      path: '/fornecedores', 
      label: 'Fornecedores' 
    }
  ]
}

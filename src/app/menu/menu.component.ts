import { Component } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { RouterLink } from '@angular/router';

interface MenuItems {
  path: string;
  label: string;
}

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [MatListModule, RouterLink],
  template: `
    @for (item of menuItems; track item.path) {
      <a mat-list-item [routerLink]="item.path">{{ item.label }}</a>
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

import { Routes } from '@angular/router'

import { HomeComponent } from './home/home.component'
import { CategoriasComponent } from './categorias/categorias.component'
import { FornecedoresComponent } from './fornecedores/fornecedores.component'

export const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'categorias', component: CategoriasComponent },
    { path: 'fornecedores', component: FornecedoresComponent}
]

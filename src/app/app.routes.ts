import { Routes } from '@angular/router'
import { CategoriasComponent } from './categorias/categorias.component'
import { FornecedoresComponent } from './fornecedores/fornecedores.component'
import { FornecedoresListComponent } from './fornecedores/fornecedores-list/fornecedores-list.component'

export const routes: Routes = [
    { path: 'categorias', component: CategoriasComponent },
    { path: 'fornecedores', component: FornecedoresComponent, children: [{ path: '', component: FornecedoresListComponent }]}
]
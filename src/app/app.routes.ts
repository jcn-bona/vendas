import { Routes } from '@angular/router'
import { CategoriasComponent } from './categorias/categorias.component'
import { FornecedoresComponent } from './fornecedores/fornecedores.component'
import { FornecedoresListComponent } from './fornecedores/fornecedores-list/fornecedores-list.component'
import { FornecedoresDeleteComponent } from './fornecedores/fornecedores-delete/fornecedores-delete.component'
import { FornecedoresEditComponent } from './fornecedores/fornecedores-edit/fornecedores-edit.component'
import { FornecedoresNewComponent } from './fornecedores/fornecedores-new/fornecedores-new.component'
import { FornecedoresShowComponent } from './fornecedores/fornecedores-show/fornecedores-show.component'

export const routes: Routes = [
    { path: 'categorias', component: CategoriasComponent },
    { path: 'fornecedores', component: FornecedoresComponent, 
        children: [
            { path: '', component: FornecedoresListComponent },
            { path: 'show/:id', component: FornecedoresShowComponent },
            { path: 'edit/:id', component: FornecedoresEditComponent },
            { path: 'del/:id', component: FornecedoresDeleteComponent },
            { path: 'new', component: FornecedoresNewComponent}
        ]
    }
]
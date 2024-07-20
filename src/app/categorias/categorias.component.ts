import { AfterViewInit, Component, inject, ViewChild } from '@angular/core';
import { MatTableModule, MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Categoria } from '../categorias/categoria.dto'
import { CategoriasItem } from './categorias-datasource';
import { CategoriaService } from './categoria.service';
import { lastValueFrom } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { CategoriaFormComponent } from "./form/form.component";
import { ConfirmationDialogService } from '../shared/services/confirmation-dialog/confirmation-dialog.service';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styles: `.full-width-table {width: 100%;}`,
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatSortModule, MatCardModule, MatButtonModule, MatIconModule,
    MatInputModule, MatSlideToggleModule, FormsModule, MatDividerModule, CategoriaFormComponent]
})
export class CategoriasComponent implements AfterViewInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<CategoriasItem>;

  dataSource = new MatTableDataSource<Categoria>();
  displayedColumns = ['id', 'name', 'description', 'action'];
  showFormCategoria: boolean = false;
  categoria!: Categoria;
  checked: boolean = false;
  status: String = 'Listagem'
  
  constructor(private categoriaService: CategoriaService) {}

  confirmationService = inject(ConfirmationDialogService);

  openModal(categoria: Categoria){
    this.confirmationService.confirm(
      "Confirma a exclusão do registro abaixo?", 
      'Categoria: ' + categoria.id + ' ' + categoria.name + ' ' + categoria.description, 
      "Confirma", 
      "Cancela"
    )
    .then((confirmed) => {
      this.deleteCategoria(categoria)
    })
    .catch(() => console.log('teste'))// Esta parte é executada se o usuário dispensar o modal clicando fora dele ou através do botão close (x).
  }
  
  hideFormCategoria(): void {
    this.showFormCategoria = false;
    this.status = 'Listagem';
  }

  onEditCategoriaClick(categoria: Categoria): void {
    this.categoria = categoria;
    this.showFormCategoria = true;
    this.checked = false;
    this.status = 'Edição'
  }

  deleteCategoria(categoria: Categoria): void {
    this.categoria = categoria;
    //this.showFormCategoria = true;
    this.checked = false;
    this.status = 'Exclusão'
  }

  ngAfterViewInit(): void {
    this.loadCategorias();
  }

  async onSave(categoria: Categoria): Promise<void> {
    const saved = await lastValueFrom(this.categoriaService.save(categoria));
    this.loadCategorias();
  }

  onNewCategoriaClick(): void {
    if (this.showFormCategoria) {
      this.showFormCategoria = false;
      this.status = 'Listagem';
    } else {
      this.showFormCategoria = true;
      this.categoria = {id: 0, name: '', description: ''}
      this.status = 'Inclusão';
    }
  }

  async loadCategorias(): Promise<void> {
    const categorias = await lastValueFrom(this.categoriaService.getAll())
    this.dataSource = new MatTableDataSource(categorias)
    this.table.dataSource = this.dataSource
    this.dataSource.sort = this.sort
    this.dataSource.paginator = this.paginator
  }
}

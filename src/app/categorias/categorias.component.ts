import { AfterViewInit, Component, ViewChild } from '@angular/core';
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
import { CategoriaFormComponent } from './form/form.component';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styles: `.full-width-table {width: 100%;}`,
  standalone: true,
  imports: [
    MatTableModule, 
    MatPaginatorModule, 
    MatSortModule, 
    MatCardModule, 
    MatButtonModule, 
    MatIconModule, 
    CategoriaFormComponent,
    MatInputModule

  ]
})
export class CategoriasComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<CategoriasItem>;

  dataSource = new MatTableDataSource<Categoria>();
  displayedColumns = ['id', 'name', 'description'];
  showFormCategoria: boolean = false;
  labelButtonCategoria: string = 'Nova Categoria';

  constructor(private categoriaService: CategoriaService) {}

  ngAfterViewInit(): void {
    this.loadCategorias();
  }

  onNewCategoryClick(): void {
    if (this.showFormCategoria) {
      this.showFormCategoria = false;
      this.labelButtonCategoria = 'Nova Categoria';
    } else {
      this.showFormCategoria = true;
      //this.category = {id: 0, name: '', description: ''}
      this.labelButtonCategoria = 'Fechar Nova Categoria';
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

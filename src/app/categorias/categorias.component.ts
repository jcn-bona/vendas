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

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styles: `.full-width-table {width: 100%;}`,
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatSortModule, MatCardModule, MatButtonModule, MatIconModule]
})
export class CategoriasComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<CategoriasItem>;

  dataSource = new MatTableDataSource<Categoria>();

  displayedColumns = ['id', 'name', 'description'];

  constructor(private categoriaService: CategoriaService) {}

  ngAfterViewInit(): void {
    this.loadCategorias();
  }

  async loadCategorias(): Promise<void> {
    const categorias = await lastValueFrom(this.categoriaService.getAll())
    this.dataSource = new MatTableDataSource(categorias)
    this.table.dataSource = this.dataSource
    this.dataSource.sort = this.sort
    this.dataSource.paginator = this.paginator
  }
}

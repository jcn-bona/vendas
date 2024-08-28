import { AfterViewInit, Component, inject, ViewChild } from '@angular/core';
import { lastValueFrom } from 'rxjs';

import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MaterialModule } from '../shared/material/material.module';
import { MatTable, MatTableDataSource } from '@angular/material/table';

import { FornecedorFormComponent } from "./form/form.component";
import { ConfirmationDialogService } from '../shared/dialog/confirmation-dialog.service';
import { LoadingBarComponent } from "../shared/load-bar/loading-bar.component";
import { Fornecedor } from '../fornecedores/fornecedor.dto'
import { FornecedorService } from './fornecedor.service';

@Component({
  selector: 'app-fornecedores',
  templateUrl: './fornecedores.component.html',
  styles: `.full-width-table {width: 100%;}`,
  standalone: true,
  imports: [MaterialModule, FornecedorFormComponent, LoadingBarComponent]
})
export class FornecedoresComponent implements AfterViewInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Fornecedor>;

  dataSource = new MatTableDataSource<Fornecedor>();
  displayedColumns = ['id', 'companyName', 'contactName', 'action'];
  showFormFornecedor: boolean = false;
  fornecedor!: Fornecedor;
  checked: boolean = false;
  status: String = 'Listagem';
  showLoadingBar: boolean = true;

  constructor(private fornecedorService: FornecedorService) {}

  confirmationService = inject(ConfirmationDialogService);

  openModal(fornecedor: Fornecedor){
    this.checked = false;
    this.status = 'Exclusão'
    this.confirmationService.confirm(
      "Confirma a exclusão do registro abaixo?",
      'Categoria: ' + fornecedor.id + ' ' + fornecedor.companyName,
      "Confirma",
      "Cancela"
    )
    .then((confirmed) => {
      if (confirmed) {
        this.deleteFornecedor(fornecedor)
      }
    })
    .catch(() => console.log('teste')
    )// Esta parte é executada se o usuário dispensar o modal clicando fora dele ou através do botão close (x).
    .then(() => {
      this.checked = false;
      this.status = 'Edição'
    })
  }

  async deleteFornecedor(fornecedor:Fornecedor) {
    await lastValueFrom(this.fornecedorService.delete(fornecedor.id))
    this.loadFornecedores();
  }

  hideFormFornecedor(): void {
    this.showFormFornecedor = false;
    this.status = 'Listagem';
  }

  onEditFornecedorClick(fornecedor: Fornecedor): void {
    this.fornecedor = fornecedor;
    this.showFormFornecedor = true;
    this.checked = false;
    this.status = 'Edição'
  }

  ngAfterViewInit(): void {
    this.loadFornecedores();
  }

  async onSave(fornecedor: Fornecedor): Promise<void> {
    const saved = await lastValueFrom(this.fornecedorService.save(fornecedor));
    this.loadFornecedores();
  }

  onNewFornecedorClick(): void {
    if (this.showFormFornecedor) {
      this.showFormFornecedor = false;
      this.status = 'Listagem';
    } else {
      this.showFormFornecedor = true;
      this.fornecedor = {
        id: 0,
        companyName: '',
        contactName: '',
        contactTitle: '',
        address: {
          street: '',
          city: '',
          region: '',
          postalCode: 0,
          country: '',
          phone: ''
        }
      }
      this.status = 'Inclusão';
    }
  }

  async loadFornecedores(): Promise<void> {
    this.showLoadingBar = true;
    const fornecedores = await lastValueFrom(this.fornecedorService.getAll());
    this.dataSource = new MatTableDataSource(fornecedores);
    this.table.dataSource = this.dataSource;
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.showLoadingBar = false;
  }
}

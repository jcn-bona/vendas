import { Component, OnInit } from '@angular/core'
import { MaterialModule } from '../../material.module'
import { Observable, lastValueFrom } from 'rxjs'
import { Fornecedor } from '../fornecedor.dto'
import { FornecedorService } from './../fornecedor.service'
import { AsyncPipe } from '@angular/common'
import { RouterLink } from '@angular/router'
import { FornecedorCardComponent } from "./fornecedor-card/fornecedor-card.component";

@Component({
  selector: 'app-suppliers-list',
  standalone: true,
  imports: [MaterialModule, RouterLink, AsyncPipe, FornecedorCardComponent],
  templateUrl: './fornecedores-list.component.html',
})
export class FornecedoresListComponent implements OnInit {

  fornecedores!: Fornecedor[]
  fornecedoresObservable!: Observable<Fornecedor[]>

  constructor(private fornecedorService: FornecedorService) { }

  async ngOnInit() {
    this.fornecedoresObservable = this.fornecedorService.getAll()
    this.fornecedores = await lastValueFrom(this.fornecedoresObservable)
  }
}
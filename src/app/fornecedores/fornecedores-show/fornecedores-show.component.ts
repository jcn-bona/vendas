import { Component, OnInit, inject } from '@angular/core'
import { MaterialModule } from '../../material.module'
import { ActivatedRoute, Route, RouterLink } from '@angular/router'
import { FornecedorService } from '../fornecedor.service'
import { Fornecedor } from '../fornecedor.dto'
import { Observable, lastValueFrom } from 'rxjs'
import { AsyncPipe } from '@angular/common'

@Component({
  selector: 'app-fornecedores-show',
  standalone: true,
  imports: [MaterialModule, AsyncPipe, RouterLink],
  templateUrl: './fornecedores-show.component.html',
})
export class FornecedoresShowComponent implements OnInit {

  route = inject(ActivatedRoute)
  fornecedorService = inject(FornecedorService)
  fornecedor: Fornecedor
  fornecedorObservable: Observable<Fornecedor>

  async ngOnInit() {
    const id: Number = +(this.route.snapshot.paramMap.get('id') || 0)
    this.fornecedorObservable = this.fornecedorService.getById(id)
    this.fornecedor = await lastValueFrom(this.fornecedorObservable)
    console.log(this.fornecedor)
  }
}
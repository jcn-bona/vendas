import { Component, inject } from '@angular/core'
import { ActivatedRoute, RouterLink } from '@angular/router'
import { Observable, lastValueFrom } from 'rxjs'
import { FornecedorService } from '../fornecedor.service'
import { Fornecedor } from '../fornecedor.dto'
import { AsyncPipe } from '@angular/common'
import { LoadingBarComponent } from '../../loading-bar.component'
import { MaterialModule } from '../../material.module'
import { FornecedoresFormComponent } from "../fornecedores-form/fornecedores-form.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-fornecedores-edit',
  standalone: true,
  imports: [MaterialModule, AsyncPipe, LoadingBarComponent, RouterLink, FornecedoresFormComponent],
  templateUrl: './fornecedores-edit.component.html',
  styles: ``
})
export class FornecedoresEditComponent {

  route = inject(ActivatedRoute)
  fornecedorService = inject(FornecedorService)
  fornecedor: Fornecedor
  fornecedorObservable: Observable<Fornecedor>
  router = inject(Router)

  async ngOnInit() {
    const id: Number = +(this.route.snapshot.paramMap.get('id') || 0)
    this.fornecedorObservable = this.fornecedorService.getById(id)
    this.fornecedor = await lastValueFrom(this.fornecedorObservable)
  }

  async onSave(fornecedor: Fornecedor) {
    this.fornecedorObservable = this.fornecedorService.save(fornecedor);
    this.fornecedor = await lastValueFrom(this.fornecedorObservable);
    this.router.navigate(['/fornecedores/show/', fornecedor?.id]);
  }

    onBack() {
      this.router.navigate(['/fornecedores']);
    }
}
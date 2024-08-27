import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Fornecedor } from '../fornecedor.dto'
import { MaterialModule } from '../../shared/material/material.module'

@Component({
  selector: 'app-fornecedores-form',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './fornecedores-form.component.html',
  styles: ``
})
export class FornecedoresFormComponent implements OnInit {

  @Input({ required: true }) fornecedor: Fornecedor
  @Output() save = new EventEmitter<Fornecedor>()
  @Output() back = new EventEmitter()
  fornecedorForm: FormGroup
  private fb = inject(FormBuilder)

  ngOnInit(): void {
    this.fornecedorForm = this.fb.group({
      id: [ this.fornecedor.id ],
      companyName: [ this.fornecedor.companyName, [Validators.required, Validators.minLength(3)] ],
      contactName: [ this.fornecedor.contactName, [Validators.required, Validators.minLength(3)] ],
      contactTitle: [this.fornecedor.contactTitle],
      address: this.fb.group({
         city: [this.fornecedor.address.city],
      country: [this.fornecedor.address.country],
        phone: [this.fornecedor.address.phone],
   postalCode: [this.fornecedor.address.postalCode],
       region: [this.fornecedor.address.region],
       street: [this.fornecedor.address.street]
      })
    })
  }
  onSubmit(): void {
    this.save.emit(this.fornecedorForm.value as Fornecedor)
  }
  onBack(event: { preventDefault: () => void }) {
    event.preventDefault()
    this.back.emit()
  }
}

import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { environment } from '../../environments/environment'
import { Fornecedor } from './fornecedor.dto'

@Injectable({ providedIn: 'root' }) export class FornecedorService {
  constructor(private http: HttpClient) { }
  public getAll(): Observable<Fornecedor[]> {
    return this.http.get<Fornecedor[]>(environment.api + 'suppliers')
  }
  public getById(id: Number): Observable<Fornecedor> {
    return this.http.get<Fornecedor>(environment.api + 'suppliers/' + id)
  }
  public save(supplier: Fornecedor): Observable<Fornecedor> {
    if (supplier.id)
      return this.http.put<Fornecedor>(
        environment.api + 'suppliers/' + supplier.id,
        supplier
      )
    return this.http.post<Fornecedor>(environment.api + 'suppliers', supplier)
  }
  public delete(id?: number): Observable<Fornecedor> {
    return this.http.delete<Fornecedor>(environment.api + 'suppliers/' + id)
  }

  public create(): Fornecedor {
    return {
      id: 0,
      companyName: '',
      contactName: '',
      contactTitle: '',
      address: {
        city: '',
        phone: '',
        country: '',
        postalCode: 0,
        region: '',
        street: ''
      }
    }
  }
}

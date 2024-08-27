import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';
import { Fornecedor } from './fornecedor.dto'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FornecedorService {

  constructor(private http: HttpClient) {}

  public getAll(): Observable<Fornecedor[]> {
    return this.http.get<Fornecedor[]>(environment.api + 'suppliers')
  }

  public save(fornecedor: Fornecedor): Observable<Fornecedor> {
    if (fornecedor.id) {
      return this.http.put<Fornecedor>(environment.api + 'suppliers/' + fornecedor.id, fornecedor)
    } else {
      return this.http.post<Fornecedor>(environment.api + 'suppliers', fornecedor)
    }
  }

  public delete(id: number) {
    return this.http.delete(environment.api + 'suppliers/' + id);
  }
}

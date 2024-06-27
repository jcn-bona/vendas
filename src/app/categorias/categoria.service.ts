import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {Categoria} from './categoria.dto'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  constructor(private http: HttpClient) {}

  public getAll(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(environment.api + 'categories')
  }

}

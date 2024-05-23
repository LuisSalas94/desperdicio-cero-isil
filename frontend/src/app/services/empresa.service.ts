import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Empresa } from '../models/empresa';
import { Observable } from 'rxjs';

const BASIC_URL = 'http://localhost:8080';

@Injectable({
  providedIn: 'root',
})
export class EmpresaService {
  constructor(private http: HttpClient) {}

  create(empresa: Empresa): Observable<Empresa> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<Empresa>(`${BASIC_URL}/api/empresas`, empresa, {
      headers,
    });
  }

  eliminar(id: number): Observable<Empresa> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete<Empresa>(`${BASIC_URL}/api/empresas/${id}`, {
      headers,
    });
  }

  findAll(): Observable<Empresa[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Empresa[]>(`${BASIC_URL}/api/empresas`, { headers });
  }
}

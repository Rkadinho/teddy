import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Clientes, clientesResponse, response } from '../models/clientes';

@Injectable({
  providedIn: 'root'
})
export class ServicoClientesService {
  private apiUrl = 'https://boasorte.teddybackoffice.com.br/users';

  constructor(private http: HttpClient) {}

  listarClientes(): Observable<response[]> {
    return this.http.get<response[]>(this.apiUrl);
  }

  buscarClientes(id: number): Observable<Clientes> {
    return this.http.get<Clientes>(`${this.apiUrl}/${id}`);
  }

  criarCLiente(cliente: Clientes): Observable<Clientes> {
    return this.http.post<Clientes>(this.apiUrl, cliente);
  }

  atualizarCliente(id: number, dados: Partial<Clientes>): Observable<Clientes> {
    return this.http.patch<Clientes>(`${this.apiUrl}/${id}`, dados);
  }

  deletarCliente(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

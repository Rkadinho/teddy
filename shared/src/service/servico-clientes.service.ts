import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { cleintesRequest, Clientes, clientesResponse, response } from '../models/clientes';

@Injectable({
  providedIn: 'root'
})
export class ServicoClientesService {
  private apiUrl = 'https://boasorte.teddybackoffice.com.br/users';

  constructor(private http: HttpClient) {}

  listarClientes(page: number, limit: number): Observable<response[]> {
    const params = { page, limit };
    return this.http.get<response[]>(this.apiUrl, {params});
  }

  buscarClientes(id: number): Observable<Clientes> {
    return this.http.get<Clientes>(`${this.apiUrl}/${id}`);
  }

  criarCliente(cliente: cleintesRequest): Observable<clientesResponse> {
    return this.http.post<clientesResponse>(this.apiUrl, cliente);
  }

  atualizarCliente(id: number, dados: Partial<cleintesRequest>): Observable<clientesResponse> {
    return this.http.patch<clientesResponse>(`${this.apiUrl}/${id}`, dados);
  }

  deletarCliente(id: number): Observable<string> {
    return this.http.delete(`${this.apiUrl}/${id}`, {
      responseType: 'text',
      observe: 'body'
    }) as Observable<string>;
  }
}

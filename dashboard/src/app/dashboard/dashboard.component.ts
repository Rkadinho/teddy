import { DadosCacheService,
        TeddyBotaoComponent,
        ServicoClientesService,
        TeddyCardComponent,
        clientesResponse} from '@teddy/lib';
import { Component} from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavegacaoComponent } from "../navegacao/navegacao.component";
@Component({
  selector: 'app-dashboard',
  imports: [NavegacaoComponent, CommonModule, TeddyBotaoComponent, TeddyCardComponent, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  nome = ''
  clientesEncontrados = ' clientes encontrados';
  clientesPagina = 'Clientes por página: 16';
  textoBotao = "Criar cliente";
  listaClientes: clientesResponse[] = [];

  constructor(
    private dadosCache: DadosCacheService,
    private clientesService: ServicoClientesService
  ) {
    this.nome = this.dadosCache.nomeUsuario;
    this.clientesService.listarUsuarios().subscribe((res: any) => {
    this.listaClientes = res.clients;
    })
  }

  formatarValor(valor: number): string {
    return valor.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
    });
  }
}

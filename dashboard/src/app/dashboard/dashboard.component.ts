import { DadosCacheService, TeddyBotaoComponent } from '@teddy/lib';
import { Component} from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavegacaoComponent } from "../navegacao/navegacao.component";

@Component({
  selector: 'app-dashboard',
  imports: [NavegacaoComponent, CommonModule, TeddyBotaoComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  nome = ''
  clientesEncontrados = '16 clientes encontrados';
  clientesPagina = 'Clientes por página: 16';
  textoBotao = "Criar cliente";

  constructor(private dadosCache: DadosCacheService) {
    this.nome = this.dadosCache.nomeUsuario;
  }

}

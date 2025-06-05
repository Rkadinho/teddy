import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DadosCacheService } from '@teddy/lib';

@Component({
   imports: [RouterModule, CommonModule],
  selector: 'app-navegacao',
  templateUrl: './navegacao.component.html',
  styleUrls: ['./navegacao.component.css']
})
export class NavegacaoComponent {
  nome = ''
  abaClientes = 'Clientes';
  abaClientesSelecionados = 'Clientes selecionados';
  abaSair = 'Sair';
  textoBoasVindas = 'Olá, '

  constructor(private dadosCache: DadosCacheService) {
    this.nome = this.dadosCache.nomeUsuario;
  }

  sair() {
    this.dadosCache.limparDados()
  }
}

import { DadosCacheService, MenuService } from '@teddy/lib';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-menu-horizontal',
  imports: [RouterModule, CommonModule],
  templateUrl: './menu-horizontal.component.html',
  styleUrls: ['./menu-horizontal.component.css']
})
export class MenuHorizontalComponent{
  nome = ''
  abaClientes = 'Clientes';
  abaClientesSelecionados = 'Clientes selecionados';
  abaSair = 'Sair';
  textoBoasVindas = 'Olá, '

  constructor(
    private dadosCache: DadosCacheService,
    private menuService: MenuService
  ) {
    this.nome = this.dadosCache.nomeUsuario;
  }

  sair() {
    this.dadosCache.limparDados()
  }

  toggleMenu() {
    this.menuService.toggleMenu();
  }

}

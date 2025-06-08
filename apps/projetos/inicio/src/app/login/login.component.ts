import { TeddyInputBasicoComponent, TeddyBotaoComponent, DadosCacheService } from '@teddy/lib';
import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  imports: [TeddyBotaoComponent, TeddyInputBasicoComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  titulo= 'Olá, seja bem-vindo!'
  textoBotao = 'Entrar';
  tamanho= 'medio';
  desativado = false;
  placeholder = 'Digite o seu nome:';
  obrigatorio = true;
  nome = '';
  alt = 'Logo Teddy';
  altura = 24;

  constructor(
    private router: Router,
    private dadosCache: DadosCacheService
  ) {}

  entrar() {
    this.dadosCache.nomeUsuario = this.nome;
    this.router.navigate(['/dashboard']);
  }

}

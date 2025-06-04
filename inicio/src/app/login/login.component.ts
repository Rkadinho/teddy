import { TeddyBotaoComponent } from '@teddy/teddy-botao';
import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  imports: [TeddyBotaoComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  textoBotao = 'Entrar';
}

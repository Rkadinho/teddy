import { DadosCacheService } from '@teddy/lib';
import { Component} from '@angular/core';
import { NavegacaoComponent } from '../navegacao/navegacao.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [NavegacaoComponent, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  nome = ''
  abaClientes = 'Clientes';
  abaClientesSelecionados = 'Clientes selecionados';
  abaSair = 'Sair';
  textoBoasVindas = 'Olá, '

  constructor(private dadosCache: DadosCacheService) {
    this.nome = this.dadosCache.nomeUsuario;
  }

}

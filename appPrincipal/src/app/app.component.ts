import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MenuHorizontalComponent } from 'menus/src/app/menu-horizontal/menu-horizontal.component';
import { MenuVerticalComponent } from 'menus/src/app/menu-vertical/menu-vertical.component';
import { TeddyToastComponent, ToastService } from "@teddy/lib";

@Component({
  imports: [RouterModule, MenuHorizontalComponent, CommonModule, MenuVerticalComponent, TeddyToastComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit{
  title = 'Teddy';
  mostrarToast = false;
  mensagemToast = '';
  tipoToast: 'sucesso' | 'erro' | 'info' = 'sucesso';

  constructor(
    public router: Router,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    this.toastService.toast$.subscribe(({ mensagem, tipo }) => {
      this.mensagemToast = mensagem;
      this.tipoToast = tipo;
      this.mostrarToast = true;

      setTimeout(() => {
        this.mostrarToast = false;
      }, 3000);
    });
  }

  fecharToastManual() {
    this.mostrarToast = false;
  }
}

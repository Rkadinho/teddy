import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenuService } from '@teddy/lib';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-menu-vertical',
  imports: [RouterModule, CommonModule],
  templateUrl: './menu-vertical.component.html',
  styleUrls: ['./menu-vertical.component.css']
})
export class MenuVerticalComponent implements OnInit, OnDestroy{
  abrirMenu = true;
  clientes = 'Clientes';
  clientesSelecionados = 'Clientes selecionados';

  private sub!: Subscription;

  constructor(private menuService: MenuService) {}

  ngOnInit() {
    this.sub = this.menuService.menuAberto$.subscribe((aberto) => {
      this.abrirMenu = aberto;
    });
  }

  ngOnDestroy() {
    if(this.sub) {
      this.sub.unsubscribe();
    }
  }

  fechar() {
    this.abrirMenu = false;
  }
}

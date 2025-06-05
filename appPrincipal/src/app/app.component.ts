import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MenuHorizontalComponent } from 'menus/src/app/menu-horizontal/menu-horizontal.component';
import { MenuVerticalComponent } from 'menus/src/app/menu-vertical/menu-vertical.component';

@Component({
  imports: [RouterModule, MenuHorizontalComponent, CommonModule, MenuVerticalComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Teddy';

  constructor(public router: Router) {}
}

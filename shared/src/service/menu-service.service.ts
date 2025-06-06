import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MenuService {

  private menuAbertoSubject = new BehaviorSubject<boolean>(true);
  menuAberto$ = this.menuAbertoSubject.asObservable();

  toggleMenu() {
    const atual = this.menuAbertoSubject.value;
    this.menuAbertoSubject.next(!atual);
  }

  fecharMenu() {
    this.menuAbertoSubject.next(false);
  }

  abrirMenu() {
    this.menuAbertoSubject.next(true);
  }
}

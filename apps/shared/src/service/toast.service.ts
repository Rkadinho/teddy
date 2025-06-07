import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  private toastSubject = new Subject<{ mensagem: string, tipo: 'sucesso' | 'erro' | 'info' }>();

  toast$ = this.toastSubject.asObservable();

  mostrarToast(mensagem: string, tipo: 'sucesso' | 'erro' | 'info' = 'sucesso') {
    this.toastSubject.next({ mensagem, tipo });
  }

}

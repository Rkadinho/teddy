import { TestBed } from '@angular/core/testing';
import { ToastService } from '../../src/service/toast.service';

describe('ToastService', () => {
  let service: ToastService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ToastService]
    });
    service = TestBed.inject(ToastService);
  });

  it('deve ser criado', () => {
    expect(service).toBeTruthy();
  });

  it('deve emitir um toast de sucesso', (done) => {
    service.toast$.subscribe(toast => {
      expect(toast.mensagem).toBe('Operação realizada!');
      expect(toast.tipo).toBe('sucesso');
      done();
    });

    service.mostrarToast('Operação realizada!', 'sucesso');
  });

  it('deve emitir um toast de erro', (done) => {
    service.toast$.subscribe(toast => {
      expect(toast.mensagem).toBe('Algo deu errado!');
      expect(toast.tipo).toBe('erro');
      done();
    });

    service.mostrarToast('Algo deu errado!', 'erro');
  });

  it('deve emitir um toast do tipo padrão (sucesso)', (done) => {
    service.toast$.subscribe(toast => {
      expect(toast.mensagem).toBe('Mensagem padrão');
      expect(toast.tipo).toBe('sucesso');
      done();
    });

    service.mostrarToast('Mensagem padrão');
  });
});

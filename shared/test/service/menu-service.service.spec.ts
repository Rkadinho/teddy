import { TestBed } from '@angular/core/testing';
import { MenuService } from '../../src/service/menu-service.service';

describe('MenuService', () => {
  let service: MenuService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MenuService]
    });
    service = TestBed.inject(MenuService);
  });

  it('deve ser criado', () => {
    expect(service).toBeTruthy();
  });

  it('deve alternar o estado do menu', () => {
    let valorAtual: boolean | undefined;

    service.menuAberto$.subscribe(valor => valorAtual = valor);

    const valorInicial = valorAtual;
    service.toggleMenu();
    expect(valorAtual).toBe(!valorInicial);
  });

  it('deve fechar o menu', () => {
    let valorAtual: boolean | undefined;

    service.menuAberto$.subscribe(valor => valorAtual = valor);
    service.fecharMenu();

    expect(valorAtual).toBe(false);
  });

  it('deve abrir o menu', () => {
    let valorAtual: boolean | undefined;

    service.menuAberto$.subscribe(valor => valorAtual = valor);
    service.fecharMenu();
    service.abrirMenu();

    expect(valorAtual).toBe(true);
  });
});

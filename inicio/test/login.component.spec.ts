import { TestBed } from '@angular/core/testing';
import { LoginComponent } from '../src/app/login/login.component';
import { Router } from '@angular/router';
import { DadosCacheService } from '@teddy/lib';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let router: Router;
  let dadosCacheService: DadosCacheService;

  beforeEach(async () => {
    const routerMock = { navigate: jest.fn() };
    const dadosCacheMock = { nomeUsuario: '' };

    await TestBed.configureTestingModule({
      imports: [LoginComponent],
      providers: [
        { provide: Router, useValue: routerMock },
        { provide: DadosCacheService, useValue: dadosCacheMock },
      ],
    }).compileComponents();

    const fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    dadosCacheService = TestBed.inject(DadosCacheService);
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve salvar nome e navegar para dashboard ao chamar entrar()', () => {
    component.nome = 'Maria';
    component.entrar();

    expect(dadosCacheService.nomeUsuario).toBe('Maria');
    expect(router.navigate).toHaveBeenCalledWith(['/dashboard']);
  });
});

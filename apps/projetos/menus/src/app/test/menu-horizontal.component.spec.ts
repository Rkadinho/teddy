import { TestBed } from '@angular/core/testing';
import { MenuHorizontalComponent } from '../menu-horizontal/menu-horizontal.component';
import { DadosCacheService, MenuService } from '@teddy/lib';

describe('MenuHorizontalComponent', () => {
  let component: MenuHorizontalComponent;
  let dadosCacheServiceMock: any;
  let menuServiceMock: any;

  beforeEach(async () => {
    dadosCacheServiceMock = {
      nomeUsuario: 'Maria',
      limparDados: jest.fn(),
    };

    menuServiceMock = {
      toggleMenu: jest.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [MenuHorizontalComponent],
      providers: [
        { provide: DadosCacheService, useValue: dadosCacheServiceMock },
        { provide: MenuService, useValue: menuServiceMock },
      ],
    }).compileComponents();

    const fixture = TestBed.createComponent(MenuHorizontalComponent);
    component = fixture.componentInstance;
  });

  it('deve ser criado corretamente', () => {
    expect(component).toBeTruthy();
  });

  it('deve carregar o nome do cache ao iniciar', () => {
    expect(component.nome).toBe('Maria');
  });

  it('deve chamar limparDados ao sair', () => {
    component.sair();
    expect(dadosCacheServiceMock.limparDados).toHaveBeenCalled();
  });

  it('deve chamar toggleMenu ao acionar o menu', () => {
    component.toggleMenu();
    expect(menuServiceMock.toggleMenu).toHaveBeenCalled();
  });
});

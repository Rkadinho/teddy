import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MenuVerticalComponent } from '../menu-vertical/menu-vertical.component';
import { MenuService } from '@teddy/lib';
import { Subject } from 'rxjs';

describe('MenuVerticalComponent', () => {
  let component: MenuVerticalComponent;
  let fixture: ComponentFixture<MenuVerticalComponent>;
  let menuSubject: Subject<boolean>;

  beforeEach(async () => {
    menuSubject = new Subject<boolean>();

    await TestBed.configureTestingModule({
      imports: [MenuVerticalComponent],
      providers: [
        {
          provide: MenuService,
          useValue: {
            menuAberto$: menuSubject,
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MenuVerticalComponent);
    component = fixture.componentInstance;
  });

  it('deve ser criado', () => {
    expect(component).toBeTruthy();
  });

  it('deve responder a alterações de menuAberto$', () => {
    component.ngOnInit();
    menuSubject.next(false);
    expect(component.abrirMenu).toBe(false);

    menuSubject.next(true);
    expect(component.abrirMenu).toBe(true);
  });

  it('deve executar unsubscribe no ngOnDestroy', () => {
    component.ngOnInit();
    const unsubscribeSpy = jest.spyOn(component['sub'], 'unsubscribe');
    component.ngOnDestroy();
    expect(unsubscribeSpy).toHaveBeenCalled();
  });

  it('deve fechar o menu ao chamar fechar()', () => {
    component.abrirMenu = true;
    component.fechar();
    expect(component.abrirMenu).toBe(false);
  });
});


import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { AppComponent } from '../src/app/app.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastService } from '@teddy/lib';
import { of } from 'rxjs';

const mockToastService = {
  toast$: of({ mensagem: 'Mensagem de teste', tipo: 'sucesso' })
};

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [
        RouterTestingModule,
        AppComponent
      ],
      providers: [
        { provide: ToastService, useValue: mockToastService }
      ]
    }).compileComponents();
  });

  it('deve criar o AppComponent', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('deve ter como título "Teddy"', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toBe('Teddy');
  });

  it('deve exibir toast ao receber evento do serviço', fakeAsync(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const component = fixture.componentInstance;

    fixture.detectChanges();
    tick();

    expect(component.mostrarToast).toBe(true);
    expect(component.mensagemToast).toBe('Mensagem de teste');
    expect(component.tipoToast).toBe('sucesso');
  }));

  it('deve fechar o toast manualmente', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const component = fixture.componentInstance;

    component.mostrarToast = true;
    component.fecharToastManual();
    expect(component.mostrarToast).toBe(false);
  });
});

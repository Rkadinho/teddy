import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { TeddyModalComponent } from '../../src/lib/teddy-modal/teddy-modal.component';
import { FormsModule } from '@angular/forms';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { TeddyBotaoComponent } from '../../src/lib/teddy-botao/teddy-botao.component';

describe('TeddyModalComponent', () => {
  let component: TeddyModalComponent;
  let fixture: ComponentFixture<TeddyModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [
      FormsModule,
      CurrencyMaskModule,
      TeddyModalComponent,
      TeddyBotaoComponent
    ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeddyModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve emitir evento fechar ao chamar fecharModal', () => {
    const spyFechar = jest.spyOn(component.fechar, 'emit');
    component.fecharModal();
    expect(spyFechar).toHaveBeenCalled();
  });

  it('deve emitir evento salvar ao chamar salvarCliente', () => {
    const spySalvar = jest.spyOn(component.salvar, 'emit');
    component.salvarCliente();
    expect(spySalvar).toHaveBeenCalledWith(component.cliente);
  });

  it('não deve emitir evento salvar se salvarClicado for true', () => {
    component.salvarClicado = true;
    const spySalvar = jest.spyOn(component.salvar, 'emit');
    component.salvarCliente();
    expect(spySalvar).not.toHaveBeenCalled();
  });

  it('deve resetar salvarClicado após 500ms', (done) => {
    component.salvarCliente();
    expect(component.salvarClicado).toBe(true);

    setTimeout(() => {
      expect(component.salvarClicado).toBe(false);
      done();
    }, 600);
  });
});


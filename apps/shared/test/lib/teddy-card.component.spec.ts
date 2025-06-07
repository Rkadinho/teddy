import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TeddyCardComponent } from '../../src/lib/teddy-card/teddy-card.component';

describe('TeddyCardComponent', () => {
  let component: TeddyCardComponent;
  let fixture: ComponentFixture<TeddyCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeddyCardComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeddyCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('deve emitir evento adicionar', () => {
    const spy = jest.spyOn(component.adicionar, 'emit');
    component.onAdicionar();
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('deve emitir evento editar', () => {
    const spy = jest.spyOn(component.editar, 'emit');
    component.onEditar();
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('deve emitir evento excluir', () => {
    const spy = jest.spyOn(component.excluir, 'emit');
    component.onExcluir();
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('deve emitir evento limparSelecionado', () => {
    const spy = jest.spyOn(component.limparSelecionado, 'emit');
    component.onLimparSelecionado();
    expect(spy).toHaveBeenCalledTimes(1);
  });
});

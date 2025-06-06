import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TeddyInputBasicoComponent } from '../../src/lib/teddy-input-basico/teddy-input-basico.component';
import { By } from '@angular/platform-browser';

describe('TeddyInputBasicoComponent', () => {
  let component: TeddyInputBasicoComponent;
  let fixture: ComponentFixture<TeddyInputBasicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeddyInputBasicoComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeddyInputBasicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve emitir pegarValor quando onInput for chamado', () => {
    const spyEmit = jest.spyOn(component.pegarValor, 'emit');

    const inputElement = fixture.debugElement.query(By.css('input')).nativeElement;
    inputElement.value = 'valor teste';
    inputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(spyEmit).toHaveBeenCalledWith('valor teste');
  });

  it('deve atualizar o valor com writeValue', () => {
    component.writeValue('novo valor');
    expect(component.valor).toBe('novo valor');
  });

  it('deve atribuir a função onChange', () => {
    const fn = jest.fn();
    component.registerOnChange(fn);
    expect((component as any).onChange).toBe(fn);
  });

  it('deve atribuir a função onTouched', () => {
    const fn = jest.fn();
    component.registerOnTouched(fn);
    expect((component as any).onTouched).toBe(fn);
  });

  it('deve exibir mensagem de erro se obrigatorio for true, valor vazio e campo tocado', () => {
    component.obrigatorio = true;
    component.valor = '';
    component.textoErro = 'Este campo é obrigatório.';
    fixture.detectChanges();

    const inputDebugEl = fixture.debugElement.query(By.css('input'));
    inputDebugEl.triggerEventHandler('blur', null);
    fixture.detectChanges();

    const elementoErro = fixture.debugElement.query(By.css('.erro'));
    expect(elementoErro).toBeTruthy();
    expect(elementoErro.nativeElement.textContent).toContain('Este campo é obrigatório.');
  });

  it('não deve exibir mensagem de erro se obrigatorio for false', () => {
    component.obrigatorio = false;
    component.valor = '';
    fixture.detectChanges();

    const elementoErro = fixture.debugElement.query(By.css('.erro'));
    expect(elementoErro).toBeFalsy();
  });
});

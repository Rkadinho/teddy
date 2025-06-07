import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TeddyBotaoComponent } from '../../src/lib/teddy-botao/teddy-botao.component';

describe('TeddyBotaoComponent', () => {
  let component: TeddyBotaoComponent;
  let fixture: ComponentFixture<TeddyBotaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeddyBotaoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TeddyBotaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve renderizar o texto do botão corretamente', () => {
    component.texto = 'Clique aqui';
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('button');
    expect(button.textContent.trim()).toBe('Clique aqui');
  });

  it('deve emitir o evento "clique" ao clicar no botão', () => {
    const emitSpy = jest.spyOn(component.clique, 'emit');

    const botao = fixture.nativeElement.querySelector('button');
    botao.click();

    expect(emitSpy).toHaveBeenCalledTimes(1);
  });

  it('deve desabilitar o botão se "desativado" for true', () => {
    component.desativado = true;
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('button');
    expect(button.disabled).toBe(true);
  });

  it('deve aplicar o tipo de botão corretamente', () => {
    component.tipo = 'reset';
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('button');
    expect(button.getAttribute('type')).toBe('reset');
  });

  it('deve aplicar as classes de estilo e tamanho corretamente', () => {
    component.estilo = 'secundario';
    component.tamanho = 'grande';
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('button');
    expect(button.classList).toContain('secundario');
    expect(button.classList).toContain('grande');
  });
});


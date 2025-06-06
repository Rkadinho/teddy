import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { TeddyModalExcluirComponent } from '../../src/lib/teddy-modal-excluir/teddy-modal-excluir.component';

describe('TeddyModalExcluirComponent', () => {
  let component: TeddyModalExcluirComponent;
  let fixture: ComponentFixture<TeddyModalExcluirComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [TeddyModalExcluirComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeddyModalExcluirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve emitir o evento fechar ao chamar fecharModal', () => {
    const spyEmit = jest.spyOn(component.fechar, 'emit');
    component.fecharModal();
    expect(spyEmit).toHaveBeenCalled();
  });

  it('deve emitir o evento excluir ao chamar excluirCliente', () => {
    const spyEmit = jest.spyOn(component.excluir, 'emit');
    component.excluirCliente();
    expect(spyEmit).toHaveBeenCalled();
  });
});

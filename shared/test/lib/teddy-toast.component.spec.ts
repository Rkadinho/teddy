import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { TeddyToastComponent } from '../../src/lib/teddy-toast/teddy-toast.component';

describe('TeddyToastComponent', () => {
  let component: TeddyToastComponent;
  let fixture: ComponentFixture<TeddyToastComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [TeddyToastComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeddyToastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve emitir o evento fechar ao chamar fecharToast', () => {
    const spyEmit = jest.spyOn(component.fechar, 'emit');
    component.fecharToast();
    expect(spyEmit).toHaveBeenCalled();
  });
});

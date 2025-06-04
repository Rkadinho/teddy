import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TeddyBotaoComponent } from './teddy-botao.component';

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

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

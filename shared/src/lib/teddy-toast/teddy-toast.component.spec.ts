/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TeddyToastComponent } from './teddy-toast.component';

describe('TeddyToastComponent', () => {
  let component: TeddyToastComponent;
  let fixture: ComponentFixture<TeddyToastComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeddyToastComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeddyToastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

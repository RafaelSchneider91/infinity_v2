import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DefinirexerciciosPage } from './definirexercicios.page';

describe('DefinirexerciciosPage', () => {
  let component: DefinirexerciciosPage;
  let fixture: ComponentFixture<DefinirexerciciosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DefinirexerciciosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

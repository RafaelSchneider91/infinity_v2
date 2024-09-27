import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DefinirExerciciosPage } from './definirexercicios.page';

describe('DefinirexerciciosPage', () => {
  let component: DefinirExerciciosPage;
  let fixture: ComponentFixture<DefinirExerciciosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DefinirExerciciosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

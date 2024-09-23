import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetalharalunoPage } from './detalharaluno.page';

describe('DetalharalunoPage', () => {
  let component: DetalharalunoPage;
  let fixture: ComponentFixture<DetalharalunoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalharalunoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

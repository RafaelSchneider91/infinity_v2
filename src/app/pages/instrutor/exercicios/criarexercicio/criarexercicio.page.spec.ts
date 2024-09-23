import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CriarexercicioPage } from './criarexercicio.page';

describe('CriarexercicioPage', () => {
  let component: CriarexercicioPage;
  let fixture: ComponentFixture<CriarexercicioPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CriarexercicioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

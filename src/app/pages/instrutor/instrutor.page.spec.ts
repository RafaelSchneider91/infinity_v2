import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InstrutorPage } from './instrutor.page';

describe('InstrutorPage', () => {
  let component: InstrutorPage;
  let fixture: ComponentFixture<InstrutorPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(InstrutorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

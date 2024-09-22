import { TestBed } from '@angular/core/testing';

import { AlunoService } from '../../services/aluno/aluno.service';

describe('AlunoService', () => {
  let service: AlunoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlunoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { Component, OnInit } from '@angular/core';
import { AlunoService } from 'src/app/services/aluno/aluno.service';
import { Aluno } from 'src/app/models/aluno.model';

@Component({
  selector: 'app-usuario',
  templateUrl: './aluno.page.html',
  styleUrls: ['./aluno.page.scss'],
})
export class AlunoPage implements OnInit {

  aluno: Aluno = {
    nome: '',
    email: '',
    peso: 0,
    altura: 0,
    dataNascimento: new Date(),
    // objetivo: '',
    diasTreino: []
  };


  constructor(private alunoService: AlunoService) {}

  ngOnInit() {
    ''
  }

  cadastrarAluno() {
    this.alunoService.cadastrarAluno(this.aluno).subscribe(
      (response) => {
        console.log('Aluno cadastrado com sucesso!', response);
      },
      (error) => {
        console.error('Erro ao cadastrar aluno', error);
        // Lógica para tratar o erro
      }
    );
  }


}

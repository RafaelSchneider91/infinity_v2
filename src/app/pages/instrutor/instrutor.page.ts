import { Component, OnInit } from '@angular/core';
import { AlunoService } from 'src/app/services/aluno/aluno.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-instrutor',
  templateUrl: './instrutor.page.html',
  styleUrls: ['./instrutor.page.scss'],
})
export class InstrutorPage implements OnInit {
  alunos: any[] = [];

  constructor(
    private alunoService: AlunoService, 
    private router: Router) {}

  ngOnInit() {
    this.carregarAlunos();
  }

  // busca os usuarios com perfil 'usuariofinal'
  carregarAlunos() {
    this.alunoService.getUsuarios().subscribe((data) => {
      this.alunos = data.filter((aluno: any) => aluno.perfil === 'usuariofinal');
    });
  }

  exibirDetalhesAluno(aluno: any) {
    // Redirecionar para a página de detalhes do aluno
    // Passa o id do aluno pela URL para a página de detalhes
    this.router.navigate(['/detalhes-aluno', aluno.id]);
  }
}

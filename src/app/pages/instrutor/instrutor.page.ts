import { Component, OnInit } from '@angular/core';
import { AlunoService } from 'src/app/services/aluno/aluno.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';


@Component({
  selector: 'app-instrutor',
  templateUrl: './instrutor.page.html',
  styleUrls: ['./instrutor.page.scss'],
})
export class InstrutorPage implements OnInit {
  alunos: any[] = [];

  constructor(
    private alunoService: AlunoService, 
    private authService: AuthService,
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

  async logout() {
    try {
      await this.authService.logout();
      console.log('Logout realizado com sucesso');
    } catch (error) {
      console.error('Erro ao realizar logout:', error);
    }
  }
}

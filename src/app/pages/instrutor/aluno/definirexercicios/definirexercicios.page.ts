import { Component, OnInit } from '@angular/core';
import { AlunoService } from 'src/app/services/aluno/aluno.service';
import { InstrutorService } from 'src/app/services/instrutor/instrutor.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-definirexercicios',
  templateUrl: './definirexercicios.page.html',
  styleUrls: ['./definirexercicios.page.scss'],
})

export class DefinirExerciciosPage implements OnInit {
  exercicios: any[] = [];
  alunoId: string = '';
  diaSelecionado: string = ''; // Dia obtido da rota 

  constructor(
    private alunoService: AlunoService,
    private instrutorService: InstrutorService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // Obter os parâmetros da URL
    const routeParams = this.route.snapshot.paramMap;
    this.alunoId = routeParams.get('alunoId') ?? ''; // Obter o alunoId
    const dia = routeParams.get('dia') ?? ''; // Obter o dia
  
    // console.log('ID do aluno:', this.alunoId);
    // console.log('Dia:', dia);
    
    if (this.alunoId) {
      this.carregarExercicios();
    } else {
      console.error('ID do aluno não encontrado na rota.');
      // Aqui você pode redirecionar para outra página ou mostrar um erro
    }
  }
  

  carregarExercicios() {
    this.instrutorService.listarExercicios().subscribe(
      (data) => {
        this.exercicios = data; // Carrega a lista de exercícios disponíveis
        console.log(data)
      },
      (error) => {
        console.error('Erro ao carregar exercícios:', error); // Log de erro
      }
    );
  }

 
  
  
  
  salvarExercicios() {
    const exerciciosSelecionados = this.exercicios.filter(exercicio => exercicio.selecionado);

    const routeParams = this.route.snapshot.paramMap;
    this.alunoId = routeParams.get('alunoId') ?? ''; // Obter o alunoId
    const diaSelecionado = routeParams.get('dia') ?? ''; // Obter o dia

    if (!this.alunoId || !diaSelecionado) {
        console.error('ID do aluno ou dia não estão definidos.');
        return;
    }

    // Envia os exercícios selecionados e o dia ao backend via POST
    this.alunoService.adicionarExercicios(this.alunoId, diaSelecionado, exerciciosSelecionados).subscribe(
        response => console.log('Exercícios adicionados com sucesso:', response),
        error => console.error('Erro ao adicionar os exercícios:', error)
    );
}


  
  

  
}

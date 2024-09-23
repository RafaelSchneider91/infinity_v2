import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { InstrutorService } from 'src/app/services/instrutor/instrutor.service';

@Component({
  selector: 'app-criarexercicio',
  templateUrl: './criarexercicio.page.html',
  styleUrls: ['./criarexercicio.page.scss'],
})
export class CriarexercicioPage implements OnInit {
  exercicioForm: FormGroup; // Inicialize como do tipo FormGroup

  constructor(
    private formBuilder: FormBuilder,
    private instrutorService: InstrutorService,
    private router: Router
  ) {
    // Inicialize o formGroup no construtor
    this.exercicioForm = this.formBuilder.group({
      nome: ['', Validators.required],
      descanso: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      repeticoes: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      series: ['', [Validators.required, Validators.pattern('^[0-9]*$')]]
    });
  }

  ngOnInit() {''}

  // Função para enviar o formulário
  criarExercicio() {
    if (this.exercicioForm.valid) {
      this.instrutorService.adicionarExercicio(this.exercicioForm.value).subscribe(
        (response) => {
          console.log('Exercício criado com sucesso:', response);
          this.router.navigate(['/exercicios']);
        },
        (error) => {
          console.error('Erro ao criar exercício:', error);
        }
      );
    } else {
      console.log('Formulário inválido');
    }
  }
}
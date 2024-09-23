import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlunoService } from 'src/app/services/aluno/aluno.service';
// import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-detalharaluno',
  templateUrl: './detalharaluno.page.html',
  styleUrls: ['./detalharaluno.page.scss'],
})
export class DetalharalunoPage implements OnInit {
  aluno: any;

  constructor(
    private route: ActivatedRoute, 
    private alunoService: AlunoService,
    // private navCtrl: NavController,
    private router: Router
  ) {}

  ngOnInit() {
    const alunoId = this.route.snapshot.paramMap.get('id'); // Obtém o ID do aluno da URL
    if (alunoId) {
      this.alunoService.getUsuarios().subscribe((data) => {
        this.aluno = data.find((aluno: any) => aluno.id === alunoId);
      });
    } else {
      console.error('ID do aluno não encontrado na rota.');
    }
  }

  // voltar() {
  //   this.navCtrl.back();
  // }

  definirExercicios(dia: string) {
    this.router.navigate(['/definir-exercicios', { dia, alunoId: this.aluno.id }]); 
  }
}

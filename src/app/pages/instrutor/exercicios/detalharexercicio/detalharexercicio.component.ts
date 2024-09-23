import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-detalharexercicio',
  templateUrl: './detalharexercicio.component.html',
  styleUrls: ['./detalharexercicio.component.scss'],
})
export class DetalharexercicioComponent {
  
  @Input() exercicio: any;
  
  constructor(private modalController: ModalController) {}

  dismissModal() {
    this.modalController.dismiss();
  }


}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExerciciosPageRoutingModule } from './exercicios-routing.module';
import { DetalharexercicioComponent } from './detalharexercicio/detalharexercicio.component';
import { ExerciciosPage } from './exercicios.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExerciciosPageRoutingModule,
  ],
  declarations: [ExerciciosPage, DetalharexercicioComponent ],

  // entryComponents: [DetalharexercicioComponent]
})
export class ExerciciosPageModule {}

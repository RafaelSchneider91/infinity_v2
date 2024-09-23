import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DefinirexerciciosPageRoutingModule } from './definirexercicios-routing.module';

import { DefinirExerciciosPage } from './definirexercicios.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DefinirexerciciosPageRoutingModule
  ],
  declarations: [DefinirExerciciosPage]
})
export class DefinirexerciciosPageModule {}

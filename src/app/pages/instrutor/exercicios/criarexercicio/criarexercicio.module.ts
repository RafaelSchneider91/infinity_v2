import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';


import { CriarexercicioPageRoutingModule } from './criarexercicio-routing.module';

import { CriarexercicioPage } from './criarexercicio.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CriarexercicioPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [CriarexercicioPage]
})
export class CriarexercicioPageModule {}

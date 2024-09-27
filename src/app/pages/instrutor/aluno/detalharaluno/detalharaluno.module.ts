import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetalharalunoPageRoutingModule } from './detalharaluno-routing.module';

import { DetalharalunoPage } from './detalharaluno.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetalharalunoPageRoutingModule
  ],
  declarations: [DetalharalunoPage]
})
export class DetalharalunoPageModule {}

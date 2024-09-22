import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InstrutorPageRoutingModule } from './instrutor-routing.module';

import { InstrutorPage } from './instrutor.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InstrutorPageRoutingModule
  ],
  declarations: [InstrutorPage]
})
export class InstrutorPageModule {}

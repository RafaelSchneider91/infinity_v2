import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from '../environments/environment';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [AppComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),  // Inicializa Firebase com as credenciais
    

  ],
  providers: [{
    provide: RouteReuseStrategy,
    useClass: IonicRouteStrategy,
   }],
  bootstrap: [AppComponent],
})
export class AppModule {}

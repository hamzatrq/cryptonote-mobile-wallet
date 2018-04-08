import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomePage } from './home';
import { QRCodeModule } from 'angularx-qrcode';
import { OrderModule } from 'ngx-order-pipe';

@NgModule({
  declarations: [
    HomePage,
  ],
  imports: [
    IonicPageModule.forChild(HomePage),
    QRCodeModule,
    OrderModule
  ],
})
export class HomePageModule {}

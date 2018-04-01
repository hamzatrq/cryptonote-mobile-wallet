import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Clipboard } from '@ionic-native/clipboard';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private clipboard: Clipboard, public toastCtrl: ToastController, private barcodeScanner: BarcodeScanner) {
  }

  ionViewDidLoad() {
  }

  scan() {
    this.barcodeScanner.scan().then(barcodeData => {
      console.log('Barcode data', barcodeData);
    }).catch(err => {
      console.log('Error', err);
    });
  }

  copy(str) {
    this.clipboard.copy(str).then(() => {
      this.toastCtrl.create({
        message: 'Address copied to clipboard',
        duration: 3000
      }).present();
    });
  }
}

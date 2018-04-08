import { BackendProvider } from './../../providers/backend/backend';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-send',
  templateUrl: 'send.html',
})
export class SendPage {

  form = {
    address: '',
    amount: 0,
    fee: 100
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, public barcodeScanner: BarcodeScanner, public backendProvider: BackendProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SendPage');
  }
  scan() {
    this.barcodeScanner.scan().then(barcodeData => {
      this.form.address = barcodeData.text;
    }).catch(err => {
      console.log('Error', err);
    });
  }

  send() {
    if(this.form.amount > 101 && this.form.address.length > 0) {
      this.backendProvider.send(this.form.address, this.form.amount).then(res => {
        console.log(JSON.stringify(res));
        this.navCtrl.setRoot('HomePage');
      });
    }
  }
}

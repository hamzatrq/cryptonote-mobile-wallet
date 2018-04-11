import { BackendProvider } from './../../providers/backend/backend';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public barcodeScanner: BarcodeScanner, public backendProvider: BackendProvider, public toastCtrl: ToastController) {
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
    if (this.form.amount < 1) {
      this.toastCtrl.create({
        duration:3000,
        message: 'Amount should be greater than 1 JTC',
        dismissOnPageChange: true
      }).present();
    }
    if(this.form.address.length !== 95 || this.form.address[0] !== 'E') {
      this.toastCtrl.create({
        duration:3000,
        message: 'Please enter a valid JTC wallet address',
        dismissOnPageChange: true
      }).present();
    }
    this.backendProvider.getUser().then(user => {
      if(user.user.address == this.form.address) {
        this.toastCtrl.create({
          duration:3000,
          message: 'You can not send to your own wallet',
          dismissOnPageChange: true
        }).present();
      }
      if(user.user.address !== this.form.address && this.form.amount > 1 && this.form.address.length == 95 && this.form.address[0] == 'E') {
        this.backendProvider.send(this.form.address, this.form.amount).then(res => {
          console.log(JSON.stringify(res));
          this.navCtrl.setRoot('HomePage');
        });
      }
    });
  }
}

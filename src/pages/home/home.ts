import { User } from './../../providers/user';
import { BackendProvider } from './../../providers/backend/backend';
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

  balance;
  transactions;
  user: User;

  constructor(public navCtrl: NavController, public navParams: NavParams, private clipboard: Clipboard, public toastCtrl: ToastController, private barcodeScanner: BarcodeScanner, public backendProvider: BackendProvider) {
    backendProvider.getBalance().then(bal => {
      this.balance = bal['availableBalance'];
      this.backendProvider.getUser().then(u => {
        this.user = u;
        this.getTransactions();
      });
    }, err => {
      this.navCtrl.setRoot('MainPage')
    }).catch(() => {
      this.navCtrl.setRoot('MainPage')
    });
  }

  ionViewDidLoad() {
  }

  getTransactions() {
    this.backendProvider.getTransactions().then(tr => {
      this.transactions = tr;
      console.log(tr);
    });
  }

  scan() {
    this.barcodeScanner.scan().then(barcodeData => {
      this.copy(barcodeData.text);
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

  openPage(page: string) {
    this.navCtrl.push(page);
  }
}

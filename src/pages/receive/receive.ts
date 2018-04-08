import { User } from './../../providers/user';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { BackendProvider } from '../../providers/backend/backend';
import { Clipboard } from '@ionic-native/clipboard';

@IonicPage()
@Component({
  selector: 'page-receive',
  templateUrl: 'receive.html',
})
export class ReceivePage {

  address;

  constructor(public navCtrl: NavController, public navParams: NavParams, private clipboard: Clipboard, public toastCtrl: ToastController, public backendProvider: BackendProvider) {
    this.backendProvider.getUser().then(user => {
      this.address = user.user.address;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReceivePage');
  }

  copy() {
    this.clipboard.copy(this.address).then(() => {
      this.toastCtrl.create({
        message: 'Address copied to clipboard',
        duration: 3000
      }).present();
    });
  }
}

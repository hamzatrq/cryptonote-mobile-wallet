import { User } from './../../providers/user';
import { BackendProvider } from './../../providers/backend/backend';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  balance;
  transactions;
  user: User;

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController, public backendProvider: BackendProvider, public loadingCtrl: LoadingController) {
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
    });
  }

  refresh() {
    let loading = this.loadingCtrl.create();
    loading.present();
    this.backendProvider.getBalance().then(bal => {
      this.balance = bal['availableBalance'];
      this.backendProvider.getUser().then(u => {
        this.user = u;
        this.getTransactions();
        loading.dismiss();
      });
    }, err => {
      this.navCtrl.setRoot('MainPage')
    }).catch(() => {
      this.navCtrl.setRoot('MainPage')
    });
  }

  openPage(page: string) {
    this.navCtrl.push(page);
  }

  logout() {
    this.backendProvider.logout().then(() => {
      this.navCtrl.setRoot('MainPage');
    });
  }
}

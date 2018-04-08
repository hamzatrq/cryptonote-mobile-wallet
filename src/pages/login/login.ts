import { User } from './../../providers/user';
import { BackendProvider } from './../../providers/backend/backend';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  user = {
    email: '',
    password: ''
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, public backendProvider: BackendProvider, public toastCtrl: ToastController, public loadingController: LoadingController) {
  }

  ionViewDidLoad() {
  }

  login() {
    let loading = this.loadingController.create();
    loading.present();
    this.backendProvider.login(this.user.email, this.user.password).then(user => {
      loading.dismiss();
      console.log(JSON.stringify(user));
      if(user && user['success']) {
        this.navCtrl.setRoot('HomePage');
      }
      else {
        loading.dismiss();
        this.toastCtrl.create({
          message: 'Wrong email or password',
          duration: 3000
        }).present()
      }
    }, err => {
      console.log(JSON.stringify(err));
      loading.dismiss();
      this.toastCtrl.create({
        message: 'Wrong email or password',
        duration: 3000
      }).present();
    });
  }

}

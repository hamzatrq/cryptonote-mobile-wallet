import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  user = {
    email: '',
    password: '',
    confirmPassword: ''
  };

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController
  ) {
  }

  ionViewDidLoad() {
  }

  signup() {
    if(this.user.password !== this.user.confirmPassword) {
      this.toastCtrl.create({
        message: 'Password does not match.',
        duration: 3000
      }).present();
      return;
    }

    if(this.user.password.length < 6) {
      this.toastCtrl.create({
        message: 'Password should atleast be 6 characters long.',
        duration: 3000
      }).present();
      return;
    }
    if(!this._validateEmail(this.user.email)) {
      this.toastCtrl.create({
        message: 'Invalid email address.',
        duration: 3000
      }).present();
      return;
    }
    let loading = this.loadingCtrl.create();
    loading.present();


    loading.dismiss();
  }

  private _validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
}

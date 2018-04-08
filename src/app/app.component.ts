import { BackendProvider } from './../providers/backend/backend';
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public backendProvider: BackendProvider) {
    this.initializeApp();

    this.pages = [
      { title: 'Home', component: 'HomePage' },
    ];
    backendProvider.getUser().then(u => {
      if (u && u.token) {
        this.rootPage = 'HomePage';
      } else {
        this.rootPage = 'MainPage';
      }
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }
}

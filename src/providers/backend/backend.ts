import { User } from './../user';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { HttpHeaders } from '@angular/common/http';

@Injectable()
export class BackendProvider {
  url = 'http://45.33.26.209/users/';
  constructor(public http: HttpClient, private storage: Storage) {
  }

  login(email, password) {
    return new Promise((resolve, reject) => {
      this.http.post<User>(this.url + 'authenticate', { email, password }).subscribe(user => {
        if (user && user.success == true) {
          this.storage.set('user', user);
          this.storage.set('access_token', user.token);
          resolve(user);
        } else {
          console.log(user);
          reject(user);
        }
      }, err => {
        reject(err);
      });
    });
  }

  getUser(): Promise<User> {
    return new Promise((resolve, reject) => {
      this.storage.get('user').then(user => {
        resolve(user);
      }, err => {
        reject(err);
      });
    });
  }

  register(email, password) {
    return new Promise((resolve, reject) => {
      this.http.post(this.url + 'register', { email, password }).subscribe(user => {
        resolve(user);
      }, err => {
        reject(err);
      });
    });
  }

  getBalance() {
    return new Promise((resolve, reject) => {
      this.getUser().then(user => {
        const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': user.token || ''
          })
        };
        this.http.get(this.url + 'balance', httpOptions).subscribe(balance => {
          console.log(balance);
          resolve(balance);
        }, err => {
          reject(err);
        });
      });
    });
  }

  logout() {
    return new Promise((resolve, reject) => {
      this.storage.clear().then(() => {
        resolve();
      });
    });
  }

  getTransactions() {
    return new Promise((resolve, reject) => {
      this.getUser().then(user => {
        const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': user.token || ''
          })
        };
        this.http.get(this.url + 'transactions', httpOptions).subscribe(tr => {
          resolve(tr);
        });
      });
    });
  }

  send(address, amount) {
    return new Promise((resolve, reject) => {
      this.getUser().then(user => {
        const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': user.token || ''
          })
        };
        this.http.post(this.url + 'send', { address, amount }, httpOptions).subscribe(hash => {
          resolve(hash);
        }, err => {
          reject(err);
        });
      });
    });
  }
}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from "../../models/user";
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  user = {} as User;
  profileData: Observable<any>;
  loginAttempt = false;

  constructor(private fireAuth: AngularFireAuth, afDatabase: AngularFireDatabase,
    public navCtrl: NavController, public navParams: NavParams) {
  }

  async login(user: User) {
    this.loginAttempt = true;
    try {
      const result = await this.fireAuth.auth.signInWithEmailAndPassword(this.user.email, this.user.password);
      if (result) {
        this.navCtrl.setRoot('TabsPage');
      } else {
        this.loginAttempt = true;
      }
    }
    catch (e) {
      console.error(e);
    }
  }

  register() {
    this.navCtrl.push('RegisterPage');
  }

  skip() {
    this.navCtrl.setRoot('TabsPage');
  }

}

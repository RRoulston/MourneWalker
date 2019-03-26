import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from "../../models/user";
import { AngularFireAuth } from 'angularfire2/auth';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  user = {} as User;
  loginAttempt = false;

  constructor(private afAuth: AngularFireAuth,
    public navCtrl: NavController, public navParams: NavParams) {
  }

  async login(user: User) {
    try {
      const result = await this.afAuth.auth.signInWithEmailAndPassword(this.user.email, this.user.password);
      if (result) {
        this.navCtrl.setRoot('TabsPage');
      }
    } catch (e) {
      this.loginAttempt = true;
    }
  }

  register() {
    this.navCtrl.push('RegisterPage');
  }

  skip() {
    this.navCtrl.setRoot('TabsPage');
  }

}

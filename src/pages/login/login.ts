import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from "../../models/user";
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  user = {} as User;
  profileData: Observable<any>;

  constructor(private fireAuth: AngularFireAuth, afDatabase: AngularFireDatabase,
    public navCtrl: NavController, public navParams: NavParams) {
  }

  async login(user: User) {
    try {
      const result = await this.fireAuth.auth.signInWithEmailAndPassword(this.user.email, this.user.password);
    //  this.profileData = this.afDatabase.object(`profile/`).once("value", snapshot => {
      if (result) {
        this.navCtrl.setRoot('TabsPage');
      } //else {
      //  this.navCtrl.setRoot('CreateProfilePage');
    //  }
//    });
  }
    catch(e) {
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

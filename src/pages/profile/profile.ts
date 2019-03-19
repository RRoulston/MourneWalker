import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Profile } from '../../models/profile';


@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {

  profileData: AngularFireList<Profile>;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private fireAuth: AngularFireAuth, private afDatabase: AngularFireDatabase,
    private toast: ToastController ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
    this.fireAuth.authState.subscribe(data => {
      if (data && data.email && data.uid) {
        this.toast.create({
          message: `Welcome to Mourne Walker, ${data.email}`,
          duration: 1000
        }).present();

        this.profileData = this.afDatabase.object(`profile/${data.uid}`).valueChanges();
      }
      else {
        this.toast.create({
          message: `Could not find authentication details.`,
          duration: 1000
        }).present();
      }
    })
  }


}

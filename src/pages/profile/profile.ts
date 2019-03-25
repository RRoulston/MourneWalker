import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserCoordinatesProvider } from '../../providers/user-coordinates/user-coordinates';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {

  profileData: Observable<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private fireAuth: AngularFireAuth, private afDatabase: AngularFireDatabase,
    private userCoordinatesProvider: UserCoordinatesProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
    this.fireAuth.authState.subscribe(data => {
      if (data && data.email && data.uid) {
        this.profileData = this.afDatabase.object(`profile/${data.uid}`).valueChanges();
      }
    })
  //  this.userCoordinatesProvider.stopTracking();
    this.userLocation();
  }

  userLocation() {
    this.userCoordinatesProvider.startTracking();
  }

  signOut() {
    this.fireAuth.auth.signOut().then(res => {
      this.navCtrl.setRoot("LoginPage");
    });
  }
}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App, Platform } from 'ionic-angular';
import { UserCoordinatesProvider } from '../../providers/user-coordinates/user-coordinates';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { BackgroundMode } from '@ionic-native/background-mode/ngx';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {

  profileData: Observable<any>;
  user: any;
  loggedIn: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private fireAuth: AngularFireAuth, private afDatabase: AngularFireDatabase,
    private userCoordinatesProvider: UserCoordinatesProvider, private _app: App,
    private backgroundMode: BackgroundMode, private platform: Platform) {
    /*
  platform.ready().then(() => {
    this.backgroundMode.on('activate').subscribe(() => {
      console.log('activated');
    });
  });
  */
    this.user = fireAuth.authState;

    this.user.subscribe(
      (user) => {
        if (user) {
          this.loggedIn = true;
        } else {
          this.loggedIn = false;
        }
      }
    );

  }

  //returns the users profile information, based on their user ID
  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
    try {
      this.fireAuth.authState.subscribe(data => {
        if (data && data.email && data.uid) {
          this.profileData = this.afDatabase.object(`profile/${data.uid}`).valueChanges();
        }
      })
      //  this.userLocation();
    } catch (err) {
      console.log("User Not Logged In");
    }

  }

  /*userLocation() {
    this.userCoordinatesProvider.startTracking();
  }
  */
  // The method to check whether user is logged in or not
  isLoggedIn() {
    return this.loggedIn;
  }

  signOut() {
    this.fireAuth.auth.signOut().then(res => {
      this._app.getRootNav().setRoot("LoginPage");
    });
  }

  login() {
      this._app.getRootNav().setRoot("LoginPage");
  }
}

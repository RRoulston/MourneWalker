import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { HikePage } from '../hike/hike';
import { AngularFireAuth} from 'angularfire2/auth';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(private fireAuth: AngularFireAuth, private toast: ToastController,
     public navCtrl: NavController, public navParams: NavParams) {

  }
  //when image is clicked it takes you to the selected hike page
  btnHike() {
    this.navCtrl.push(HikePage);
  }

  ionViewWillLoad() {
    this.fireAuth.authState.subscribe(data => {
      if (data && data.email && data.uid) {
        this.toast.create({
          message: `Welcome to Mourne Walker, ${data.email}`,
          duration: 3000
        }).present();
      }
      else {
        this.toast.create({
          message: `Could not find authentication details.`,
          duration: 3000
        }).present();
      }
    })
  }
}

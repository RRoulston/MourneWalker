import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HikePage } from '../hike/hike';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }
  //when image is clicked it takes you to the selected hike page
  btnHike() {
    this.navCtrl.setRoot(HikePage);
  }
}

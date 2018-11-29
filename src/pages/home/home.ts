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

  btnHike(){
    this.navCtrl.setRoot(HikePage);
  }
}

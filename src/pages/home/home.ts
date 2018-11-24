import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SlieveDonardPage } from '../slieve-donard/slieve-donard';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  btnDonard(){
    this.navCtrl.setRoot(SlieveDonardPage);
  }
}

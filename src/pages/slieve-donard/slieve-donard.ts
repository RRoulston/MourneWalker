import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

declare var google: any;
/**
 * Generated class for the SlieveDonardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@IonicPage()
@Component({
  selector: 'page-slieve-donard',
  templateUrl: 'slieve-donard.html',
})
export class SlieveDonardPage {

  @ViewChild('map') mapRef: ElementRef;
  map: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SlieveDonardPage');
    console.log(this.mapRef)
    this.showMap();
  }

  showMap() {
    //location - lat long
    const location = new google.maps.LatLng(54.193538, -5.916312);

    //Map Options
    const options = {
    center: location,
    zoom: 13,
    mapTypeId: 'hybrid'
  };

  this.map = new google.maps.Map(this.mapRef.nativeElement, options);
  }

}

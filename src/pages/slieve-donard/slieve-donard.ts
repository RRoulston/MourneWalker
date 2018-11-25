import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-slieve-donard',
  templateUrl: 'slieve-donard.html',
})
export class SlieveDonardPage {

  @ViewChild('map') mapRef: ElementRef

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

    const map = new google.maps.Map(this.mapRef.nativeElement, options);

    this.addPolylines(map)
  }

   addPolylines(map) {
     const flightpath = new google.maps.Polyline({
       path: [
         new google.maps.LatLng(54.205384, -5.895069),
         new google.maps.LatLng(54.204970, -5.896140),
         new google.maps.LatLng(54.204840, -5.896360),
         new google.maps.LatLng(54.204630, -5.896650),
         new google.maps.LatLng(54.204230, -5.897080),
         new google.maps.LatLng(54.204030, -5.897180),
         new google.maps.LatLng(54.203750, -5.897180),
         new google.maps.LatLng(54.203100, -5.897110),
         new google.maps.LatLng(54.202890, -5.897390),
         new google.maps.LatLng(54.202390, -5.898130),
         new google.maps.LatLng(54.202190, -5.897920),
         new google.maps.LatLng(54.202010, -5.898200),
         new google.maps.LatLng(54.202010, -5.898200),
         new google.maps.LatLng(54.20125, -5.89967),
         new google.maps.LatLng(54.20106, -5.90016),
         new google.maps.LatLng(54.20084, -5.90058),
         new google.maps.LatLng(54.20057, -5.90081),
         new google.maps.LatLng(54.20033, -5.90082),
         new google.maps.LatLng(54.19983, -5.90143),
         new google.maps.LatLng(54.19946, -5.90215),
         new google.maps.LatLng(54.1997, -5.90241),
         new google.maps.LatLng(54.19997, -5.90253),
         new google.maps.LatLng(54.1999, -5.903),
         new google.maps.LatLng(54.19969, -5.90396),
         new google.maps.LatLng(54.199099, -5.904907),
         new google.maps.LatLng(54.198761, -5.906013),
         new google.maps.LatLng(54.198517, -5.906721),
         new google.maps.LatLng(54.198059, -5.907961),
         new google.maps.LatLng(54.198125, -5.908238),
         new google.maps.LatLng(54.197589, -5.909439),
         new google.maps.LatLng(54.197347, -5.910057),
         new google.maps.LatLng(54.197258, -5.910158),
         new google.maps.LatLng(54.197075, -5.910618),
         new google.maps.LatLng(54.196652, -5.911687),
         new google.maps.LatLng(54.196243, -5.913166),
         new google.maps.LatLng(54.195944, -5.913850),
         new google.maps.LatLng(54.195752, -5.914137),
         new google.maps.LatLng(54.195597, -5.914603),
         new google.maps.LatLng(54.195149, -5.915640),
         new google.maps.LatLng(54.195108, -5.915799),
         new google.maps.LatLng(54.194960, -5.916190),
         new google.maps.LatLng(54.194908, -5.916472),
         new google.maps.LatLng(54.194486, -5.917752),
         new google.maps.LatLng(54.194259, -5.918377),
         new google.maps.LatLng(54.193643, -5.919733),
         new google.maps.LatLng(54.193643, -5.919733),
         new google.maps.LatLng(54.193425, -5.920522),
         new google.maps.LatLng(54.193396, -5.920974),
         new google.maps.LatLng(54.193173, -5.921289),
         new google.maps.LatLng(54.192976, -5.921523),
         new google.maps.LatLng(54.192863, -5.921772),
         new google.maps.LatLng(54.192395, -5.923280),
         new google.maps.LatLng(54.191542, -5.925254),
         new google.maps.LatLng(54.191445, -5.925274),
         new google.maps.LatLng(54.191386, -5.925441),
         new google.maps.LatLng(54.191407, -5.925532),
         new google.maps.LatLng(54.191307, -5.925812),
         new google.maps.LatLng(54.191064, -5.926077),
         new google.maps.LatLng(54.190932, -5.926265),
         new google.maps.LatLng(54.190850, -5.926444),
         new google.maps.LatLng(54.190791, -5.926641),
         new google.maps.LatLng(54.190724, -5.926653),
         new google.maps.LatLng(54.190627, -5.926842),
         new google.maps.LatLng(54.190292, -5.927401),
         new google.maps.LatLng(54.190292, -5.927401),
         new google.maps.LatLng(54.189911, -5.927765),
         new google.maps.LatLng(54.189481, -5.928112),
         new google.maps.LatLng(54.189266, -5.928488),
         new google.maps.LatLng(54.188833, -5.928880),
         new google.maps.LatLng(54.188452, -5.929007),
         new google.maps.LatLng(54.187966, -5.929383),
         new google.maps.LatLng(54.187718, -5.929443),
         new google.maps.LatLng(54.187631, -5.929561),
         new google.maps.LatLng(54.187477, -5.929626),
         new google.maps.LatLng(54.187315, -5.929808),
         new google.maps.LatLng(54.187046, -5.929887),
         new google.maps.LatLng(54.186901, -5.929962),
         new google.maps.LatLng(54.186799, -5.929812),
         new google.maps.LatLng(54.186042, -5.929802),
         new google.maps.LatLng(54.185662, -5.929505),
         new google.maps.LatLng(54.185087, -5.929306),
         new google.maps.LatLng(54.184901, -5.929378),
         new google.maps.LatLng(54.184787, -5.929339),
         new google.maps.LatLng(54.184387, -5.929594),
         new google.maps.LatLng(54.184170, -5.929977),
         new google.maps.LatLng(54.184111, -5.929981),
         new google.maps.LatLng(54.183683, -5.931084),
         new google.maps.LatLng(54.183706, -5.931161),
         new google.maps.LatLng(54.183676, -5.931217),
         new google.maps.LatLng(54.183683, -5.931741),
         new google.maps.LatLng(54.183646, -5.931847),
         new google.maps.LatLng(54.183601, -5.932157),
         new google.maps.LatLng(54.183212, -5.932429),
         new google.maps.LatLng(54.182890, -5.932884),
         new google.maps.LatLng(54.180228, -5.920820)
       ],
       geodesic: true,
       strokeColor: '#FF0000',
       strokeOpacity: 1.0,
       strokeWeight: 2
    });
      flightpath.setMap(map)
  }
}

import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LocationTrackerProvider } from '../../providers/location-tracker/location-tracker';
import leaflet from 'leaflet';

@IonicPage()
@Component({
  selector: 'page-slievebinnian',
  templateUrl: 'slievebinnian.html',
})
export class SlievebinnianPage {
  @ViewChild('map') mapRef: ElementRef
  //variables
  map: any;
  marker: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private locationTrackerProvider: LocationTrackerProvider) {
  }

  //First method which runs on the hikes page
  ionViewDidLoad() {
    console.log(this.mapRef);
    this.showMap();
  }

  //Guidance for creating map and markers from https://leafletjs.com/examples/quick-start/
  //Creates a map from mapbox, with an outdoors layer
  showMap() {
    //map opens at co-ordinates [54.1868, -5.9208] with a zoom 13
    this.map = leaflet.map("map").setView([54.1868, -5.9208], 13);
    leaflet.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      //maximum the map can zoom out to
      maxZoom: 18,
      //outdoors layer
      id: 'mapbox.outdoors',
      //API Key from mapbox
      accessToken: 'pk.eyJ1IjoicmFscGhyb3Vsc3RvbiIsImEiOiJjam95aDhpMzEyYnB3M3ZrZnE3MjdjOWVlIn0.FeeqFD1DuDkmlrN0fD8TVg'
    }).addTo(this.map);

    //calling functions
    this.addBackgroundGeolocation(this.map);
    this.addMarkers(this.map);
    this.addPolylines(this.map);
  }


  addBackgroundGeolocation(map) {
    this.locationTrackerProvider.startWatching(this.map);
  }

  //add markers to the map
  addMarkers(map) {
    //create marker to be added at the summit of routes
    var summit = leaflet.icon({
      iconUrl: 'assets/imgs/summitIcon.png',
      iconSize: [25, 25]
    });
    //create marker to be added at the beginning of routes
    var beginning = leaflet.icon({
      iconUrl: 'assets/imgs/hiking.png',
      iconSize: [25, 25]
    });

    var pointOfInterest = leaflet.icon({
      iconUrl: 'assets/imgs/pointOfInterest.png',
      iconSize: [25, 25]
    });

    //add market at the summit of routes
    leaflet.marker([54.14229, -5.9799], { icon: summit }).addTo(this.map)
      .bindPopup('<b>The Summit of Slieve Binnian!</b><div><img style="width:100%"src="assets/imgs/slieveBinnianSummit.jpg" alt="Slieve Binnian Summit"></div>');
    //add marker at the beginning of routes
    leaflet.marker([54.13207, -5.94337], { icon: beginning }).addTo(this.map)
      .bindPopup('<b>This is where your Hike Begins!</b>');
    //add market at the summit of routes
    leaflet.marker([54.15354, -5.98079], { icon: pointOfInterest }).addTo(this.map)
      .bindPopup('<b>Slieve Binnian North Tor!</b><div><img style="width:100%"src="assets/imgs/slieveBinnianNorthTor.jpg" alt="Slieve Binnian North Tor"></div>');
  }

  //polylines added to create the route of the trail
  addPolylines(map) {
    var latlngs = [
      [54.13207, -5.94337],
      [54.13214, -5.94317],
      [54.13225, -5.94298],
      [54.13234, -5.94277],
      [54.13239, -5.94253],
      [54.13237, -5.94244],
      [54.13232, -5.94234],
      [54.13227, -5.94229],
      [54.1322, -5.94228],
      [54.13239, -5.94217],
      [54.13247, -5.94214],
      [54.13275, -5.94197],
      [54.13285, -5.94192],
      [54.13303, -5.94191],
      [54.13323, -5.94185],
      [54.13339, -5.94181],
      [54.13358, -5.94182],
      [54.1337, -5.94177],
      [54.13428, -5.94148],
      [54.13485, -5.94128],
      [54.13513, -5.94128],
      [54.13536, -5.94132],
      [54.13563, -5.94141],
      [54.13581, -5.94154],
      [54.13594, -5.94169],
      [54.13604, -5.94193],
      [54.13687, -5.94422],
      [54.13691, -5.94427],
      [54.13713, -5.94477],
      [54.13725, -5.94531],
      [54.13754, -5.94618],
      [54.13758, -5.9465],
      [54.13764, -5.9467],
      [54.13833, -5.94794],
      [54.1384, -5.94802],
      [54.13924, -5.94952],
      [54.13937, -5.94953],
      [54.14276, -5.95208],
      [54.14455, -5.95381],
      [54.14546, -5.95446],
      [54.14583, -5.95492],
      [54.14737, -5.95636],
      [54.14807, -5.95675],
      [54.14855, -5.95696],
      [54.1487, -5.95702],
      [54.14933, -5.95742],
      [54.14965, -5.95787],
      [54.14989, -5.95812],
      [54.1501, -5.95824],
      [54.1505, -5.95845],
      [54.15109, -5.95897],
      [54.15149, -5.95939],
      [54.15211, -5.96004],
      [54.1524, -5.96035],
      [54.15278, -5.96069],
      [54.15304, -5.96092],
      [54.15328, -5.96103],
      [54.15356, -5.96115],
      [54.15446, -5.96184],
      [54.15479, -5.96268],
      [54.15486, -5.96328],
      [54.15547, -5.96418],
      [54.15625, -5.96716],
      [54.15689, -5.96801],
      [54.15704, -5.96871],
      [54.15799, -5.97064],
      [54.15975, -5.9727],
      [54.16032, -5.97411],
      [54.16095, -5.97544],
      [54.16147, -5.97598],
      [54.16197, -5.97686],
      [54.16196, -5.97721],
      [54.16241, -5.97809],
      [54.16214, -5.97865],
      [54.16175, -5.97926],
      [54.16161, -5.9799],
      [54.16149, -5.98061],
      [54.1614, -5.98078],
      [54.16112, -5.98099],
      [54.16075, -5.98132],
      [54.16045, -5.98134],
      [54.15988, -5.98158],
      [54.15953, -5.982],
      [54.15926, -5.98211],
      [54.1591, -5.98201],
      [54.15877, -5.98174],
      [54.15858, -5.98158],
      [54.15846, -5.98147],
      [54.15784, -5.98118],
      [54.15766, -5.98118],
      [54.15731, -5.98109],
      [54.15688, -5.98082],
      [54.15637, -5.98054],
      [54.15595, -5.98053],
      [54.15534, -5.98076],
      [54.15486, -5.9813],
      [54.15466, -5.98145],
      [54.1539, -5.98161],
      [54.15371, -5.98168],
      [54.15359, -5.98194],
      [54.15339, -5.98204],
      [54.1532, -5.98214],
      [54.15288, -5.98235],
      [54.15266, -5.98235],
      [54.15227, -5.98256],
      [54.1519, -5.98277],
      [54.15137, -5.98315],
      [54.15106, -5.98347],
      [54.1508, -5.98384],
      [54.15052, -5.98402],
      [54.15006, -5.98373],
      [54.14956, -5.98339],
      [54.14938, -5.98341],
      [54.14904, -5.98356],
      [54.14876, -5.98356],
      [54.14851, -5.9834],
      [54.14805, -5.98316],
      [54.14778, -5.98305],
      [54.14759, -5.98279],
      [54.14728, -5.98255],
      [54.14722, -5.98233],
      [54.14695, -5.98166],
      [54.14684, -5.98165],
      [54.14643, -5.98113],
      [54.14611, -5.98093],
      [54.14592, -5.98092],
      [54.14576, -5.98101],
      [54.14561, -5.9809],
      [54.14536, -5.98032],
      [54.14513, -5.98001],
      [54.14463, -5.97967],
      [54.14426, -5.9797],
      [54.14396, -5.97972],
      [54.14351, -5.97976],
      [54.14317, -5.97979],
      [54.14287, -5.97935],
      [54.14276, -5.97928],
      [54.14267, -5.97932],
      [54.1424, -5.9797],
      [54.14229, -5.9799],
      [54.1424, -5.9797],
      [54.14267, -5.97932],
      [54.14254, -5.97889],
      [54.14241, -5.97869],
      [54.14218, -5.97824],
      [54.14229, -5.977],
      [54.14232, -5.97625],
      [54.14258, -5.97359],
      [54.14257, -5.9712],
      [54.14256, -5.97037],
      [54.14261, -5.96852],
      [54.14264, -5.96651],
      [54.14266, -5.96533],
      [54.14233, -5.96386],
      [54.14108, -5.95836],
      [54.13917, -5.95203],
      [54.13898, -5.95126],
      [54.13866, -5.94869],
      [54.13833, -5.94795]
    ];
    //adds the polylines to the map
    var path = leaflet.polyline(latlngs, {
      color: 'red',
      opacity: 1.0,
      weight: 2
    }).addTo(this.map);
    map.fitBounds(path.getBounds());
  }
}

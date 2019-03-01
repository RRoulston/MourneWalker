import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LocationTrackerProvider } from '../../providers/location-tracker/location-tracker';
import leaflet from 'leaflet';

@IonicPage()
@Component({
  selector: 'page-slievecommedagh',
  templateUrl: 'slievecommedagh.html',
})
export class SlievecommedaghPage {
  @ViewChild('map') mapRef: ElementRef
  //variables
  map: any;
  marker: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private locationTrackerProvider: LocationTrackerProvider) {
  }

  //First method which runs on the hikes page
  ionViewDidLoad() {
    console.log('ionViewDidLoad SlievecommedaghPage');
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
    //create marker to be added at points of interest
    var pointOfInterest = leaflet.icon({
      iconUrl: 'assets/imgs/pointOfInterest.png',
      iconSize: [25, 25]
    });

    //add market at the summit of routes
    leaflet.marker([54.18885, -5.93858], { icon: summit }).addTo(this.map)
      .bindPopup('<b>The Summit of Slieve Commedagh!</b><div><img style="width:100%"src="assets/imgs/slievecommedaghSummit.jpg" alt="Slieve Commedagh Summit"></div>');
    //add marker at the beginning of routes
    leaflet.marker([54.20583, -5.89436], { icon: beginning }).addTo(this.map)
      .bindPopup('<b>This is where your Hike Begins!</b>');
    //add marker at points of interest
    leaflet.marker([54.18724, -5.94174], { icon: pointOfInterest }).addTo(this.map)
      .bindPopup('<b>The Stone Tower at the Summit of Slieve Commedagh!</b><div><img style="width:200px"src="assets/imgs/slieveCommedaghStoneTower.jpg" alt"Slieve Commedagh Stone Tower"></div>', {
        maxWidth : 200
  });
  }

  //polylines added to create the route of the trail
  addPolylines(map) {
    var latlngs = [
      [54.20583, -5.89436],
      [54.20537, -5.895],
      [54.20496, -5.89615],
      [54.20484, -5.89636],
      [54.20462, -5.89666],
      [54.20424, -5.89708],
      [54.20404, -5.89718],
      [54.20374, -5.89719],
      [54.2031, -5.8971],
      [54.20282, -5.89747],
      [54.20239, -5.89813],
      [54.20219, -5.89793],
      [54.20201, -5.89819],
      [54.20183, -5.89862],
      [54.20124, -5.89968],
      [54.20105, -5.90017],
      [54.20084, -5.90058],
      [54.20058, -5.90082],
      [54.20033, -5.90082],
      [54.19983, -5.90143],
      [54.19946, -5.90214],
      [54.1997, -5.90241],
      [54.19998, -5.90253],
      [54.19989, -5.90302],
      [54.19983, -5.90327],
      [54.1997, -5.90401],
      [54.19882, -5.90557],
      [54.19839, -5.90684],
      [54.19812, -5.90798],
      [54.19544, -5.91475],
      [54.19517, -5.91589],
      [54.194, -5.91854],
      [54.19299, -5.92136],
      [54.19258, -5.92233],
      [54.1925, -5.92245],
      [54.19248, -5.92257],
      [54.19242, -5.92264],
      [54.19239, -5.92273],
      [54.19237, -5.9228],
      [54.19231, -5.92297],
      [54.19228, -5.92317],
      [54.19225, -5.92329],
      [54.19214, -5.9235],
      [54.19208, -5.92352],
      [54.19205, -5.92358],
      [54.192, -5.92362],
      [54.19196, -5.92371],
      [54.19193, -5.92375],
      [54.1919, -5.92385],
      [54.19185, -5.92391],
      [54.19181, -5.92395],
      [54.19174, -5.92413],
      [54.19172, -5.92418],
      [54.19168, -5.92429],
      [54.19163, -5.92437],
      [54.1916, -5.92446],
      [54.19157, -5.92457],
      [54.19156, -5.92468],
      [54.19154, -5.92477],
      [54.19149, -5.92484],
      [54.19147, -5.92491],
      [54.19127, -5.92576],
      [54.19108, -5.92599],
      [54.191, -5.92614],
      [54.19091, -5.92633],
      [54.19086, -5.92646],
      [54.19079, -5.92654],
      [54.19075, -5.92662],
      [54.19072, -5.92663],
      [54.1907, -5.92663],
      [54.19066, -5.92668],
      [54.19063, -5.92678],
      [54.18894, -5.92871],
      [54.18714, -5.92987],
      [54.18662, -5.9297],
      [54.1862, -5.9298],
      [54.18606, -5.9298],
      [54.18592, -5.92974],
      [54.18563, -5.9295],
      [54.1855, -5.92947],
      [54.18526, -5.92937],
      [54.18516, -5.92934],
      [54.18501, -5.92933],
      [54.18498, -5.92934],
      [54.18487, -5.92939],
      [54.18481, -5.92936],
      [54.18472, -5.92939],
      [54.18465, -5.92946],
      [54.18459, -5.92949],
      [54.18452, -5.9295],
      [54.18446, -5.92956],
      [54.18435, -5.92963],
      [54.18424, -5.92983],
      [54.18419, -5.92993],
      [54.1841, -5.93002],
      [54.18389, -5.93047],
      [54.18368, -5.93104],
      [54.18364, -5.93184],
      [54.18361, -5.93207],
      [54.18354, -5.93219],
      [54.18339, -5.93226],
      [54.18319, -5.93238],
      [54.18296, -5.9327],
      [54.18277, -5.93307],
      [54.18404, -5.93775],
      [54.18719, -5.94173],
      [54.18734, -5.94161],
      [54.18762, -5.94121],
      [54.18885, -5.93857],
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

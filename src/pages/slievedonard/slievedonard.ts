import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { LocationTrackerProvider } from '../../providers/location-tracker/location-tracker';
import { Geofence } from '@ionic-native/geofence/ngx';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { BackgroundMode } from '@ionic-native/background-mode/ngx';
import leaflet from 'leaflet';

@IonicPage()
@Component({
  selector: 'page-slievedonard',
  templateUrl: 'slievedonard.html',
})
export class SlievedonardPage {
  @ViewChild('map') mapRef: ElementRef
  //variables
  map: any;
  marker: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private geofence: Geofence,
    private locationTrackerProvider: LocationTrackerProvider, private localNotifications: LocalNotifications,
    private backgroundMode: BackgroundMode, private platform: Platform) {

    platform.ready().then(() => {
      this.backgroundMode.on('activate').subscribe(() => {
        console.log('activated');
      });
    });
  }
  //First method which runs on the slieve donard page
  ionViewDidLoad() {
    console.log('ionViewDidLoad SlieveDonardPage');
    this.showMap();
  }

  //Creates a map from mapbox, with an outdoors layer
  showMap() {
    //map opens at co-ordinates [54.1868, -5.9208] (Slieve Donard) with a zoom 13
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
    this.addMarkers(this.map);
    this.addPolylines(this.map);
  }

  //starts tracking your geolocation and adds geofences
  startHike() {
    this.locationTrackerProvider.startTracking(this.map);
    this.addGeofence(this.map);
    //this.map.locate({ setView: true, maxZoom: 15 });
  }

  //stop tracking your geolocation and adds geofences
  stopHike() {
    this.locationTrackerProvider.stopTracking(this.map);
    this.removeGeofence(this.map);
    //this.map.setView([54.1868, -5.9208], 13);
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
    leaflet.marker([54.18025, -5.92071], { icon: summit }).addTo(this.map)
      .bindPopup('<b>The Summit of Slieve Donard!</b><div><img style="width:100%"src="assets/imgs/slieveDonardSummit.png" alt="Slieve Donard Summit"></div>');
    //add marker at the beginning of routes
    leaflet.marker([54.20583, -5.89436], { icon: beginning }).addTo(this.map)
      .bindPopup('<b>This is where your Hike Begins!</b>');
    //add marker at points of interest
    leaflet.marker([54.18019, -5.92085], { icon: pointOfInterest }).addTo(this.map)
      .bindPopup('<b>The Stone Tower at the Summit of Slieve Donard!</b><div><img style="width:100%"src="assets/imgs/slieveDonardStonetower.jpg" alt"Slieve Donard Stone Tower"></div>');

    leaflet.marker([54.18256, -5.93261], { icon: pointOfInterest }).addTo(this.map)
      .bindPopup('<b>The Mourne Wall!</b><div><img style="width:100%"src="assets/imgs/mournewall.jpg" alt"The Mourne Wall"></div>');
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
      [54.18264, -5.93255],
      [54.18074, -5.92505],
      [54.18046, -5.9235],
      [54.18025, -5.92071]
    ];
    //adds the polylines to the map
    var path = leaflet.polyline(latlngs, {
      color: 'red',
      opacity: 1.0,
      weight: 2
    }).addTo(this.map);
    map.fitBounds(path.getBounds());
  }

  addGeofence(map) {
    this.backgroundMode.enable();
    // initialize the plugin
    this.geofence.initialize().then(
      // resolved promise does not return a value
      () => console.log('Geofence Plugin Ready'),
      (err) => console.log(err)
    )

    //geofence for reaching the top of SLieve Donard
    let fence = [{
      id: 'donard', //any unique ID
      latitude: 54.18025,    //center of geofence radius
      longitude: -5.92071,
      radius: 100, //radius to edge of geofence in meters
      transitionType: 1, //triggers when geofence is entered
      notification: { //notification settings
        id: 1,
        title: 'Top of Slieve Donard!',
        text: 'You Made it to the Top of Slieve Donard!',
        openAppOnClick: true //open app when notification is tapped
      }
    },
    //geofence for reaching the Mourne Wall
    {
      id: 'wall', //any unique ID
      latitude: 54.18256, //center of geofence radius
      longitude: -5.93261,
      radius: 100, //radius to edge of geofence in meters
      transitionType: 1, //triggers when geofence is entered
      notification: {
        title: 'Mourne Wall!',
        text: 'Youve arrived at the Mourne Wall!',
        openAppOnClick: true
      }
    }
  ]
    //adds geofence
    this.geofence.addOrUpdate(fence).then(
      () => console.log('Geofence added'),
      (err) => console.log('Geofence failed to add')
    );
    //triggers when geofence is crossed, sending notification to phone
    this.geofence.onTransitionReceived().subscribe(resp => {
      console.log("Geofence transition detected", resp);
      this.localNotifications.schedule({
        id: 1,
        title: resp[0].notification.title,
        text: resp[0].notification.text,
        vibrate: true
      })
    });
  }

  removeGeofence(map) {
    this.geofence.removeAll().then(
      () => console.log('Geofence removed'),
      (err) => console.log('Geofence failed to remove')
    );
  }
}

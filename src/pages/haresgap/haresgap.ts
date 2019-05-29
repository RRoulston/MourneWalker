import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { LocationTrackerProvider } from '../../providers/location-tracker/location-tracker';
import { Geofence } from '@ionic-native/geofence/ngx';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { BackgroundMode } from '@ionic-native/background-mode/ngx';
import leaflet from 'leaflet';


@IonicPage()
@Component({
  selector: 'page-haresgap',
  templateUrl: 'haresgap.html',
})
export class HaresgapPage {
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

  //First method which runs on the hares gap page
  ionViewDidLoad() {
    console.log('ionViewDidLoad HaresgapPage');
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
    this.addMarkers(this.map);
    this.addPolylines(this.map);
  }

  //starts tracking your geolocation and adds geofences
  startHike() {
    this.locationTrackerProvider.startTracking(this.map);
    this.addGeofence(this.map);
    this.map.locate({ setView: true, maxZoom: 15 });
  }

  //stop tracking your geolocation and adds geofences
  stopHike() {
    this.locationTrackerProvider.stopTracking(this.map);
    this.removeGeofence(this.map);
    this.map.setView([54.1868, -5.9208], 13);
  //  this.map.removeLayer(this.marker);
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

    //add market at the summit of routes
    leaflet.marker([54.19021, -5.97407], { icon: summit }).addTo(this.map)
      .bindPopup('<b>The Summit of Hares Gap!</b><div><img style="width:100%"src="assets/imgs/haresgapSummit.jpg" alt="Hares Gap Summit"></div>');
    //add marker at the beginning of routes
    leaflet.marker([54.21415, -5.99128], { icon: beginning }).addTo(this.map)
      .bindPopup('<b>This is where your Hike Begins!</b>');
  }

  //polylines added to create the route of the trail
  addPolylines(map) {
    var latlngs = [
      [54.21411, -5.99128],
      [54.2138, -5.99142],
      [54.21299, -5.99156],
      [54.21272, -5.99141],
      [54.21243, -5.99128],
      [54.212, -5.99096], //trassey
      [54.2115, -5.99092],
      [54.21111, -5.99094],
      [54.21081, -5.99102],
      [54.21042, -5.99135],
      [54.20977, -5.99221],
      [54.20944, -5.99246],
      [54.20893, -5.99273],
      [54.20867, -5.9929],
      [54.20856, -5.99292],
      [54.20798, -5.99229],
      [54.20741, -5.99189],
      [54.20727, -5.99124],
      [54.20637, -5.99005],
      [54.20611, -5.98964],
      [54.20604, -5.98953],
      [54.20575, -5.98925],
      [54.20526, -5.98926],
      [54.20522, -5.98923],
      [54.20503, -5.989],
      [54.20505, -5.98843],
      [54.20485, -5.9882],
      [54.2048, -5.988],
      [54.20491, -5.9877],
      [54.20493, -5.98711],
      [54.20474, -5.98671],
      [54.20418, -5.98636],
      [54.20361, -5.98649],
      [54.20319, -5.98669],
      [54.20226, -5.98685],
      [54.20161, -5.98713],
      [54.20029, -5.98751],
      [54.19975, -5.98729],
      [54.19887, -5.9864],
      [54.19861, -5.98622],
      [54.19838, -5.98603],
      [54.19823, -5.98573],
      [54.19812, -5.98511],
      [54.19793, -5.98451],
      [54.19758, -5.98373],
      [54.19712, -5.98311],
      [54.1965, -5.98259],
      [54.19557, -5.98131],
      [54.19531, -5.98089],
      [54.19505, -5.98064],
      [54.19469, -5.98056],
      [54.19415, -5.9802],
      [54.19365, -5.97953],
      [54.19358, -5.97933],
      [54.1922, -5.97694],
      [54.19182, -5.97619],
      [54.19158, -5.97612],
      [54.19088, -5.97624],
      [54.19022, -5.97525],
      [54.1902, -5.97427],
      [54.19019, -5.97423],
      [54.19021, -5.97407]
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

    //geofence for reaching the top of Hares Gap
    let fence = [{
      id: 'haresgap', //any unique ID
      latitude: 54.19021,  //center of geofence radius
      longitude: -5.97407,
      radius: 100, //radius to edge of geofence in meters
      transitionType: 1, //triggers when geofence is entered
      notification: { //notification settings
        id: 1,
        title: 'Top of Hares Gap!',
        text: 'You Made it to the Top of Hares Gap!',
        openAppOnClick: true //open app when notification is tapped
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

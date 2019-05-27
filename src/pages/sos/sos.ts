import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import leaflet from 'leaflet'
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { LocationTrackerProvider } from '../../providers/location-tracker/location-tracker';
declare var sms: any;
@IonicPage()
@Component({
  selector: 'page-sos',
  templateUrl: 'sos.html',
})
export class SosPage {

  @ViewChild('userLocationMap') mapRef: ElementRef
  //variables
  map: any;
  latitude: any;
  longitude: any;
  watch: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private geolocation: Geolocation, private callNumber: CallNumber,
    private androidPermissions: AndroidPermissions, private locationTrackerProvider: LocationTrackerProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SosPage');
    this.showMap();
  }

  ionViewDidLeave(){
    this.watch.unsubscribe();
    console.log("unsubscribe");
}

  //Code from https://leafletjs.com/
  //Creates a map from mapbox, with an outdoors layer
  showMap() {
    this.map = leaflet.map("map");
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
    this.addGeoLocation(this.map);
    this.map.locate({ setView: true, maxZoom: 15 });
  }

  //using geolocation with Ionic https://ionicframework.com/docs/native/geolocation/
  //adds users current location to the map using Ionic Geolocation plugin
  addGeoLocation(map) {
    var marker;
    let options = {
        enableHighAccuracy: true,
        frequency: 3000
      };
    //this.locationTrackerProvider.startTracking(this.map);
    this.watch = this.geolocation.watchPosition(options).subscribe((resp) => {
      this.latitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude;
      if (marker) {
        map.removeLayer(marker);
      }
      marker = leaflet.marker([this.latitude, this.longitude]).addTo(this.map)
        .bindPopup('<b>Your Current Location!</b>');
    });
    //displays users current location in a marker on the map
  }

  //make call to specified number, true variable ensures the app bypasses the
  //app chooser if the user has multiple applications installed that can handle calls
  makeCall() {
    this.callNumber.callNumber("07443437927", true)
      .then(res => console.log('Launched dialer!', res))
      .catch(err => console.log('Error launching dialer', err));
  }

  //pass in users latitude and longitude values
  sendText(latitude, longitude) {
    //declare number and text message to send with latitude and longitude values
    var messageInfo = {
      phoneNumber: "07443437927",
      textMessage: 'Users has requested assitance at location: Latitude ' +
       this.latitude + ' Longitude: ' + this.longitude
    };
    //request permission from the user to send SMS from their phone, if they accept send the text.
    this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.SEND_SMS).then(() => {
      sms.sendMessage(messageInfo, function(message) {
        alert("SMS has Succesfully been Sent")
      }, function(error) {
        alert("Error sending SMS, please Check if you have a Network Signal");
      });
    }).catch((err) => {
      alert(JSON.stringify(err, Object.getOwnPropertyNames(err)));
    });
  }
}

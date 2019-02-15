import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import leaflet from 'leaflet'
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { SMS } from '@ionic-native/sms/ngx';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public geolocation: Geolocation, private callNumber: CallNumber, private sms: SMS, private androidPermissions: AndroidPermissions) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SosPage');
    console.log(this.mapRef);
    this.showMap();
  }

  //Guidance for creating map and markers from https://leafletjs.com/examples/quick-start/
  //Creates a map from mapbox, with an outdoors layer
  showMap() {
    this.map = leaflet.map("userLocationMap");
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
    this.geolocation.getCurrentPosition().then((resp) => {
      this.latitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude;

      //displays users current location in a marker on the map
      leaflet.marker([this.latitude, this.longitude]).addTo(map)
        .bindPopup('<b>Your Current Location!</b>');
      //if theres an error return the following...
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  makeCall() {
    this.callNumber.callNumber("07443437927", true)
      .then(res => console.log('Launched dialer!', res))
      .catch(err => console.log('Error launching dialer', err));
  }

  sendText() {
    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.SEND_SMS).then(
      result => {
        console.log('Has permission?', result.hasPermission);
        if (result.hasPermission) {
          this.sms.send("07443437927", "Hi")
            .then(() => {
              console.log("The Message is sent");
            }).catch((error) => {
              console.log("The Message is Failed", error);
            });
        }
      },
      err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.SEND_SMS)
    );
  }
}
  /*
    sendEmail() {
      let email = {
        to: 'ralphroulston@live.co.uk',
        subject: 'SOS Page',
        body:'Test',
        isHtml: true
      };

      this.emailComposer.open(email);
    }
    */

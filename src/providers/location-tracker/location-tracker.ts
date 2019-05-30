import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Platform } from 'ionic-angular';
import { BackgroundGeolocation, BackgroundGeolocationConfig, BackgroundGeolocationResponse } from '@ionic-native/background-geolocation/ngx';
import { Geolocation, Geoposition } from '@ionic-native/geolocation/ngx';
import { AngularFireAuth } from "angularfire2/auth";
import { AngularFireDatabase } from 'angularfire2/database';
import { BackgroundMode } from '@ionic-native/background-mode/ngx';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import leaflet from 'leaflet';

@Injectable()
export class LocationTrackerProvider {

  latitude: any;
  longitude: any;
  watch: any;
  marker: any;
  tracking = false;

  constructor(public http: HttpClient, public zone: NgZone,
    private backgroundGeolocation: BackgroundGeolocation, private geolocation: Geolocation,
    private afAuth: AngularFireAuth, private afDatabase: AngularFireDatabase,
    private platform: Platform, private backgroundMode: BackgroundMode) {
    console.log('Hello LocationTrackerProvider Provider');

    platform.ready().then(() => {
      this.backgroundMode.on('activate').subscribe(() => {
        console.log('activated');
      });
    });
  }

  startTracking(map) {
    if (this.tracking == false) {
      this.tracking = true;
      alert("Your Location Is Now Being Tracked ");
      // Background Tracking
      let config: BackgroundGeolocationConfig = {
        desiredAccuracy: 10,
        stationaryRadius: 20,
        distanceFilter: 10,
        debug: true,
        interval: 10000,
        stopOnStillActivity: false,
        stopOnTerminate: false,
        startForeground: false
      };

      this.backgroundGeolocation.configure(config).subscribe((location: BackgroundGeolocationResponse) => {

        console.log('BackgroundGeolocation:  ' + location.latitude + ',' + location.longitude);

        // Run update inside of Angular's zone
        this.zone.run(() => {
          this.latitude = location.latitude;
          this.longitude = location.longitude;
        });
        // Store Updated Co-ordinates in Database, based off the users ID
        this.afAuth.authState.take(1).subscribe(auth => {
          this.afDatabase.object(`profile/${auth.uid}`).update({
            latitude: this.latitude,
            longitude: this.longitude
          });
        });
      }, (err) => {
        console.log(err);
      });
      // Turn ON the background-geolocation system.
      this.backgroundGeolocation.start();

      // Foreground Tracking
      let options = {
        frequency: 1000,
        enableHighAccuracy: true
      };

      //this.locationTrackerProvider.startTracking(this.map);
      this.watch = this.geolocation.watchPosition(options).subscribe((resp) => {
        this.latitude = resp.coords.latitude;
        this.longitude = resp.coords.longitude;

        // Store Updated Co-ordinates in Database, based off the users ID
        this.afAuth.authState.take(1).subscribe(auth => {
          this.afDatabase.object(`profile/${auth.uid}`).update({
            latitude: this.latitude,
            longitude: this.longitude
          });
        });

        if (this.marker) {
          map.removeLayer(this.marker);
        }
        //displays users current location in a marker on the map
        this.marker = leaflet.marker([this.latitude, this.longitude]).addTo(map)
          .bindPopup('<b>Your Current Location!</b>');
      });
    } else {
      alert("Error. Another Hike is Currently Being Tracked");
      return;
    }
  }

  stopTracking(map) {
    if (this.tracking == true) {
      this.tracking = false;
      alert("Your Location Is No Longer Being Tracked ");
      this.backgroundGeolocation.finish();
      this.watch.unsubscribe();
      if (this.marker) {
        map.removeLayer(this.marker);
      }
    } else {
      alert("Select 'Start Tracking' To Start Tracking a Hike");
    }
  }

  stopTrackingLogout() {
    if(this.tracking == true) {
      this.tracking = false;
      alert("Your Location Is No Longer Being Tracked ");
      this.backgroundGeolocation.finish();
      this.watch.unsubscribe();
    }
  }
}

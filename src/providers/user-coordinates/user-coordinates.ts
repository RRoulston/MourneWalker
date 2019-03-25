import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { BackgroundGeolocation, BackgroundGeolocationConfig, BackgroundGeolocationResponse } from '@ionic-native/background-geolocation/ngx';
import { Geolocation, Geoposition } from '@ionic-native/geolocation/ngx';
import { AngularFireAuth } from "angularfire2/auth";
import { AngularFireDatabase } from 'angularfire2/database';
import { FirebaseApp } from "angularfire2";
import 'rxjs/add/operator/filter';


@Injectable()
export class UserCoordinatesProvider {

  latitude: number = 0;
  longitude: number = 0;
  watch: any;
  database: any;


  constructor(public http: HttpClient, public zone: NgZone,
    private backgroundGeolocation: BackgroundGeolocation, private geolocation: Geolocation,
    private afAuth: AngularFireAuth, private afDatabase: AngularFireDatabase, private fb: FirebaseApp) {
    console.log('Hello LocationTrackerProvider Provider');
    this.database = this.fb.database().ref('profile');
  }

  startTracking() {
    // Background Tracking
    let config = {
      desiredAccuracy: 0,
      stationaryRadius: 20,
      distanceFilter: 10,
      debug: true,
      interval: 2000
    };

    this.backgroundGeolocation.configure(config).subscribe((location) => {

      console.log('BackgroundGeolocation:  ' + location.latitude + ',' + location.longitude);

      // Run update inside of Angular's zone
      this.zone.run(() => {
        this.latitude = location.latitude;
        this.longitude = location.longitude;
      });
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
      frequency: 3000,
      enableHighAccuracy: true
    };

    this.watch = this.geolocation.watchPosition(options).filter((p: any) => p.code === undefined).subscribe((position: Geoposition) => {

      console.log(position);

      // Run update inside of Angular's zone
      this.zone.run(() => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
      });
      this.afAuth.authState.take(1).subscribe(auth => {
        this.afDatabase.object(`profile/${auth.uid}`).update({
          latitude: this.latitude,
          longitude: this.longitude
        });
      });
    });
  }
  stopTracking() {
    console.log('stopTracking');
    this.backgroundGeolocation.finish();
    this.watch.unsubscribe();
  }
}

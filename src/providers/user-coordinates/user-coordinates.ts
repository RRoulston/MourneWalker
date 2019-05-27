import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Platform } from 'ionic-angular';
import { BackgroundGeolocation, BackgroundGeolocationConfig, BackgroundGeolocationResponse } from '@ionic-native/background-geolocation/ngx';
import { Geolocation, Geoposition } from '@ionic-native/geolocation/ngx';
import { AngularFireAuth } from "angularfire2/auth";
import { AngularFireDatabase } from 'angularfire2/database';
import { BackgroundMode } from '@ionic-native/background-mode/ngx';
import 'rxjs/add/operator/filter';


@Injectable()
export class UserCoordinatesProvider {
  latitude: number = 0;
  longitude: number = 0;
  watch: any;
  database: any;

  constructor(public http: HttpClient, public zone: NgZone,
    private backgroundGeolocation: BackgroundGeolocation, private geolocation: Geolocation,
    private afAuth: AngularFireAuth, private afDatabase: AngularFireDatabase,
    private platform: Platform, private backgroundMode: BackgroundMode) {
    console.log('Hello UserCoordinates Provider ');

    platform.ready().then(() => {
      this.backgroundMode.on('activate').subscribe(() => {
        console.log('activated');
      });
    });
  }


  startTracking() {
    // Background Tracking
    console.log("BackGround Tracking");
    let config: BackgroundGeolocationConfig = {
      desiredAccuracy: 0,
      stationaryRadius: 20,
      distanceFilter: 10,
      debug: true,
      interval: 5000,
      stopOnTerminate: false, // enable this to clear background location settings when the app terminates

    };
    this.backgroundGeolocation.configure(config).subscribe((location: BackgroundGeolocationResponse) => {
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
      frequency: 3000,
      enableHighAccuracy: true
    };
    //watch the users geolocation
    this.watch = this.geolocation.watchPosition(options).filter((p: any) =>
      p.code === undefined).subscribe((position: Geoposition) => {
        console.log(position);
        // Run update inside of Angular's zone
        this.zone.run(() => {
          this.latitude = position.coords.latitude;
          this.longitude = position.coords.longitude;
        });
        // Store Updated Co-ordinates in Database, based off the users ID
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

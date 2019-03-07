import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { BackgroundGeolocation, BackgroundGeolocationConfig, BackgroundGeolocationResponse } from '@ionic-native/background-geolocation/ngx';
import { Geolocation, Geoposition } from '@ionic-native/geolocation/ngx';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import leaflet from 'leaflet';

@Injectable()
export class LocationTrackerProvider {

  latitude: any;
  longitude: any;
  watch: any;

  constructor(public http: HttpClient, public zone: NgZone, private backgroundGeolocation: BackgroundGeolocation, private geolocation: Geolocation) {
    console.log('Hello LocationTrackerProvider Provider');
  }

  startWatching(map) {
    var marker;
    // Background Tracking
    let config: BackgroundGeolocationConfig = {
      desiredAccuracy: 10,
      stationaryRadius: 20,
      distanceFilter: 10,
      debug: true,
      interval: 10000
    };

    this.backgroundGeolocation.configure(config).subscribe((location: BackgroundGeolocationResponse) => {

      console.log('BackgroundGeolocation:  ' + location.latitude + ',' + location.longitude);

      // Run update inside of Angular's zone
      this.zone.run(() => {
        this.latitude = location.latitude;
        this.longitude = location.longitude;
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

        if (marker) {
          map.removeLayer(marker);
        }
        //displays users current location in a marker on the map
        marker = leaflet.marker([this.latitude, this.longitude]).addTo(map)
          .bindPopup('<b>Your Current Location!</b>');
      })
    });
  }
}

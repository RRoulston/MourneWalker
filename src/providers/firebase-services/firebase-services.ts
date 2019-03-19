import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import 'rxjs/add/operator/map';
import { FirebaseApp } from "angularfire2";
//import leaflet from 'leaflet';

@Injectable()
export class FirebaseServicesProvider {
  //variables
  map: any;
  database: any;

  constructor(private fb: FirebaseApp, public http: HttpClient, public afd: AngularFireDatabase) {
    this.database = this.fb.database().ref('Hikes');

  }

  getHikeDetails(map) {
    var latlngs = [
      this.database.child('Slieve Donard').child('Path').on('value', snap =>
      console.log(snap.val()))
      ];
    }
  }

      /*
    var path = leaflet.polyline(latlngs, {
      color: 'red',
      opacity: 1.0,
      weight: 2
    }).addTo(this.map);
    map.fitBounds(path.getBounds());

    /*
    this.afd.ref('Hikes').child('Slieve Donard').valueChanges().subscribe(data => {
      console.log(data);
      */





//.child('Path')

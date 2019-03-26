import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import 'rxjs/add/operator/map';
//import { FirebaseApp } from "angularfire2";
//import leaflet from 'leaflet';

@Injectable()
export class FirebaseServicesProvider {
  //variables
  map: any;
  database: any;
  percentage: number = 0;
  constructor(private afAuth: AngularFireAuth, public http: HttpClient, public afDatabase: AngularFireDatabase) {
  //  this.database = this.fb.database().ref('Hikes');

  }

  /*
  getHikeDetails(map) {
    var latlngs = [
      this.database.child('Slieve Donard').child('Path').on('value', snap =>
        console.log(snap.val()))
    ];
  }
  */
  /*
  updateDatabase(percentage) {
    this.afAuth.authState.take(1).subscribe(auth => {
      this.afDatabase.object(`profile/${auth.uid}`).update({
        percentage: this.percentage
      });
    });
  }
  */
}

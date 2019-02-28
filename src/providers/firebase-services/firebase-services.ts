import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import 'rxjs/add/operator/map';

@Injectable()
export class FirebaseServicesProvider {

  constructor(public http: HttpClient, public afd: AngularFireDatabase) {
  }

  getHikeDetails() {
    return this.afd.list('/Hikes').valueChanges();
  }

  addHike(name) {
    this.afd.list('/Hikes/').push(name);
  }

  removeHike(id) {
    this.afd.list('/Hikes/').remove(id);
  }
}

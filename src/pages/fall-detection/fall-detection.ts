import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DeviceMotion, DeviceMotionAccelerationData } from '@ionic-native/device-motion';
@IonicPage()
@Component({
  selector: 'page-fall-detection',
  templateUrl: 'fall-detection.html',
})
export class FallDetectionPage {

  data: any;
  subscription: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private deviceMotion: DeviceMotion) {
  }

  startWatching() {
    this.subscription = this.deviceMotion.watchAcceleration().subscribe((acceleration: DeviceMotionAccelerationData) => {
      this.data = acceleration;
    })
  }

  stopWatching() {
    this.subscription.unsubscribe();
  }
}

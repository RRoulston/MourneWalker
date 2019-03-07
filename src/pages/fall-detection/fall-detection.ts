import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { DeviceMotion, DeviceMotionAccelerationData, DeviceMotionAccelerometerOptions } from '@ionic-native/device-motion/ngx';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { NativeAudio } from '@ionic-native/native-audio/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
declare var sms: any;
@IonicPage()
@Component({
  selector: 'page-fall-detection',
  templateUrl: 'fall-detection.html',
})
export class FallDetectionPage {

  motion: any;
  motionX: number;
  motionY: number;
  motionZ: number;
  motionTotal: number;
  isMotion: boolean = false;

  counter: number;
  timer: number;
  alertPresented: boolean = false;

  latitude: any;
  longitude: any;

  toggleValue: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private deviceMotion: DeviceMotion,
    private alertController: AlertController, private callNumber: CallNumber, private nativeAudio: NativeAudio,
    private androidPermissions: AndroidPermissions, private geolocation: Geolocation) {
  }

  ionViewDidLoad() {
    //this.startWatching();
    this.alarm();
    this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.SEND_SMS);

  }

  makeCall() {
    this.callNumber.callNumber("07443437927", true)
      .then(res => console.log('Launched dialer!', res))
      .catch(err => console.log('Error launching dialer', err));
  }

  sendText(latitude, longitude) {
    var messageInfo = {
      phoneNumber: "07872325855",
      textMessage: 'Fall Detection has been triggered at: Latitude ' + this.latitude + ' Longitude: ' + this.longitude
    };
    console.log(messageInfo);
    /*
    this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.SEND_SMS).then(() => {
      sms.sendMessage(messageInfo, function(message) {
        alert(message)
      }, function(error) {
        alert(error);
      });
    }).catch((err) => {
      alert(JSON.stringify(err, Object.getOwnPropertyNames(err)));
    });
    */
  }

  getUsersLocation() {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.latitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude;
    });

    console.log(this.latitude, this.longitude)
  }

  alarm() {
    this.nativeAudio.preloadComplex('fall', '../assets/audio/fall.wav', 5, 0, 0).then(() => {
    }).catch((err) => {
      console.log(err);
    });

    this.nativeAudio.play('fall');
  }


  startWatching(latitude, longitude) {
    let motionOptions: DeviceMotionAccelerometerOptions = {
      frequency: 500
    }
    this.isMotion = true;
    this.motion = this.deviceMotion.watchAcceleration(motionOptions).subscribe((acceleration: DeviceMotionAccelerationData) => {
      this.motionX = acceleration.x;
      this.motionY = acceleration.y;
      this.motionZ = acceleration.z;
      this.motionTotal = Math.sqrt(Math.pow(this.motionX, 2) + Math.pow(this.motionY, 2) + Math.pow(this.motionZ, 2));

      console.log("Motion Total:", this.motionTotal);
      if (this.motionTotal < 1.5) {
        setTimeout(() => {
          if (this.motionTotal > 9.7 && this.motionTotal < 10.3) {
            if (this.alertPresented == false) {
              this.alertPresented = true
              let alert = this.alertController.create({
                title: 'Fall Detected',
                message: 'We Have Detected A Fall',
                buttons: [
                  {
                    text: 'I am OK',
                    handler: () => {
                      clearInterval(this.timer)
                      this.alertPresented = false;
                    }
                  },
                  {
                    text: 'Message for Help',
                    handler: () => {
                      clearInterval(this.timer)
                      this.sendText(this.latitude, this.longitude);
                      this.alertPresented = false;
                    }
                  }
                ]
              });
              alert.present();
              this.counter = 10;
              clearInterval(this.timer)
              this.timer = setInterval(() => {
                this.counter--;
                if (this.counter == 0) {
                  clearInterval(this.timer);
                  this.sendText(this.latitude, this.longitude)
                  this.alertPresented = false;
                }
              }, 1000);
            }
          }
        }, 5000);
      }
    });
  }

  stopWatching() {
    this.motion.unsubscribe();
    this.isMotion = false;
  }
}

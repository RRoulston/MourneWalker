import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Platform } from 'ionic-angular';
import { DeviceMotion, DeviceMotionAccelerationData, DeviceMotionAccelerometerOptions } from '@ionic-native/device-motion/ngx';
import { AlarmProvider } from '../../providers/alarm/alarm';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { BackgroundMode } from '@ionic-native/background-mode/ngx';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
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
    private alertController: AlertController, private androidPermissions: AndroidPermissions,
    private geolocation: Geolocation, private alarmProvider: AlarmProvider, private backgroundMode: BackgroundMode,
    private platform: Platform, private localNotifications: LocalNotifications) {

    platform.ready().then(() => {
      this.backgroundMode.on('activate').subscribe(() => {
        console.log('activated');
      });
    });
  }

  ionViewDidLoad() {
    this.getUsersLocation();
    //this.alarm();
    this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.SEND_SMS);

  }

  sendText(latitude, longitude) {
    var messageInfo = {
      phoneNumber: "07443437927",
      textMessage: 'Fall Detection has been triggered at: Latitude ' + this.latitude + ' Longitude: ' + this.longitude
    };
    console.log(messageInfo);
    this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.SEND_SMS).then(() => {
      sms.sendMessage(messageInfo, function(message) {
        alert("SMS has Succesfully been Sent")
      }, function(error) {
        alert("Error sending SMS, please Check if you have a Network Signal");
      });
    }).catch((err) => {
      alert(JSON.stringify(err, Object.getOwnPropertyNames(err)));
    });
  }

  getUsersLocation() {
    this.geolocation.watchPosition().subscribe((resp) => {
      this.latitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude;
    });
  }

  startWatching() {
    this.backgroundMode.enable();
    let motionOptions: DeviceMotionAccelerometerOptions = {
      frequency: 250
    }
    this.isMotion = true;
    this.motion = this.deviceMotion.watchAcceleration(motionOptions).subscribe((acceleration: DeviceMotionAccelerationData) => {
      this.motionX = acceleration.x;
      this.motionY = acceleration.y;
      this.motionZ = acceleration.z;
      this.motionTotal = Math.sqrt(Math.pow(this.motionX, 2) + Math.pow(this.motionY, 2) + Math.pow(this.motionZ, 2));

      console.log("Motion Total:", this.motionTotal);
      if (this.motionTotal < 2.75) {
        setTimeout(() => {
          if (this.motionTotal > 9.7 && this.motionTotal < 10.1) {
            if (this.alertPresented == false) {
              this.alertPresented = true
              let alert = this.alertController.create({
                title: 'Fall Detected',
                message: 'The System Has Detected A Fall. Please Respond',
                buttons: [
                  {
                    text: 'I am OK',
                    handler: () => {
                      clearInterval(this.timer)
                      this.alarmProvider.stop('fall');
                      this.alertPresented = false;
                    }
                  },
                  {
                    text: 'Message for Help',
                    handler: () => {
                      clearInterval(this.timer);
                      this.alarmProvider.stop('fall');
                      this.sendText(this.latitude, this.longitude);
                      this.alertPresented = false;
                    }
                  }
                ],
                enableBackdropDismiss: false
              });
              alert.present();
              this.alarmProvider.play('fall');
              this.localNotifications.schedule({
                id: 1,
                title: 'Fall Detection System Triggered',
                text: 'The Fall Detection System has triggered, please let us know if youre ok',
                vibrate: true,
              });
              this.counter = 15;
              clearInterval(this.timer)
              this.timer = setInterval(() => {
                this.counter--;
                if (this.counter == 0) {
                  clearInterval(this.timer);
                  this.sendText(this.latitude, this.longitude);
                  this.alarmProvider.stop('fall');
                  this.alertPresented = false;
                }
              }, 1000);
            }
          }
        }, 10000);
      }
    });
  }

  stopWatching() {
    this.motion.unsubscribe();
    this.isMotion = false;
  }
}

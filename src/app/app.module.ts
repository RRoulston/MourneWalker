//Imports for the project
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { TabsPageModule } from '../pages/tabs/tabs.module';

import { AboutPage } from '../pages/about/about';
import { HomePage } from '../pages/home/home';
//import { LoginPage } from '../pages/login/login';
//import { RegisterPage } from '../pages/register/register';
//import { CreateProfilePage } from '../pages/create-profile/create-profile';
import { ProfilePage } from '../pages/profile/profile';
import { TabsPage } from '../pages/tabs/tabs';
import { WeatherPage } from '../pages/weather/weather';
import { SlievedonardPage } from '../pages/slievedonard/slievedonard';
import { SlievecommedaghPage } from '../pages/slievecommedagh/slievecommedagh';
import { HaresgapPage } from '../pages/haresgap/haresgap'
import { SlievebinnianPage } from '../pages/slievebinnian/slievebinnian'
import { FallDetectionPage } from '../pages/fall-detection/fall-detection';
import { SosPage } from '../pages/sos/sos';
import { ProgressBarComponent } from '../components/progress-bar/progress-bar';

import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { WeatherProvider } from '../providers/weather/weather';
import { FirebaseServicesProvider } from '../providers/firebase-services/firebase-services';
import { LocationTrackerProvider } from '../providers/location-tracker/location-tracker';
import { BackgroundGeolocation } from '@ionic-native/background-geolocation/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { DeviceMotion } from '@ionic-native/device-motion/ngx';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { Geofence } from '@ionic-native/geofence/ngx';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { NativeAudio } from '@ionic-native/native-audio/ngx';

import { AngularFireModule } from 'angularfire2';
import { FIREBASE_CONFIG } from "./app.firebase.config";
import { AngularFireAuthModule} from "angularfire2/auth";
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AlarmProvider } from '../providers/alarm/alarm';

import { ProfilePageModule } from '../pages/profile/profile.module';

//pages declared
@NgModule({
  declarations: [
    MyApp,
    HomePage,
  //  LoginPage,
  //  RegisterPage,
  //  CreateProfilePage,
  //  ProfilePage,
    AboutPage,
    WeatherPage,
    SlievedonardPage,
    SlievecommedaghPage,
    HaresgapPage,
    SlievebinnianPage,
    FallDetectionPage,
    SosPage,
    ProgressBarComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    TabsPageModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ProfilePageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    HomePage,
  //  LoginPage,
  //  RegisterPage,
  //  CreateProfilePage,
    ProfilePage,
    TabsPage,
    WeatherPage,
    SlievedonardPage,
    SlievecommedaghPage,
    HaresgapPage,
    SlievebinnianPage,
    FallDetectionPage,
    SosPage
  ],
  //providers used
  providers: [
    LocationTrackerProvider,
    BackgroundGeolocation,
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    WeatherProvider,
    Geolocation,
    DeviceMotion,
    CallNumber,
    AndroidPermissions,
    Geofence,
    LocalNotifications,
    FirebaseServicesProvider,
    NativeAudio,
    AlarmProvider
  ]
})
export class AppModule { }

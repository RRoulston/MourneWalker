import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { ProfilePage } from '../profile/profile';
import { HomePage } from '../home/home';
import { WeatherPage } from '../weather/weather';
import { SosPage } from '../sos/sos';
import { FallDetectionPage } from '../fall-detection/fall-detection';

@IonicPage()
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = WeatherPage;
  tab3Root = SosPage;
  tab4Root = FallDetectionPage;
  tab5Root = ProfilePage;

  constructor() {

  }
}

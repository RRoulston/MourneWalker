import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { AboutPage } from '../about/about';
import { HomePage } from '../home/home';
import { WeatherPage } from '../weather/weather';
import { FallDetectionPage } from '../fall-detection/fall-detection';

@IonicPage()
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = AboutPage;
  tab3Root = WeatherPage;
  tab4Root = FallDetectionPage;

  constructor() {

  }
}

import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { AboutPage } from '../about/about';
import { HomePage } from '../home/home';
import { WeatherPage } from '../weather/weather'

@IonicPage()
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = AboutPage;
  tab3Root = WeatherPage;

  constructor() {

  }
}

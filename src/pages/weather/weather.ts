import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { WeatherProvider } from '../../providers/weather/weather';

@IonicPage()
@Component({
  selector: 'page-weather',
  templateUrl: 'weather.html',
})
export class WeatherPage {
  //variables declared
  temperatureData: any;
  weatherDescription: any;
  weatherIcon: any;
  weatherHumidity: any;
  windSpeed: any;
  windDirection: any;
  sunrise: any;
  sunset: any;
  lastUpdated: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private weatherProvider: WeatherProvider) {

  }

  //initial function runs when the page is loaded
  ionViewDidLoad() {
    console.log('ionViewDidLoad WeatherPage');
    this.getWeather();
  }

  //get weather returns weather data which is stored in the console
  getWeather() {
    this.weatherProvider.getWeatherData().subscribe((weatherData: any) => {
      console.log(weatherData)
      this.temperatureData = weatherData.main.temp;
      this.weatherDescription = weatherData.weather[0].description;
      this.weatherIcon = weatherData.weather[0].icon;
      this.weatherHumidity = weatherData.main.humidity;
      this.windSpeed = weatherData.wind.speed;
      this.windDirection = weatherData.wind.deg;
      this.sunrise = weatherData.sys.sunrise;
      this.sunset = weatherData.sys.sunset;
      this.lastUpdated = weatherData.dt;
    });
  }
}

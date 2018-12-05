import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import  'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';


/*
  Generated class for the WeatherProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class WeatherProvider {

  private url: string = "http://api.openweathermap.org/data/2.5/weather?lat=54.1533&lon=-6.0663&units=metric&APPID=ebce6cfc8d83e012cf501aced63e597f"

  constructor(public http: HttpClient) {
    console.log('Hello WeatherProvider Provider');
  }

  getWeatherData(){
    return this.http.get(this.url)
    .map(res => res)
    .catch(this.catchError);
    }

    private catchError(error: Response | any){
      console.log(error);
      return Observable.throw(error.json().error || "Server Error.");
    }
  }

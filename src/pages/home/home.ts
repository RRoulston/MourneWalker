import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { HikePage } from '../hike/hike';
import { AngularFireAuth } from 'angularfire2/auth';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  isSearchbarOpen = false;
  hikes: any;
  searchControl: FormControl;

  constructor(private fireAuth: AngularFireAuth, private toast: ToastController,
    public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.initializeItems();
  }

  initializeItems() {
    this.hikes = [{
      imgsrc: 'assets/imgs/slievedonard.jpg',
      hikeName: 'Slieve Donard (Donard Car Park)',
      difficulty: 'Hard',
      distance: '2.9 (one way) miles'
    },
    {
      imgsrc: 'assets/imgs/slievecommedagh.jpg',
      hikeName: 'Slieve Commedagh',
      difficulty: 'Medium',
      distance: '2.7 (one way) miles'
    }];
  }

  onSearch(event) {
    this.initializeItems()
    console.log(event.target.value);
    // Reset items back to all of the items

    // set val to the value of the ev target
    var val = event.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.hikes = this.hikes.filter((item) => {
        return (item.hikeName.toLowerCase().indexOf(val.toLowerCase()) > -1) || (item.difficulty.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  //when image is clicked it takes you to the selected hike page
  btnHike() {
    this.navCtrl.push(HikePage);
  }

  ionViewWillLoad() {
    this.fireAuth.authState.subscribe(data => {
      if (data && data.email && data.uid) {
        this.toast.create({
          message: `Welcome to Mourne Walker, ${data.email}`,
          duration: 1000
        }).present();
      }
      else {
        this.toast.create({
          message: `Could not find authentication details.`,
          duration: 1000
        }).present();
      }
    })
  }
}

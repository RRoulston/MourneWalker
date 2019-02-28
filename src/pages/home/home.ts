import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { HikePage } from '../hike/hike';
import { SlievecommedaghPage } from '../slievecommedagh/slievecommedagh';
import { AngularFireAuth } from 'angularfire2/auth';

//import { FirebaseServicesProvider } from '../../providers/firebase-services/firebase-services';
//import { AngularFireList } from 'angularfire2/database';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  isSearchbarOpen = false;
  hikes: any;
  width = 0;

//  allHikes: AngularFireList<any[]>;

  constructor(private fireAuth: AngularFireAuth, private toast: ToastController,
    public navCtrl: NavController, public navParams: NavParams) {
//      this.allHikes = firebaseService.getHikeDetails();
  }

  ionViewDidLoad() {
    this.initializeItems();
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

  //  var isTicked = document.getElementById("isTicked").checked;
  completeHike(index) {
    console.log("index:", index);
    var elem = document.getElementById("progressInner");
    if (this.hikes[index].completed == 'danger') {
      this.width = this.width + 50;
      elem.style.width = this.width + '%';
      elem.innerHTML = this.width * 1 + '%';
      this.hikes[index].completed = 'primary';
    } else if (this.hikes[index].completed == 'primary') {
      this.width = this.width - 50;
      elem.style.width = this.width + '%';
      elem.innerHTML = this.width * 1 + '%';
      this.hikes[index].completed = 'danger';
    }
  }

  initializeItems() {
    this.hikes = [{
      imgsrc: 'assets/imgs/slievedonard.jpg',
      imgID: '1',
      hikeName: 'Slieve Donard',
      difficulty: 'Hard',
      distance: '5.8 miles',
      completed: 'danger'
    },
    {
      imgsrc: 'assets/imgs/slievecommedagh.jpg',
      imgID: '2',
      hikeName: 'Slieve Commedagh',
      difficulty: 'Medium',
      distance: '5.6 miles',
      completed: 'danger'
    }];
  }

  onSearch(event) {
    this.initializeItems()
    console.log(event.target.value);
    // set val to the value of the ev target
    var val = event.target.value;
    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.hikes = this.hikes.filter((item) => {
        return (item.hikeName.toLowerCase().indexOf(val.toLowerCase()) > -1) || (item.difficulty.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  // when image is clicked it takes you to the selected hike page
  btnHike(index) {
    if (this.hikes[index].imgID == '1') {
      this.navCtrl.push(HikePage);
    } else if (this.hikes[index].imgID == '2') {
      this.navCtrl.push(SlievecommedaghPage);
    }
  }
}

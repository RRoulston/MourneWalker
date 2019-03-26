import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SlievedonardPage } from '../slievedonard/slievedonard';
import { SlievecommedaghPage } from '../slievecommedagh/slievecommedagh';
import { HaresgapPage } from '../haresgap/haresgap';
import { SlievebinnianPage } from '../slievebinnian/slievebinnian';
import { AngularFireAuth } from "angularfire2/auth";
import { AngularFireDatabase } from 'angularfire2/database';
import { FirebaseServicesProvider } from '../../providers/firebase-services/firebase-services';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  isSearchbarOpen = false;
  hikes: any;
  percentage = 0;

//  profileData: FirebaseObjectObservable<Profile>
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private afAuth: AngularFireAuth, private afDatabase: AngularFireDatabase,
    private firebaseServicesProvider: FirebaseServicesProvider) {
  }

  ionViewDidLoad() {
    this.initializeItems();
  }

  //  var isTicked = document.getElementById("isTicked").checked;
  completeHike(index) {
    console.log("index:", index);
    var elem = document.getElementById("progressInner");
    if (this.hikes[index].completed == 'danger') {
      this.percentage = this.percentage + 25;
      elem.style.width = this.percentage + '%';
      elem.innerHTML = this.percentage * 1 + '%';
      this.hikes[index].completed = 'primary';
      this.afAuth.authState.take(1).subscribe(auth => {
        this.afDatabase.object(`profile/${auth.uid}`).update({
          percentage: this.percentage
        });
      });
    } else if (this.hikes[index].completed == 'primary') {
      this.percentage = this.percentage - 25;
      elem.style.width = this.percentage + '%';
      elem.innerHTML = this.percentage * 1 + '%';
      this.hikes[index].completed = 'danger';
        this.afAuth.authState.take(1).subscribe(auth => {
          this.afDatabase.object(`profile/${auth.uid}`).update({
            percentage: this.percentage
          });
        });
      }
    }

  initializeItems() {
    this.hikes = [{
      imgsrc: 'assets/imgs/slievedonard.jpg',
      imgID: '1',
      hikeName: 'Slieve Donard',
      difficulty: 'Medium',
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
    },
    {
      imgsrc: 'assets/imgs/haresgap.jpg',
      imgID: '3',
      hikeName: 'Hares Gap',
      difficulty: 'Easy',
      distance: '4.1 miles',
      completed: 'danger'
    },
    {
      imgsrc: 'assets/imgs/slievebinnian.jpg',
      imgID: '4',
      hikeName: 'Slieve Binnian',
      difficulty: 'Hard',
      distance: '7 miles',
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
      this.navCtrl.push(SlievedonardPage);
    } else if (this.hikes[index].imgID == '2') {
      this.navCtrl.push(SlievecommedaghPage);
    } else if (this.hikes[index].imgID == '3') {
      this.navCtrl.push(HaresgapPage);
    } else if (this.hikes[index].imgID == '4') {
      this.navCtrl.push(SlievebinnianPage);
    }
  }
}

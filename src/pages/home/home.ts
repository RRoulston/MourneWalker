import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SlievedonardPage } from '../slievedonard/slievedonard';
import { SlievecommedaghPage } from '../slievecommedagh/slievecommedagh';
import { HaresgapPage } from '../haresgap/haresgap';
import { SlievebinnianPage } from '../slievebinnian/slievebinnian';
import { AngularFireAuth } from "angularfire2/auth";
import { AngularFireDatabase } from 'angularfire2/database';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  isSearchbarOpen = false;
  hikes: any;
  percentage = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private afAuth: AngularFireAuth, private afDatabase: AngularFireDatabase) {
  }

  ionViewDidLoad() {
    this.initializeItems();
  }

  //Search Bar
  completeHike(index) {
    //Make elem = to the inner part of the progress bar
    var elem = document.getElementById("progressInner");
    //If the button is red (danger), when clicked increase the percentage by 25%
    //and increase the inner progress bar by 25%. Change button to completed(primary)
    if (this.hikes[index].completed == 'danger') {
      this.percentage = this.percentage + 25;
      elem.style.width = this.percentage + '%';
      elem.innerHTML = this.percentage * 1 + '%';
      this.hikes[index].completed = 'primary';
      //Store new value of percentage in the Firebase Database for the logged in user
      this.afAuth.authState.take(1).subscribe(auth => {
        this.afDatabase.object(`profile/${auth.uid}`).update({
          percentage: this.percentage
        });
      });
      //If the button is blue (primary), when clicked decrease the percentage by 25%
      //and decrease the inner progress bar by 25%. Change button to completed(red)
    } else if (this.hikes[index].completed == 'primary') {
      this.percentage = this.percentage - 25;
      elem.style.width = this.percentage + '%';
      elem.innerHTML = this.percentage * 1 + '%';
      this.hikes[index].completed = 'danger';
      //Store new value of percentage in the Firebase Database for the logged in user
      this.afAuth.authState.take(1).subscribe(auth => {
        this.afDatabase.object(`profile/${auth.uid}`).update({
          percentage: this.percentage
        });
      });
    }
  }

  /*
  This method holds all the information about 4 hikes in the application, in an array.
  When the page loads, all the information in the array is printed into 4 seperate cards
  */
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

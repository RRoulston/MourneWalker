import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from "../../models/user";
import { AngularFireAuth } from 'angularfire2/auth';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import * as firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  user = {} as User;
  validation_messages: any;
  loginForm: FormGroup;
  loginAttempt = false;
  type = 'password';
  showPass = false;

  constructor(private afAuth: AngularFireAuth, private formBuilder: FormBuilder,
    public navCtrl: NavController, public navParams: NavParams) {
    this.createForm();
  }

  ionViewWillEnter() {
    this.afAuth.auth.onAuthStateChanged(user => {
      if (user) {
        // User is signed in.
        this.navCtrl.setRoot("TabsPage");
        console.log(user);
      } else {
        // No user is signed in.
        console.log("Not Logged In");

      }
    });
  }

  createForm() {
    this.loginForm = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(5),
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$') //this is for the letters (both uppercase and lowercase) and numbers validation'),
      ])),
    });
    this.validation_messages = {
      email: [
        { type: 'required', message: 'Email is required' },
        { type: 'pattern', message: 'Must enter valid email address' }
      ],
      password: [
        { type: 'required', message: 'Password is required' },
        { type: 'minLength', message: 'Password must be 7 or more characters' },
        { type: 'pattern', message: ' Password must contain letters (both uppercase and lowercase) and numbers' }
      ]
    }
  }

  login(user: User) {
    this.afAuth.auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(() => {
      try {
        const result = this.afAuth.auth.signInWithEmailAndPassword(this.user.email, this.user.password);
        if (result) {
          this.navCtrl.setRoot('TabsPage');
        }
      } catch (e) {
        this.loginAttempt = true;
      }
    });
  }

  showPassword() {
    this.showPass = !this.showPass;
    if (this.showPass) {
      this.type = 'text';
    } else {
      this.type = 'password';
    }
  }

  register() {
    this.navCtrl.push('RegisterPage');
  }

  skip() {
    this.navCtrl.setRoot('TabsPage');
  }

}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from "../../models/user";
import { Profile } from '../../models/profile';
import { AngularFireAuth } from "angularfire2/auth";
import { AngularFireDatabase } from 'angularfire2/database';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MustMatch } from '../../validators/password';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  user = {} as User;
  profile = {} as Profile;
  validation_messages: any;
  registerForm: FormGroup;
  submitAttempt = false;
  typePassword = 'password';
  typeConfirmPassword = 'password';
  showPass = false;
  showConfirmPass = false;

  constructor(private afAuth: AngularFireAuth, private formBuilder: FormBuilder, private afDatabase: AngularFireDatabase,
    public navCtrl: NavController, public navParams: NavParams) {
    this.createForm();
  }

  createForm() {
    //Form Builder is used
    this.registerForm = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$')
      ])),
      firstName: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('[a-zA-Z]*')
      ])),
      lastName: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('[a-zA-Z]*')
      ])),
      dateOfBirth: new FormControl('', Validators.required),
      mobile: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('[0-9]*')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(7),
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
      ])),
      confirmPassword: new FormControl('', Validators.compose([
        Validators.required,
      ]))
    }, {
        validator: MustMatch('password', 'confirmPassword')
      });
    this.validation_messages = {
      email: [
        { type: 'required', message: 'Email is required' },
        { type: 'pattern', message: 'Must enter valid email address' },
        { type: 'validEmail', message: 'Your email has already been taken.' }
      ],
      password: [
        { type: 'required', message: 'Password is required' },
        { type: 'minlength', message: 'Password must be 7 or more characters' },
        { type: 'pattern', message: ' Password must contain letters (both uppercase and lowercase) and numbers' }
      ],
      confirmPassword: [
        { type: 'required', message: 'Password is required' },
        { type: 'mustMatch', message: 'Passwords must match' }
      ],
      firstName: [
        { type: 'required', message: 'First Name is required' },
        { type: 'pattern', message: 'First Name can only contain letters' }
      ],
      lastName: [
        { type: 'required', message: 'Last Name is required' },
        { type: 'pattern', message: 'Last Name can only contain letters' }
      ],
      dateOfBirth: [
        { type: 'required', message: 'Date of Birth is required' }
      ],
      mobile: [
        { type: 'required', message: 'Mobile is required' },
        { type: 'pattern', message: 'Mobile number can only contain numbers' }
      ]
    }
  }

  showPassword() {
    this.showPass = !this.showPass;
    if (this.showPass) {
      this.typePassword = 'text';
    } else {
      this.typePassword = 'password';
    }
  }

  showConfirmPassword() {
    this.showConfirmPass = !this.showConfirmPass;
    if (this.showConfirmPass) {
      this.typeConfirmPassword = 'text';
    } else {
      this.typeConfirmPassword = 'password';
    }
  }
  //register an account in Firebase.
  //pass in the user model values email and password
  async register(user: User) {
    this.submitAttempt = true;
    //if all fields in the registraion form are valid then create account
    if (this.registerForm.valid) {
      try {
        //create authentication with email and password
        const result = await this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password);
        //using auth.uid, store the rest of the information; name, phonenumber, etc. in realtime database
        //then redirect user to LoginPage
        if (result) {
          this.afAuth.authState.take(1).subscribe(auth => {
            this.afDatabase.object(`profile/${auth.uid}`).set(this.profile)
              .then(() => this.navCtrl.setRoot('LoginPage'));
          });
        }
      }
      catch (e) {
        alert("Email Address Already Taken");
      }
    } else {
      console.log("Error");
    }
  }
}

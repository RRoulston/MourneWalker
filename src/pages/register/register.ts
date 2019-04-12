import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from "../../models/user";
import { Profile } from '../../models/profile';
import { AngularFireAuth } from "angularfire2/auth";
import { AngularFireDatabase } from 'angularfire2/database';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { PasswordValidator } from '../../validators/password';

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
  type = 'password';
  showPass = false;

  constructor(private afAuth: AngularFireAuth, private formBuilder: FormBuilder, private afDatabase: AngularFireDatabase,
    public navCtrl: NavController, public navParams: NavParams, private passwordValidator: PasswordValidator) {
    this.createForm();
  }

  createForm() {
    this.registerForm = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(5),
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$') //this is for the letters (both uppercase and lowercase) and numbers validation'),
      ])),
      firstName: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('[a-zA-Z]*')
      ])),
      lastName: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('[a-zA-Z]*')
      ])),
      dateOfBirth: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      mobile: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('[0-9]*')
      ])),
    });
    this.validation_messages = {
      email: [
        { type: 'required', message: 'Email is required' },
        { type: 'pattern', message: 'Must enter valid email address' },
        { type: 'validEmail', message: 'Your email has already been taken.' }
      ],
      password: [
        { type: 'required', message: 'Password is required' },
        { type: 'minLength', message: 'Password must be 7 or more characters' },
        { type: 'pattern', message: ' Password must contain letters (both uppercase and lowercase) and numbers' }
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
        { type: 'pattern', message: 'Mobile number can only contain numbers'}
      ]
    }
  }

  showPassword() {
    this.showPass = !this.showPass;
    if(this.showPass){
      this.type = 'text';
    } else {
      this.type = 'password';
    }
  }

  async register(user: User) {
    this.submitAttempt = true;
    if (this.registerForm.valid) {
      try {
        const result = await this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password);
        console.log(result);
        this.afAuth.authState.take(1).subscribe(auth => {
          this.afDatabase.object(`profile/${auth.uid}`).set(this.profile)
            .then(() => this.navCtrl.setRoot('LoginPage'));
        });
      }
      catch (e) {
        console.error(e);
      }
    } else {
      console.log("Error");
    }
  }
}

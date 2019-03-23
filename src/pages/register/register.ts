import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from "../../models/user";
import { AngularFireAuth } from "angularfire2/auth";
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { PasswordValidator } from '../../validators/password';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  user = {} as User;
  validation_messages: any;
  registerForm: FormGroup;
  submitAttempt = false;
  matchingPasswords: FormGroup;

  constructor(private fireAuth: AngularFireAuth, public formBuilder: FormBuilder,
    public navCtrl: NavController, public navParams: NavParams, public passwordValidator: PasswordValidator) {
    this.createForm();
  }

  createForm() {
    this.registerForm = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$')
      ])),
      //    'matchingPasswords': this.formBuilder.group({
      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(5),
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$') //this is for the letters (both uppercase and lowercase) and numbers validation'),
      ])),
      confirm_password: new FormControl('', Validators.required)
    }, { validator: this.passwordValidator.areEqual })
    //  });
    this.validation_messages = {
      email: [
        { type: 'required', message: 'Email is required.' },
        { type: 'pattern', message: 'Must enter valid email address' },
        { type: 'validEmail', message: 'Your email has already been taken.' }
      ],
      password: [
        { type: 'required', message: 'Password is required.' },
        { type: 'minLength', message: 'Password must be 5 or more characters' },
        { type: 'pattern', message: ' Password must contain letters (both uppercase and lowercase) and numbers' }
      ]
    }
  }

  async register(user: User) {
    this.submitAttempt = true;
    if (this.registerForm.valid) {
      try {
        const result = await this.fireAuth.auth.createUserWithEmailAndPassword(user.email, user.password);
        this.navCtrl.setRoot('LoginPage');
        console.log(result);
      }
      catch (e) {
        console.error(e);
        console.log("Yo")
      }
    } else {
      console.log("Error");
    }
  }
}

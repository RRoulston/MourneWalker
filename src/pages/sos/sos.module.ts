import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SosPage } from './sos';
import { SMS } from '@ionic-native/sms/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';

@NgModule({
  declarations: [
    SosPage,
  ],
  imports: [
    IonicPageModule.forChild(SosPage),
  ],
  providers: [
    SMS,
    AndroidPermissions,
  ],
})
export class SosPageModule {}
